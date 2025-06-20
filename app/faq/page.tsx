"use client"
// @ts-nocheck

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  toggleOpen: () => void
  index: number
}

const FAQItem = ({ question, answer, isOpen, toggleOpen, index }: FAQItemProps) => {
  return (
    <motion.div
      className="border-b border-white/10 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-6 text-left focus:outline-none"
      >
        <h3 className="text-xl font-semibold">{question}</h3>
        {isOpen ? <ChevronUp className="h-5 w-5 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 flex-shrink-0" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
        style={{ height: isOpen ? "auto" : 0 }}
      >
        <p className="pb-6 text-gray-300">{answer}</p>
      </motion.div>
    </motion.div>
  )
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "What problem are you solving?",
      answer:
        "We are addressing the challenges of daily commuting: high costs of private transportation, the inconvenience of public transit, and the lack of flexible, affordable options for daily travel.",
    },
    {
      question: "How can this help me with my commute?",
      answer:
        "We offer a service that aims to make your daily commute more convenient and cost-effective. We focus on optimizing travel by connecting people in need of transportation with similar routes, improving efficiency and reducing costs.",
    },
    {
      question: "Is this service available to everyone?",
      answer:
        "Yes, anyone who faces daily commuting challenges can benefit from our service, whether you rely on public transportation, expensive ride-hailing options, or just need more flexibility in your daily commute.",
    },
    {
      question: "How is this different from other transportation options?",
      answer:
        "Our service combines the flexibility of on-demand transportation with a focus on making commuting more affordable and reliable. It addresses key pain points like high costs and inconvenient schedules that are common in traditional options.",
    },
    {
      question: "How do I know this service will be safe?",
      answer:
        "We prioritize your safety and security. Our platform incorporates features that ensure a safe experience, from user verification to privacy protection, ensuring both riders and drivers are well taken care of.",
    },
    {
      question: "How does this service help me save money?",
      answer:
        "We provide an affordable transportation option that reduces daily costs. Our service helps users save money by making transportation more cost-efficient, especially compared to traditional methods like car ownership or ride-hailing.",
    },
    {
      question: "Can I use this service for more than just commuting?",
      answer:
        "Yes! Whether it's for daily travel, events, or special occasions, our service is designed to provide flexibility, meeting different types of transportation needs while maintaining convenience and cost savings.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply sign up through our platform to join a community of users who are looking for better, more affordable ways to get around. Once you're registered, you'll be able to access the service and start enjoying the benefits.",
    },
    {
      question: "Is this service available in my area?",
      answer:
        "We're expanding to more areas and constantly working to make our service available to as many people as possible. Please check our platform for availability in your location, and we'll notify you when we expand to your city.",
    },
    {
      question: "How do I get in touch with customer support?",
      answer:
        "If you have any questions or need assistance, you can contact our support team through the contact form on our website, or email us at contact@hitchiked.com, We're here to help!",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          {/* <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div> */}
          <span className="font-bold text-xl">HitcHiked</span>
        </Link>
        <div className="space-x-6">
          <Link href="/faq" className="text-blue-300 transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-blue-300 transition-colors">
            Contact
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Find answers to common questions about our service and how we&apos;re changing the way you commute.
        </motion.p>

        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            We&apos;re here to help. Reach out to our team for personalized assistance.
          </p>
          <Link href="/contact" passHref>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-center items-center">
                  
                  <div className="flex items-center space-x-6">
                    <div className="h-10 flex items-center justify-center">
                      <Image
                        src="/images/idgvc-logo.png"
                        alt="IDG Capital"
                        width={140}
                        height={45}
                        className="object-contain"
                      />
                    </div>
                    <div className="h-10 flex items-center justify-center">
        
        
        
                      <Image
                        src="/images/boston-university-logo.png"
                        alt="Boston University"
                        width={120}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
        <div className="mt-10 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Hitchiked. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
