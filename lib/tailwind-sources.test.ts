import assert from "node:assert/strict"
import test from "node:test"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import ts from "typescript"

/** Trace code without importing it: no route, agent or mailer is executed. */
function collectSources(
  entries: string[],
  read: (file: string) => string,
  resolveModule: (specifier: string, importer: string) => string | undefined,
) {
  const visited = new Set<string>()
  function visit(file: string) {
    if (visited.has(file)) return
    visited.add(file)
    const source = ts.createSourceFile(
      file,
      read(file),
      ts.ScriptTarget.Latest,
      true,
    )
    function follow(specifier: ts.Node) {
      assert.ok(
        ts.isStringLiteralLike(specifier),
        `Cannot verify a non-literal dependency in ${file}; review CSS exclusions`,
      )
      const target = resolveModule(specifier.text, file)
      if (target) visit(target)
    }
    function scan(node: ts.Node) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier
      )
        follow(node.moduleSpecifier)
      if (
        ts.isImportEqualsDeclaration(node) &&
        ts.isExternalModuleReference(node.moduleReference) &&
        node.moduleReference.expression
      )
        follow(node.moduleReference.expression)
      if (
        ts.isCallExpression(node) &&
        (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(node.expression) &&
            node.expression.text === "require"))
      ) {
        assert.ok(node.arguments[0], `Missing dependency in ${file}`)
        follow(node.arguments[0])
      }
      ts.forEachChild(node, scan)
    }
    scan(source)
  }
  entries.forEach(visit)
  return visited
}

test("source tracing includes imports, re-exports, lazy imports and CommonJS edges", () => {
  const files = new Map([
    [
      "page.tsx",
      'import "one.ts"; export { Card } from "two.ts"; const lazy = import("three.ts"); const c = require("four.ts"); import e = require("five.ts")',
    ],
    ["one.ts", 'export * from "six.ts"'],
    ["two.ts", 'import "one.ts"'],
    ["three.ts", ""],
    ["four.ts", ""],
    ["five.ts", ""],
    ["six.ts", ""],
    ["unused.tsx", ""],
  ])
  const graph = collectSources(
    ["page.tsx"],
    (file) => files.get(file)!,
    (name) => name,
  )
  assert.deepEqual(
    [...graph].sort(),
    [...files.keys()].filter((name) => name !== "unused.tsx").sort(),
  )
})

test("an untraceable lazy dependency cannot silently bypass the CSS guard", () => {
  for (const code of ["import(target)", "require(target)"]) {
    assert.throws(
      () =>
        collectSources(
          ["page.tsx"],
          () => code,
          () => undefined,
        ),
      /non-literal dependency/,
    )
  }
})

test("excluded legacy CSS sources are unreachable from every app entry", () => {
  const root = process.cwd()
  const cssPath = resolve(root, "app/globals.css")
  const css = readFileSync(cssPath, "utf8")
  const excluded = [...css.matchAll(/^@source not "([^"\n]+)";/gm)]
    .filter(([, path]) => path !== "../lib/**/*.test.ts")
    .map(([, path]) => {
      assert.doesNotMatch(
        path,
        /[*?{}\[\]]/,
        "Exclusions must name individual checked files",
      )
      const file = resolve(dirname(cssPath), path)
      assert.ok(
        relative(root, file).replaceAll("\\", "/").startsWith("components/"),
      )
      assert.ok(
        existsSync(file),
        `${path} no longer exists; remove its exclusion`,
      )
      return file
    })
  assert.ok(excluded.length > 0)
  const entries: string[] = []
  function walk(directory: string) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name)
      if (entry.isDirectory()) walk(file)
      else if (
        /\.[cm]?[jt]sx?$/.test(entry.name) &&
        !entry.name.endsWith(".d.ts")
      )
        entries.push(file)
    }
  }
  walk(join(root, "app"))
  assert.ok(entries.length > 0)
  const config = ts.readConfigFile(join(root, "tsconfig.json"), ts.sys.readFile)
  assert.equal(config.error, undefined)
  const options = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    root,
  ).options
  const graph = collectSources(
    entries,
    (file) => readFileSync(file, "utf8"),
    (name, importer) => {
      const result = ts.resolveModuleName(
        name,
        importer,
        options,
        ts.sys,
      ).resolvedModule
      if (
        !result ||
        result.isExternalLibraryImport ||
        result.resolvedFileName.endsWith(".d.ts")
      )
        return undefined
      return resolve(result.resolvedFileName)
    },
  )
  for (const file of excluded) {
    assert.ok(
      !graph.has(file),
      `${relative(root, file)} is now used; remove its @source not directive before building`,
    )
  }
  for (const file of graph) {
    const path = relative(root, file).replaceAll("\\", "/")
    assert.ok(
      !(path.startsWith("lib/") && path.endsWith(".test.ts")),
      `${path} is imported by the app; test fixtures are excluded from CSS sources`,
    )
  }
})
