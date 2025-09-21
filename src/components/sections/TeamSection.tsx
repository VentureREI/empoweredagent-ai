'use client'

import { useState, useEffect } from 'react'
import { Linkedin, Twitter, Github, Mail, MapPin, GraduationCap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { TeamMember } from '@/types'

const teamMembers: TeamMember[] = [
  {
    id: 'alex-thompson',
    name: 'Dr. Alex Thompson',
    role: 'CEO & Founder',
    bio: 'Former AI Research Director at Google, PhD in Machine Learning from Stanford. Led breakthrough research in neural architecture search and automated ML systems.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format',
    linkedin: 'https://linkedin.com/in/alexthompson',
    twitter: 'https://twitter.com/alexthompsonai',
    github: 'https://github.com/alexthompson',
    email: 'alex@empoweredagent.ai',
    specialties: ['Machine Learning', 'Neural Networks', 'Product Strategy', 'Team Leadership']
  },
  {
    id: 'lisa-wang',
    name: 'Lisa Wang',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Tesla Autopilot Engineer, MIT Computer Science. 10+ years building scalable AI systems for autonomous vehicles and robotics applications.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b25a55e8?w=400&h=400&fit=crop&crop=face&auto=format',
    linkedin: 'https://linkedin.com/in/lisawang',
    twitter: 'https://twitter.com/lisawangtech',
    github: 'https://github.com/lisawang',
    email: 'lisa@empoweredagent.ai',
    specialties: ['Distributed Systems', 'AI Infrastructure', 'Autonomous Systems', 'Engineering Leadership']
  },
  {
    id: 'david-kumar',
    name: 'David Kumar',
    role: 'Head of Product',
    bio: 'Former Product Lead at OpenAI, expert in AI/Human interaction design. Led product development for GPT-3 API and ChatGPT enterprise features.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format',
    linkedin: 'https://linkedin.com/in/davidkumar',
    twitter: 'https://twitter.com/davidkumarpm',
    email: 'david@empoweredagent.ai',
    specialties: ['Product Strategy', 'UX Design', 'AI Ethics', 'Customer Research']
  },
  {
    id: 'sarah-chen',
    name: 'Dr. Sarah Chen',
    role: 'VP of Research',
    bio: 'Former Principal Scientist at DeepMind, PhD in Cognitive Science from Berkeley. Pioneer in reinforcement learning and multi-agent systems.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format',
    linkedin: 'https://linkedin.com/in/sarahchen',
    twitter: 'https://twitter.com/sarahchenai',
    github: 'https://github.com/sarahchen',
    email: 'sarah@empoweredagent.ai',
    specialties: ['Reinforcement Learning', 'Multi-Agent Systems', 'Cognitive Science', 'Research Strategy']
  },
  {
    id: 'michael-rodriguez',
    name: 'Michael Rodriguez',
    role: 'VP of Engineering',
    bio: 'Former Staff Engineer at Stripe, expert in building financial technology at scale. Led infrastructure teams supporting millions of transactions daily.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face&auto=format',
    linkedin: 'https://linkedin.com/in/michaelrodriguez',
    twitter: 'https://twitter.com/mikrodtech',
    github: 'https://github.com/mrodriguez',
    email: 'michael@empoweredagent.ai',
    specialties: ['System Architecture', 'Financial Technology', 'Security', 'Team Management']
  },
  {
    id: 'emily-johnson',
    name: 'Emily Johnson',
    role: 'Head of Customer Success',
    bio: 'Former Director of Customer Success at Salesforce, expert in enterprise software adoption and customer experience optimization.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face&auto=format',
    linkedin: 'https://linkedin.com/in/emilyjohnson',
    twitter: 'https://twitter.com/emilyjcs',
    email: 'emily@empoweredagent.ai',
    specialties: ['Customer Success', 'Enterprise Sales', 'Change Management', 'Training & Onboarding']
  }
]

const advisors = [
  {
    name: 'Dr. Andrew Ng',
    role: 'AI Advisor',
    company: 'Former Stanford AI Lab Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format'
  },
  {
    name: 'Reid Hoffman',
    role: 'Strategic Advisor',
    company: 'Co-founder of LinkedIn',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&auto=format'
  },
  {
    name: 'Dr. Fei-Fei Li',
    role: 'Research Advisor',
    company: 'Stanford HAI Co-Director',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b25a55e8?w=200&h=200&fit=crop&crop=face&auto=format'
  }
]

export function TeamSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('team-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="team-section" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn(
          'text-center mb-16 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Our{' '}
            <span className="gradient-text">World-Class Team</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our team combines decades of experience from leading AI companies, research institutions, and technology organizations to build the future of intelligent automation.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <Card
              key={member.id}
              className={cn(
                'group cursor-pointer transition-all duration-1000 hover:scale-105',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                `delay-[${index * 150}ms]`
              )}
              onClick={() => setSelectedMember(member)}
              hover="lift"
            >
              <div className="text-center space-y-4">
                {/* Photo */}
                <div className="relative mx-auto mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-2xl mx-auto object-cover border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {member.specialties?.slice(0, 2).map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                  {(member.specialties?.length || 0) > 2 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                      +{(member.specialties?.length || 0) - 2} more
                    </span>
                  )}
                </div>

                {/* Social links */}
                <div className="flex justify-center items-center gap-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Twitter size={16} />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Advisors */}
        <div className={cn(
          'text-center transition-all duration-1000 delay-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Advisory Board
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <div key={index} className="text-center">
                <img 
                  src={advisor.image} 
                  alt={advisor.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-gray-200 dark:border-gray-700 mb-4"
                />
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {advisor.name}
                </h4>
                <p className="text-primary-600 dark:text-primary-400 text-sm">
                  {advisor.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  {advisor.company}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={cn(
          'text-center mt-16 transition-all duration-1000 delay-900',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              We're always looking for exceptional talent to join our team and help build the future of AI-powered business automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <a href="/careers">View Open Positions</a>
              </Button>
              <Button variant="secondary" asChild size="lg">
                <a href="/contact">Get in Touch</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Member detail modal would go here in a real implementation */}
    </section>
  )
}