'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  ShoppingBag,
  Shirt,
  Watch,
  Smartphone,
  Home,
  BookOpen,
  TrendingUp,
  Shield,
  MessageCircle,
  Star,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '@/lib/utils/constants';

const iconMap: { [key: string]: any } = {
  Shirt,
  ShoppingBag,
  Watch,
  Smartphone,
  Home,
  BookOpen,
};

export default function LandingPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-green-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-green-600 bg-clip-text text-transparent">
              Ghana Marketplace
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/marketplace">
              <Button variant="ghost">Browse</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Buy, Sell & Swap
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-green-600 bg-clip-text text-transparent">
                  Across Ghana
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Ghana&apos;s premier marketplace for second-hand clothing, electronics, and more.
                Join thousands of buyers and sellers across the country.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Start Selling <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Browse Items
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
            >
              {[
                { number: '50K+', label: 'Active Users' },
                { number: '200K+', label: 'Items Sold' },
                { number: '15+', label: 'Cities' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find exactly what you&apos;re looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category, index) => {
              const IconComponent = iconMap[category.icon];
              return (
                <motion.div
                  key={category.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/marketplace?category=${category.id}`}>
                    <Card hover className="p-6 text-center group">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="h-8 w-8 text-amber-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {category.subcategories.length} types
                      </p>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600">
              The best platform for buying and selling in Ghana
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Safe & Secure',
                description: 'All transactions are protected. Buy and sell with confidence.',
              },
              {
                icon: MessageCircle,
                title: 'Easy Communication',
                description: 'Chat directly with buyers and sellers in real-time.',
              },
              {
                icon: TrendingUp,
                title: 'Best Prices',
                description: 'Find great deals and sell your items at fair prices.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-green-500 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied buyers and sellers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Kwame Mensah',
                location: 'Accra',
                text: 'I sold my old laptop within 2 days! The process was so easy and the buyer was great.',
                rating: 5,
              },
              {
                name: 'Akosua Osei',
                location: 'Kumasi',
                text: 'Found amazing deals on designer clothes. This is now my go-to marketplace!',
                rating: 5,
              },
              {
                name: 'Kofi Asante',
                location: 'Takoradi',
                text: 'Great platform with real people. Mobile Money payments make everything convenient.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">&quot;{testimonial.text}&quot;</p>
                  <div className="mt-auto">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join Ghana&apos;s largest marketplace today. It&apos;s free to list items!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto bg-white text-amber-600 hover:bg-gray-100"
              >
                Create Free Account
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10"
              >
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Ghana Marketplace</span>
              </div>
              <p className="text-gray-400">
                Ghana&apos;s trusted marketplace for buying and selling second-hand items.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/marketplace" className="hover:text-white">Browse Items</Link></li>
                <li><Link href="/signup" className="hover:text-white">Sell an Item</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/safety" className="hover:text-white">Safety Tips</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <p className="text-gray-400 mb-2">Email: hello@ghanamarketplace.com</p>
              <p className="text-gray-400">Phone: +233 24 123 4567</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ghana Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
