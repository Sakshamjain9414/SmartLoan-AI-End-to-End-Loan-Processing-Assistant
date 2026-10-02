"use client"

import { motion } from "framer-motion"

export default function Hero() {
  const handleEligibility = () => {
    const element = document.getElementById("calculator")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl text-center space-y-8">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Instant Personal Loans with
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              AI Assistance
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Get approved in minutes with our smart digital sales assistant
          </p>
        </motion.div>

        <motion.button
          onClick={handleEligibility}
          className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg smooth-transition text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Check Your Eligibility
        </motion.button>
      </div>
    </section>
  )
}
