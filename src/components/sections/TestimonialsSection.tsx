'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote, ArrowLeft, ArrowRight, Play, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Martinez',
    title: 'Top Producer',
    company: 'Keller Williams Realty',
    avatar: '/avatars/sarah-martinez.jpg',
    rating: 5,
    quote: 'Empowered Agent completely transformed my business. What used to take me 20 hours of follow-up per week now happens automatically. I can finally focus on what I love - helping clients find their dream homes.',
    metrics: {
      timeSaved: '85%',
      moreLeads: '300% conversion',
      closings: '40% increase'
    },
    featured: true,
    videoTestimonial: 'https://youtube.com/embed/example1'
  },
  {
    id: 2,
    name: 'Marcus Thompson',
    title: 'Team Leader',
    company: 'RE/MAX Premier',
    avatar: '/avatars/marcus-thompson.jpg',
    rating: 5,
    quote: 'Our team went from manually tracking 50 leads to automatically nurturing 500+ prospects. The instant follow-up system helped us capture deals that would have slipped through the cracks.',
    metrics: {
      leadCapture: '95% faster',
      responseTime: 'Under 60 seconds',
      teamGrowth: '4.9 agent rating'
    },
    featured: false
  },
  {
    id: 3,
    name: 'Jennifer Chen',
    title: 'Luxury Agent',
    company: 'Coldwell Banker',
    avatar: '/avatars/jennifer-chen.jpg',
    rating: 5,
    quote: 'The CRM automation and client communication workflows are game-changers. My luxury clients expect white-glove service, and now I can deliver that level of attention to every single lead.',
    metrics: {
      clientSat: '10x better service',
      avgDeal: '99.7% accuracy',
      referrals: '250% more'
    },
    featured: true,
    videoTestimonial: 'https://youtube.com/embed/example3'
  },
  {
    id: 4,
    name: 'Robert Wilson',
    title: 'Broker Owner',
    company: 'Century 21 Elite',
    avatar: '/avatars/robert-wilson.jpg',
    rating: 5,
    quote: 'As a brokerage, we needed to scale without hiring more admin staff. Empowered Agent gave us enterprise-level automation that makes our 15-agent team operate like a 50-agent brokerage.',
    metrics: {
      efficiency: '400% boost',
      overhead: 'Same costs',
      revenue: '250% growth'
    },
    featured: false
  },
  {
    id: 5,
    name: 'Amanda Rodriguez',
    title: 'Buyer Specialist',
    company: 'EXIT Realty',
    avatar: '/avatars/amanda-rodriguez.jpg',
    rating: 5,
    quote: 'My buyer clients get instant property alerts and market updates. I went from manually sending listings to having an AI assistant that knows exactly what each client wants.',
    metrics: {
      satisfaction: '24/7 service',
      clientScore: '4.8/5 rating',
      showings: '60% more booked'
    },
    featured: true
  },
  {
    id: 6,
    name: 'Michael Foster',
    title: 'Investment Specialist',
    company: 'Weichert Realtors',
    avatar: '/avatars/michael-foster.jpg',
    rating: 5,
    quote: 'The deal tracking and commission management alone saved me 25 hours per month. But the real value is never missing a closing deadline or contract contingency again.',
    metrics: {
      timeSaved: '25 hrs/month',
      accuracy: '99.9% tracking',
      closings: 'On-time delivery'
    },
    featured: false
  }
]

const companies = [
  { name: 'Keller Williams', logo: '/logos/kw.svg', industry: 'Real Estate' },
  { name: 'RE/MAX', logo: '/logos/remax.svg', industry: 'Real Estate' },
  { name: 'Coldwell Banker', logo: '/logos/coldwell.svg', industry: 'Real Estate' },
  { name: 'Century 21', logo: '/logos/century21.svg', industry: 'Real Estate' },
  { name: 'EXIT Realty', logo: '/logos/exit.svg', industry: 'Real Estate' },
  { name: 'Weichert', logo: '/logos/weichert.svg', industry: 'Real Estate' }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <Card variant="default" hover="glow" className="p-8 h-full relative overflow-hidden">
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center opacity-20">
        <Quote className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>

      {/* Header */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 font-semibold text-lg flex-shrink-0">
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {testimonial.name}
          </h4>
          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
            {testimonial.title}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.company}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-between mb-6">
        <StarRating rating={testimonial.rating} />
        {testimonial.videoTestimonial && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowVideo(true)}
            className="text-primary-600 dark:text-primary-400"
          >
            <Play className="w-4 h-4 mr-1" />
            Video
          </Button>
        )}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
        "{testimonial.quote}"
      </blockquote>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        {Object.entries(testimonial.metrics).map(([key, value]) => (
          <div key={key} className="text-center">
            <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
              {value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </div>
        ))}
      </div>

      {testimonial.featured && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Featured
        </div>
      )}
    </Card>
  )
}

export function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const featuredTestimonials = testimonials.filter(t => t.featured)
  const itemsPerSlide = 1
  const maxSlides = Math.ceil(featuredTestimonials.length / itemsPerSlide)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, maxSlides])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides)
    setIsAutoPlay(false)
  }

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-dark-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary-100 dark:bg-primary-900 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent-100 dark:bg-accent-900 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            What Top Agents <span className="text-gradient">Are Saying</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            From solo agents to mega-teams, see how real estate professionals are closing more deals, 
            saving time, and growing their business with our automation systems.
          </motion.p>
        </motion.div>

        {/* Featured Testimonials Carousel */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-20"
        >
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="max-w-4xl mx-auto">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white dark:bg-dark-800 shadow-lg hover:shadow-purple"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="flex space-x-2">
                {featuredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide
                        ? 'bg-primary-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white dark:bg-dark-800 shadow-lg hover:shadow-purple"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            More Agent Success Stories
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.filter(t => !t.featured).map((testimonial) => (
              <motion.div key={testimonial.id} variants={itemVariants}>
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Companies Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="text-center"
        >
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-8">
            Trusted by agents at top brokerages nationwide
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="text-center">
                <div className="h-12 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    {company.name.split(' ')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 rounded-3xl p-12 border border-primary-200 dark:border-primary-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Join These Top Producers?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Schedule your demo today and see how automation can transform your real estate business in just 30 days.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                <CheckCircle className="w-5 h-5 mr-2" />
                Book Your Demo
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
                View More Case Studies
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}