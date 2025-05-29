"use client"
// @ts-nocheck

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Users, Shield, DollarSign, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

      {/* Carousel Component */}
      {/* Place this above the LandingPage export or in the same file for now */}
      function Carousel() {
        const images = [
          '/slides/1.jpg',
          '/slides/2.jpg',
          '/slides/3.jpg',
          '/slides/4.jpg',
          '/slides/5.jpg'
        ];
        const [current, setCurrent] = React.useState(0);
        const prevSlide = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        const nextSlide = React.useCallback(() => {
          setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, [images.length]);
        
        React.useEffect(() => {
          const timer = setInterval(() => nextSlide(), 4000);
          return () => clearInterval(timer);
        }, [current]);
        return (
          <div className="relative w-full flex flex-col items-center">
            <div className="w-full h-[60vw] md:h-[670px] flex items-center justify-center overflow-hidden rounded-2xl bg-white/10">
              <button
                aria-label="Previous slide"
                onClick={prevSlide}
                className="absolute left-2 z-10 bg-black/20 hover:bg-black/40 rounded-full p-2 shadow-lg top-1/2 -translate-y-1/2"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
              </button>
              <Image
                src={images[current]}
                alt={`App screenshot ${current + 1}`}
                className="object-contain h-full w-full transition-all duration-700 ease-in-out mx-auto"
                style={{ maxWidth: '100%' }}
              />
              <button
                aria-label="Next slide"
                onClick={nextSlide}
                className="absolute right-2 z-10 bg-black/20 hover:bg-black/40 rounded-full p-2 shadow-lg top-1/2 -translate-y-1/2"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx ? 'bg-blue-500' : 'bg-gray-400/50'}`}
                  onClick={() => setCurrent(idx)}
                />
              ))}
            </div>
          </div>
        );
      }


export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   // In a real app, you would send this to your API
  //   console.log("Email submitted:", email)
  //   setSubmitted(true)
  //   setTimeout(() => setSubmitted(false), 3000)
  //   setEmail("")
  // }

  
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
          {/* <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div> */}
          <span className="font-bold text-xl">HitcHiked</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/faq" className="hover:text-blue-300 transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-blue-300 transition-colors">
            Contact
          </Link>
        </div>
        {/* <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/10">
          Join Waitlist
        </Button> */}
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
          Empty seats. Rising costs. Shared solution!
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Whether you drive or ride, HitcHiked helps you save more, travel smarter and commute with purpose.
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
            </Button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-400">We will never spam or share your data with anyone else.</p>
            <div className="bg-blue-500/20 rounded-md p-2 inline-block">
              <p className="text-sm font-medium text-blue-300">
                Be the first one to know of our launch and earn discounts!
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Image Carousel Section */}
      <section className="flex justify-center items-center py-12">
        <div className="p-2 flex flex-col items-center w-full max-w-7xl relative">
          <Carousel />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Benefits
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 m-10">
          <motion.div
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Fund your weekends</h3>
            <p className="text-gray-300">
              Save $3,000 annually - Shared fares slash the average ride‑hail bill by up to 40%, so your commute funds
              your weekend, not the other way around.
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
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Commute with a community</h3>
            <p className="text-gray-300">
              Riding alongside classmates, coworkers, and neighbors transforms each trip from a solo slog into a
              friendly lift—networking built right into your daily route.
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
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Control your spend, every trip</h3>
            <p className="text-gray-300">
              Enter the price that fits your budget and let drivers accept your rate —so you ride at a cost you&apos;ve
              chosen, not one that&apos;s imposed.
            </p>
          </motion.div>

          </div>

        {/* Second row - 2 items centered */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
          <motion.div
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Fair fares, zero awkwardness</h3>
            <p className="text-gray-300">
              The in‑app negotiate fare system handles the back‑and‑forth silently; you see an instant yes/no, no
              haggling in person, no second‑guessing.
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
              <Car className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Turn empty seats into extra income</h3>
            <p className="text-gray-300">
              Monetize miles you were already driving, earning $5,000–$7,000 each year to cover car payments, insurance,
              or that next getaway.
            </p>
          </motion.div>
{/* 
          <motion.div
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Drive for good</h3>
            <p className="text-gray-300">
              By filling your car, you help pull single‑occupancy vehicles off congested streets—earning cash while
              making the city breathe easier.
            </p>
          </motion.div> */}
        </div>
      </div>
      </section>
{/* 
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Pick what you choose to be
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-items-center">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-[300px] h-[600px] mb-4 flex items-center justify-center">
              <Image
                src="/images/driver-app.png"
                alt="Driver App Interface"
                width={300}
                height={600}
                className="rounded-3xl shadow-xl object-contain h-full"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 px-8 py-6 text-lg">
              Driver
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-[300px] h-[600px] mb-4 flex items-center justify-center">
              <Image
                src="/images/rider-app.png"
                alt="Rider App Interface"
                width={300}
                height={600}
                className="rounded-3xl shadow-xl object-contain h-full"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 px-8 py-6 text-lg">
              Rider
            </Button>
          </motion.div>
        </div>
      </section>
 */}
      {/* Social Proof Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why the status quo is broken</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-3xl font-bold text-blue-400 mb-2">8.6%</h3>
              <p className="text-gray-300">
                8.6% of American workers carpool (≈ 14 million people) while nearly 69% still drive alone to work.
              </p>
              <p className="text-xs text-gray-400 mt-2">Source: US Census</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-3xl font-bold text-blue-400 mb-2">$2,140 – $2,730</h3>
              <p className="text-gray-300">
                Households burn $2,140 – $2,730 on gasoline every year, even after the dip in pump prices during 2024.
              </p>
              <p className="text-xs text-gray-400 mt-2">Source: EIA</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-3xl font-bold text-blue-400 mb-2">$1,280</h3>
              <p className="text-gray-300">
                The average ride sharing customer now spends $107 a month—that&apos;s ≈ $1,280 per year on ride‑hailing
                alone.
              </p>
              <p className="text-xs text-gray-400 mt-2">Source: Bloomberg Second Measure</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-8 text-center">How HitcHiked solves this</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">Save annually by cutting ride costs by 40%</h3>
              <p className="text-gray-300">
                Switching from ride-hail to shared rides slashes your annual spend from $1,280 to $760, putting $520
                back in your wallet for what matters.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">Lower your household fuel bills by 15%</h3>
              <p className="text-gray-300">
                Fewer empty miles and smarter seat utilization reduce household gas expenses by approximately $470 a
                year.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">
                Reduce Your Carbon Footprint Equivalent to 8 Trees
              </h3>
              <p className="text-gray-300">
                Sharing rides helps you skip 480 solo miles per year, equating to the climate benefit of planting 8
                mature trees—every single year.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What user issues are we solving
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl">
                👩🏽
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              &quot;I have always walked from off-campus student housing to my classes which used to get really
              hard/difficult during harsh weather. We were sometimes picked up and dropped off by our seniors who owned cars.&quot;
            </p>
            <p className="font-semibold">Riad F.</p>
            <p className="text-sm text-gray-400">University of South Florida</p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl">
                👩🏻
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              &quot;My dad bought me a used Toyota but it was my responsibilty to take care of the maintenance and the
              fuel. These expenses hit my wallet hard. But in New York State, there&apos;s no way to avoid them.&quot;
            </p>
            <p className="font-semibold">Michaela T.</p>
            <p className="text-sm text-gray-400">University Of Buffalo</p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl">
                👨🏾
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              &quot;I work in downtown Boston and initially thought buying a car would be a cost-effective option. But I
              soon realized that the daily tolls, parking costs, fuel, and occasional parking fines added up quickly. I
              wish I had considered these expenses more carefully before making the purchase.&quot;
            </p>
            <p className="font-semibold">Sachin C.</p>
            <p className="text-sm text-gray-400">Employee at Amazon</p>
          </motion.div>
        </div>
      </section>

      {/* Supported By Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Supported by
        </motion.h2>

        <motion.div
          className="flex items-center justify-center space-x-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="h-24 rounded flex items-center justify-center px-8">
            <Image
              src="/images/idgvc-logo.png"
              alt="IDG Capital"
              width={200}
              height={60}
              className="object-contain"
            />
          </div>
          <div className="h-24 flex items-center justify-center">
            <Image
              src="/images/boston-university-logo.png"
              alt="Boston University"
              width={200}
              height={60}
              className="object-contain"
            />
          </div>
        </motion.div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to pocket the savings and shrink your carbon footprint?
          </h2>
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
            </Button>
          </form>
          <p className="text-sm text-gray-400 mt-2">We will never spam or share your data with anyone else.</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            {/* <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div> */}
            <span className="font-bold text-xl">HitcHiked</span>
          </div>

          {/* Partner logos */}
{/*           <div className="flex items-center space-x-6">
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
          </div> */}
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} HitcHiked. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
