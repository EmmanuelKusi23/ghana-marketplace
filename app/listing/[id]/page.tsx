'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  MapPin,
  Heart,
  Eye,
  Share2,
  MessageCircle,
  ArrowLeft,
  User,
  Clock,
  Sparkles,
  CheckCircle2,
  ShoppingBag,
} from 'lucide-react';
import { formatCurrency, formatRelativeTime, formatDate } from '@/lib/utils/format';
import { sampleListings } from '@/lib/utils/sampleData';
import { CONDITIONS } from '@/lib/utils/constants';

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  const listing = sampleListings.find((l) => l.id === params.id);

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Listing Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The item you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/marketplace">
            <Button variant="primary">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const condition = CONDITIONS.find((c) => c.value === listing.condition);
  const similarListings = sampleListings
    .filter((l) => l.category === listing.category && l.id !== listing.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
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
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden mb-4">
              <div className="relative h-96 bg-gray-100">
                <Image
                  src={listing.images[selectedImage]}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-gray-700" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {listing.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-amber-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image src={image} alt={`${listing.title} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Listing Details */}
          <div>
            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="mb-4">
                {listing.condition === 'new' && (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-2">
                    Brand New
                  </span>
                )}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {listing.title}
                </h1>
                <p className="text-4xl font-bold text-amber-600 mb-4">
                  {formatCurrency(listing.price)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Condition</p>
                  <p className="font-semibold text-gray-900">{condition?.label}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    <p className="font-semibold text-gray-900">{listing.location}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Category</p>
                  <p className="font-semibold text-gray-900">{listing.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Posted</p>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <p className="font-semibold text-gray-900">
                      {formatRelativeTime(listing.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => setShowContactModal(true)}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Seller
                </Button>
                <Button variant="secondary" size="lg" className="flex-1">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-green-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <p className="font-semibold text-gray-900 mr-2">
                      {listing.seller?.name}
                    </p>
                    {listing.seller?.verified && (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.seller?.location}
                  </div>
                  <p className="text-sm text-gray-600">
                    Member since {formatDate(listing.seller?.joinDate || new Date())}
                  </p>
                </div>
              </div>
              <Link href={`/profile/${listing.sellerId}`}>
                <Button variant="outline" className="w-full mt-4">
                  View Profile
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Listing Stats */}
        <Card className="p-6 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Eye className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">
                  {listing.views}
                </span>
              </div>
              <p className="text-sm text-gray-600">Views</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Heart className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">
                  {listing.favorites}
                </span>
              </div>
              <p className="text-sm text-gray-600">Favorites</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">
                  {formatDate(listing.createdAt)}
                </span>
              </div>
              <p className="text-sm text-gray-600">Listed On</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">
                  {listing.location}
                </span>
              </div>
              <p className="text-sm text-gray-600">Location</p>
            </div>
          </div>
        </Card>

        {/* Similar Listings */}
        {similarListings.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Similar Items
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarListings.map((item) => (
                <Link key={item.id} href={`/listing/${item.id}`}>
                  <Card hover className="h-full overflow-hidden">
                    <div className="relative h-40 bg-gray-100">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xl font-bold text-amber-600 mb-2">
                        {formatCurrency(item.price)}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.location}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Contact Seller
            </h3>
            <p className="text-gray-600 mb-6">
              Send a message to {listing.seller?.name} about this item
            </p>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4"
              rows={4}
              placeholder="Hi, I'm interested in this item..."
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowContactModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" className="flex-1">
                Send Message
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
