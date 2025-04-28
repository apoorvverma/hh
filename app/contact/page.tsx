"use client"
// @ts-nocheck

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { CheckCircle, Mail, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    try {
      // In a real app, you would send this data to your API
      console.log("Form submitted:", formData)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <span className="font-bold text-xl">Hitchiked</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/faq" className="hover:text-blue-300 transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="text-blue-300 transition-colors">
            Contact
          </Link>
        </div>
      </nav>

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get in Touch
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Have questions or feedback? We&apos;d love to hear from you.
        </motion.p>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <motion.div
              className="md:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  <a href="mailto:contact@hitchiked.com" className="hover:text-blue-300 transition-colors">
                    contact@hitchiked.com
                  </a>
                </div>
                <p className="text-gray-300">
                  We aim to respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-3 bg-white/5 backdrop-blur-sm rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-300 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white min-h-[120px]"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10 mt-auto">
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
