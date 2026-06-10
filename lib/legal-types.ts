export type LegalSectionContent = {
  title: string
  paragraphs?: readonly string[]
  list?: readonly string[]
  links?: readonly { label: string; href: string }[]
  extra?: string
}
