"use client"
// @ts-nocheck

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/waitlist/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
        setEmail("")
      } else {
        setError(data.message || "Failed to join waitlist")
      }
    } catch (err) {
      console.error("Error joining waitlist:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <span className="font-bold text-xl">Hitchiked</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/faq" className="hover:text-blue-300 transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-blue-300 transition-colors">
            Contact
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center relative">
        {/* Abstract shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 15,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 20,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          We&apos;re rethinking the way you get around.
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Get where you need to go, without breaking the bank or compromising your time.
        </motion.p>

        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-r-none bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="rounded-l-none bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
            >
              {submitted ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <>
                  Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <p className="text-sm text-gray-400 mt-2">Be the first to know when we launch.</p>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Affordable Alternatives</h3>
            <p className="text-gray-300">
              Say goodbye to expensive ride-hailing services. Our solution provides cost-effective transportation
              without sacrificing quality.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Door-to-Door Convenience</h3>
            <p className="text-gray-300">
              Enjoy the convenience of door-to-door rides without the hassle and unpredictability of public transit.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Real-Time Flexibility</h3>
            <p className="text-gray-300">
              Access real-time, flexible options that adapt to your schedule and commute needs, putting you in control.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works (Intentionally Vague) */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          A smarter way to travel
        </motion.h2>

        <div className="relative">
          {/* Abstract representation of the journey */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6 z-10">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect</h3>
              <p className="text-gray-300">
                Join our community of travelers looking for better transportation options.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6 z-10">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Match</h3>
              <p className="text-gray-300">
                Our innovative system finds the perfect transportation solution for your needs.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6 z-10">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Go</h3>
              <p className="text-gray-300">Enjoy a seamless, affordable journey to your destination.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm p-12 rounded-2xl text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your commute?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of early adopters who are already changing the way they travel.
          </p>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-r-none bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="rounded-l-none bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
              disabled={loading}
            >
              {loading ? "Joining..." : submitted ? 
                <span className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4" /> Joined
                </span> : 
                <span className="flex items-center">
                  Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              }
              {/* {submitted ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <>
                  Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )} */}
            </Button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            <span className="font-bold text-xl">Hitchiked</span>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Hitchiked. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
