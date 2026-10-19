"use client"

import type { ReactNode } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { MessageSquare, X } from "lucide-react"
import styles from "./website-feedback.module.css"

type Props = {
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onOpenAutoFocus: (event: Event) => void
  onCloseAutoFocus: (event: Event) => void
  onInteractOutside: () => void
}

export default function WebsiteFeedbackPanel({
  children,
  title,
  description,
  open,
  onOpenChange,
  ...handlers
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal={false}>
      <Dialog.Portal>
        <Dialog.Content
          className={styles.panel}
          data-website-feedback
          {...handlers}
        >
          <Dialog.Close
            className={styles.close}
            aria-label="Umfrage schliessen"
          >
            <X size={18} aria-hidden="true" />
          </Dialog.Close>
          <div className={styles.eyebrow}>
            <MessageSquare size={14} aria-hidden="true" /> Ihre Meinung
          </div>
          <Dialog.Title className={styles.title}>{title}</Dialog.Title>
          <Dialog.Description className={styles.description}>
            {description}
          </Dialog.Description>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
