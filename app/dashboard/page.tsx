'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import {
  ShoppingBag,
  Heart,
  MessageCircle,
  Settings,
  Plus,
  Sparkles,
  Package,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-green-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-green-600 bg-clip-text text-transparent">
                Ghana Marketplace
              </span>
            </Link>

            <div className="flex items-center space-x-3">
              <Link href="/marketplace">
                <Button variant="ghost" size="sm">
                  Browse
                </Button>
              </Link>
              <Link href="/sell">
                <Button variant="primary" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Sell Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Manage your listings and activity here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Listings</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                  <p className="text-3xl font-bold text-gray-900">28</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">
                    <span className="text-lg">GHS</span> 8,450
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Favorites</p>
                  <p className="text-3xl font-bold text-gray-900">156</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/sell">
            <Card hover className="p-6 text-center cursor-pointer group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Create New Listing</h3>
              <p className="text-sm text-gray-600">
                List a new item for sale on the marketplace
              </p>
            </Card>
          </Link>

          <Link href="/dashboard/messages">
            <Card hover className="p-6 text-center cursor-pointer group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Messages</h3>
              <p className="text-sm text-gray-600">
                View and respond to buyer inquiries
              </p>
            </Card>
          </Link>

          <Link href="/dashboard/settings">
            <Card hover className="p-6 text-center cursor-pointer group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-sm text-gray-600">
                Manage your account and preferences
              </p>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          </div>
          <CardBody>
            <div className="space-y-4">
              {[
                {
                  action: 'New message received',
                  item: 'iPhone 13 Pro - Like New',
                  time: '2 hours ago',
                },
                {
                  action: 'Item sold',
                  item: 'Nike Air Jordan 1 Retro High',
                  time: '1 day ago',
                },
                {
                  action: 'New favorite added',
                  item: 'Designer Leather Jacket',
                  time: '2 days ago',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.item}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
