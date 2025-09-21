'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Users, Code, Rocket, BarChart, Headphones } from 'lucide-react'

const processSteps = [
  {
    number: '1',
    icon: MessageCircle,
    title: 'Discovery Call',
    subtitle: 'Meet & Greet',
    description: 'Meet with the founders, your product manager, and the AI engineers BEFORE the engagement begins. We understand your business, challenges, and goals.',
    duration: '1-2 Days',
    deliverables: ['Business requirements analysis', 'Technical feasibility assessment', 'Project roadmap', 'ROI projections']
  },
  {
    number: '2',
    icon: Users,
    title: 'Team Assembly',
    subtitle: 'AI Dream Team',
    description: 'We assemble a dedicated team of AI specialists tailored to your project needs. Each team member is carefully selected based on relevant experience.',
    duration: '2-3 Days',
    deliverables: ['Team introductions', 'Skill matrix overview', 'Communication protocols', 'Project timeline']
  },
  {
    number: '3',
    icon: Code,
    title: 'Development Phase',
    subtitle: 'Building Your Solution',
    description: 'Our engineers begin developing your custom AI solution using cutting-edge technologies and best practices. Regular updates keep you informed.',
    duration: '2-4 Weeks',
    deliverables: ['Weekly progress reports', 'Demo sessions', 'Code reviews', 'Testing protocols']
  },
  {
    number: '4',
    icon: Rocket,
    title: 'Deployment',
    subtitle: 'Go Live',
    description: 'We deploy your AI solution to production with comprehensive testing and monitoring. Your team receives full training and documentation.',
    duration: '3-5 Days',
    deliverables: ['Production deployment', 'User training', 'Documentation', 'Monitoring setup']
  },
  {
    number: '5',
    icon: BarChart,
    title: 'Optimization',
    subtitle: 'Continuous Improvement',
    description: 'We monitor performance and continuously optimize your AI solution for better results. Regular check-ins ensure sustained success.',
    duration: 'Ongoing',
    deliverables: ['Performance analytics', 'Optimization reports', 'Feature updates', 'Strategy sessions']
  },
  {
    number: '6',
    icon: Headphones,
    title: 'Support',
    subtitle: '24/7 Maintenance',
    description: 'Our support team provides ongoing maintenance, updates, and improvements. We ensure your AI solution continues to deliver value.',
    duration: 'Ongoing',
    deliverables: ['24/7 monitoring', 'Regular updates', 'Issue resolution', 'Performance tuning']
  }
]

export function WorkflowStepsSection() {
  return (
    <section id="our-process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">Our Approach</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
              What is the Process Working With an{' '}
              <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                AI Agency?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven 6-step methodology ensures successful AI implementations that deliver measurable business value
            </p>
          </motion.div>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-purple-400 to-purple-200 transform -translate-x-1/2"></div>

          <div className="space-y-16">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className={`lg:flex lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`lg:w-5/12 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mr-4">
                            <Icon className="w-8 h-8 text-purple-600" />
                          </div>
                          <div>
                            <div className="text-sm text-purple-600 font-semibold mb-1">{step.subtitle}</div>
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>

                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Duration:</span>
                            <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                              {step.duration}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Deliverables:</h4>
                          <ul className="space-y-2">
                            {step.deliverables.map((deliverable, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></div>
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Center Number */}
                    <div className="hidden lg:flex lg:w-2/12 justify-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xl font-bold text-white">{step.number}</span>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="lg:w-5/12"></div>
                  </div>

                  {/* Mobile Number */}
                  <div className="lg:hidden flex justify-center mt-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}