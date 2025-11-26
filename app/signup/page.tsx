'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import { GHANA_LOCATIONS } from '@/lib/utils/constants';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    role: 'buyer' as 'buyer' | 'seller',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          location: formData.location,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      login(data.user, data.token);
      router.push('/marketplace');
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Join Ghana Marketplace
          </h1>
          <p className="text-gray-600">
            Create an account to start buying and selling
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              type="text"
              label="Full Name"
              placeholder="John Doe"
              icon={<User className="h-5 w-5 text-gray-400" />}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <Input
              type="email"
              label="Email Address"
              placeholder="your@email.com"
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <Input
              type="tel"
              label="Phone Number"
              placeholder="0244123456"
              icon={<Phone className="h-5 w-5 text-gray-400" />}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                >
                  <option value="">Select your location</option>
                  {GHANA_LOCATIONS.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <Input
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I want to
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                    formData.role === 'buyer'
                      ? 'border-amber-600 bg-amber-50 text-amber-700'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                  onClick={() => setFormData({ ...formData, role: 'buyer' })}
                >
                  Buy Items
                </button>
                <button
                  type="button"
                  className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                    formData.role === 'seller'
                      ? 'border-amber-600 bg-amber-50 text-amber-700'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                  onClick={() => setFormData({ ...formData, role: 'seller' })}
                >
                  Sell Items
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-amber-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-amber-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
