export type LegalSectionContent = {
  title: string
  compact?: boolean
  paragraphs?: readonly string[]
  list?: readonly string[]
  links?: readonly { label: string; href: string }[]
  extra?: string
}
