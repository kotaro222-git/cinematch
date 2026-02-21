"use client"

import { useState } from "react"
import Image from "next/image"
import { Zap, ChevronLeft, Send } from "lucide-react"
import { conversations, type Conversation, type User } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  senderId: string
  text: string
  timestamp: string
}

const mockMessages: ChatMessage[] = [
  { id: "1", senderId: "1", text: "Hey! Just watched that movie you recommended", timestamp: "10:30 AM" },
  { id: "2", senderId: "current", text: "Which one? Blade Runner?", timestamp: "10:32 AM" },
  { id: "3", senderId: "1", text: "Yes! Dude, the visuals were insane...", timestamp: "10:33 AM" },
  { id: "4", senderId: "1", text: "The whole Joi sequence had me emotional", timestamp: "10:33 AM" },
  { id: "5", senderId: "current", text: "Right?! Denis Villeneuve is a genius", timestamp: "10:35 AM" },
]

function ConversationItem({
  conversation,
  onClick,
}: {
  conversation: Conversation
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-card"
    >
      <div className="relative flex-shrink-0">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={conversation.user.avatar}
            alt={conversation.user.name}
            fill
            className="object-cover"
          />
        </div>
        {conversation.user.isOnline && (
          <div className="absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-background bg-accent" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{conversation.user.name}</h3>
          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
        </div>
        <p
          className={cn(
            "truncate text-sm",
            conversation.isGift ? "flex items-center gap-1 text-primary" : "text-muted-foreground"
          )}
        >
          {conversation.isGift && <Zap className="h-3 w-3" />}
          {conversation.lastMessage}
        </p>
      </div>

      <div className="relative h-12 w-9 flex-shrink-0 overflow-hidden rounded">
        <Image
          src={conversation.movieThumbnail}
          alt="Movie"
          fill
          className="object-cover"
        />
      </div>
    </button>
  )
}

function ChatView({ user, onBack }: { user: User; onBack: () => void }) {
  const [message, setMessage] = useState("")

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image src={user.avatar} alt={user.name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground">{user.name}</h2>
          <p className="text-xs text-muted-foreground">{user.aura}</p>
        </div>
        {user.matchPercentage && (
          <span className="rounded-full bg-accent/20 px-2 py-1 text-xs font-medium text-accent">
            {user.matchPercentage}% Match
          </span>
        )}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex", msg.senderId === "current" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2",
                msg.senderId === "current"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground"
              )}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={cn(
                  "mt-1 text-[10px]",
                  msg.senderId === "current" ? "text-primary-foreground/70" : "text-muted-foreground"
                )}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-full bg-card px-4 py-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function DialogueScreen() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)

  if (selectedConversation) {
    return <ChatView user={selectedConversation.user} onBack={() => setSelectedConversation(null)} />
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-3xl font-bold text-foreground">Dialogue</h1>
        <p className="mt-1 text-xs tracking-widest text-muted-foreground">
          {conversations.length} ACTIVE CONVERSATIONS
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            onClick={() => setSelectedConversation(conversation)}
          />
        ))}
      </div>
    </div>
  )
}
