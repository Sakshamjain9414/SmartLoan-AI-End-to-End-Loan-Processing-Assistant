"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import EmiCalculator from "@/components/EmiCalculator"
import Footer from "@/components/Footer"
import ChatBot from "@/components/ChatBot"
import AnimatedBackground from "@/components/AnimatedBackground"

export default function Home() {
  const [showChat, setShowChat] = useState(false)
  const [chatContext, setChatContext] = useState(null)

  const handleApplyLoan = (loanData) => {
    setChatContext(loanData)
    setShowChat(true)
  }

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10">
        <Header />
        <Hero />
        <section className="py-20 px-4 md:px-8 lg:px-16" id="calculator">
          <EmiCalculator onApply={handleApplyLoan} />
        </section>
        <Footer />
      </div>

      <ChatBot isOpen={showChat} onClose={() => setShowChat(false)} context={chatContext} userEmail={null} />
    </main>
  )
}
