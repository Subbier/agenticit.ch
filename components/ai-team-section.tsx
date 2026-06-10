"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { MessageCircle, Clock, Zap } from "lucide-react"
import { CollapsibleBlock } from "@/components/site/collapsible-block"

const AGENT_AVATAR = "/professional-man-avatar.png"
const CUSTOMER_AVATAR = "/professional-woman-avatar.png"
const FALLBACK_AVATAR = "/placeholder-user.jpg"

function ChatAvatar({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const [resolvedSrc, setResolvedSrc] = useState(src)

  useEffect(() => {
    setResolvedSrc(src)
  }, [src])

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      width={64}
      height={64}
      onError={() => {
        setResolvedSrc((current) => (current === FALLBACK_AVATAR ? current : FALLBACK_AVATAR))
      }}
      className={className}
    />
  )
}

const conversations = [
  {
    title: "advok.app Live-Demo",
    messages: [
      {
        text: "Hallo, mein Vermieter hat mir unerwartet die Wohnung gekündigt. Was kann ich jetzt tun?",
        sender: "customer",
        delay: 0,
      },
      {
        text: "Es tut mir leid, das zu hören. Damit ich dir präzise helfen kann: Wohnst du in der Wohnung schon länger als ein Jahr und wurde ein konkreter Grund im Kündigungsschreiben genannt?",
        sender: "ai",
        delay: 1000,
      },
      { text: "Ja, ich wohne dort seit drei Jahren. Ein Grund steht aber nicht im Brief.", sender: "customer", delay: 2500 },
      {
        text: "Verstanden. Eine Kündigung ohne Begründung ist anfechtbar. Ich erstelle dir jetzt auf Knopfdruck ein rechtssicheres Anfechtungsschreiben für die Schlichtungsbehörde. Möchtest du zusätzlich, dass ich dir eine passende Anwaltskanzlei in deiner Nähe vermittle?",
        sender: "ai",
        delay: 3500,
      },
      { text: "Ja, bitte. Und ich brauche auch Infos zu einer Rechtsschutzversicherung.", sender: "customer", delay: 5000 },
      {
        text: "Perfekt. Ich habe dir passende Optionen für Rechtsschutzversicherung vorbereitet und buche auf Wunsch direkt einen Beratungstermin bei einer Partnerkanzlei.",
        sender: "ai",
        delay: 6000,
      },
    ],
  },
]

export function AITeamSection() {
  const sectionRef = useRef<HTMLElement>(null) // Added section ref for intersection observer
  const [isVisible, setIsVisible] = useState(false)
  const [currentConversation, setCurrentConversation] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<any[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [displayedMessages, isTyping])

  useEffect(() => {
    const conversation = conversations[currentConversation]
    setDisplayedMessages([])
    setIsTyping(false)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    let messageIndex = 0

    const showNextMessage = () => {
      if (messageIndex >= conversation.messages.length) {
        // Wait 3 seconds then move to next conversation
        timeoutRef.current = setTimeout(() => {
          setCurrentConversation((prev) => (prev + 1) % conversations.length)
        }, 3000)
        return
      }

      const message = conversation.messages[messageIndex]

      timeoutRef.current = setTimeout(() => {
        if (message.sender === "ai") {
          setIsTyping(true)
          timeoutRef.current = setTimeout(() => {
            setDisplayedMessages((prev) => [...prev, message])
            setIsTyping(false)
            messageIndex++
            showNextMessage()
          }, 800) // Reduced typing delay from 1500ms to 800ms for faster replies
        } else {
          setDisplayedMessages((prev) => [...prev, message])
          messageIndex++
          showNextMessage()
        }
      }, message.delay)
    }

    showNextMessage()

    // Cleanup timeout on unmount or conversation change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentConversation])

  return (
    <section id="ai-team" ref={sectionRef} className="relative z-10">
      <div className="bg-white rounded-b-[3rem] pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Live-Demo: advok.app in Aktion
            </div>

            <h2
              className={`text-4xl md:text-5xl font-bold text-slate-900 mb-4 transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Wenn Rechtshilfe{" "}
              <span className="bg-gradient-to-r from-emerald-700 to-emerald-400 bg-clip-text text-transparent">
                sofort verfügbar ist
              </span>
            </h2>

            <p
              className={`text-xl text-slate-600 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              advok.app zeigt, wie es sich anfühlt: Der KI-Rechtsassistent beantwortet Fragen sofort, erstellt
              Musterbriefe und ist rund um die Uhr da. Echter Nutzen für Endkunden – und passende Anfragen für Partner.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
            {/* Left side - Text content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:h-[600px] space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div
                className={`transition-all duration-1000 delay-600 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">Die perfekte Lösung – für Nutzer und Partner</h3>

                <div className="space-y-3 lg:space-y-4 text-base lg:text-lg text-slate-700 leading-relaxed">
                  <p>
                    advok.app ist ein KI-Rechtsassistent mit echtem Nutzen für Endkunden – und ein einfacher Weg, wie
                    daraus passende Anfragen für Partner entstehen.
                  </p>

                  <CollapsibleBlock summary="So profitieren Partner" variant="light">
                    <p>
                      Für Partner entstehen daraus qualifizierte Anfragen für Rechtsschutz und Beratung – automatisch
                      vorbereitet und sauber übergeben.
                    </p>
                  </CollapsibleBlock>

                  <p className="text-lg lg:text-xl font-semibold text-slate-900">
                    Sofort statt später: Nutzer handeln im Moment ihres Anliegens, statt Tage auf einen Termin zu warten.
                  </p>
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-800 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="p-4 lg:p-6 bg-slate-50 rounded-xl border-l-4 border-emerald-700">
                  <p className="text-slate-800 font-medium text-sm lg:text-base">
                    "Als intelligentes Digital Giveaway hat die advok.app unsere Leadgenerierung revolutioniert. Unsere
                    Kunden lieben die sofortige juristische Erste Hilfe – und wir gewinnen nahtlos hochqualifizierte
                    Mandate."
                  </p>
                  <p className="text-xs lg:text-sm text-slate-600 mt-2">— Elena Müller, Partnerin & Rechtsberaterin</p>
                </div>
              </div>
            </div>

            {/* Right side - Phone mockup */}
            <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
              <div className="max-w-[22rem] w-full">
                <div
                  className={`relative transition-all duration-1000 delay-600 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl">
                    <div className="bg-black rounded-[2rem] p-1">
                      <div className="bg-white rounded-[1.5rem] overflow-hidden">
                        {/* Status bar */}
                        <div className="bg-slate-50 px-6 py-3 flex justify-between items-center text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                            <span className="font-medium text-slate-700">advok.app Live-Demo</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">24/7</span>
                          </div>
                        </div>

                        <div className="bg-slate-900 px-6 py-4 text-white">
                          <div className="flex items-center gap-3">
                            <ChatAvatar
                              src={AGENT_AVATAR}
                              alt="Michael - AI Agent"
                              className="w-8 h-8 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">Juristischer Assistent – advok.app</h3>
                              <p className="text-xs text-slate-300">Live & Interaktiv</p>
                            </div>
                            <div className="text-xs text-green-400 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              Online
                            </div>
                          </div>
                        </div>

                        {/* Chat messages */}
                        <div
                          ref={chatContainerRef}
                          className="h-96 overflow-y-scroll scrollbar-hide p-4 space-y-3 bg-slate-50"
                          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                          {displayedMessages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                            >
                              {message.sender === "ai" && (
                                <ChatAvatar
                                  src={AGENT_AVATAR}
                                  alt="Michael"
                                  className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                                />
                              )}
                              <div
                                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                                  message.sender === "customer"
                                    ? "bg-slate-900 text-white rounded-br-md"
                                    : "bg-white text-slate-800 shadow-sm border border-slate-200 rounded-bl-md"
                                }`}
                              >
                                {message.text.split("\n").map((line: string, i: number) => (
                                  <div key={i}>{line}</div>
                                ))}
                              </div>
                              {message.sender === "customer" && (
                                <ChatAvatar
                                  src={CUSTOMER_AVATAR}
                                  alt="Kundin"
                                  className="w-6 h-6 rounded-full object-cover ml-2 mt-1 flex-shrink-0"
                                />
                              )}
                            </div>
                          ))}

                          {/* Typing indicator */}
                          {isTyping && (
                            <div className="flex justify-start items-start">
                              <ChatAvatar
                                src={AGENT_AVATAR}
                                alt="Michael"
                                className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                              />
                              <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border border-slate-200">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                  <div
                                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4 bg-white border-t border-slate-200">
                          <div className="flex items-center gap-3 bg-slate-100 rounded-full px-4 py-2">
                            <span className="text-slate-500 text-sm lg:text-base flex-1">advok.app antwortet …</span>
                            <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
                              <Zap className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
