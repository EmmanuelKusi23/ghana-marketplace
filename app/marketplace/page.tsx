'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Heart,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES, GHANA_LOCATIONS, CONDITIONS } from '@/lib/utils/constants';
import { formatCurrency, formatRelativeTime } from '@/lib/utils/format';
import { Listing, MarketplaceFilters } from '@/types';
import { sampleListings } from '@/lib/utils/sampleData';

export default function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>(sampleListings);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<MarketplaceFilters>({
    searchQuery: '',
    category: '',
    subcategory: '',
    location: undefined,
    condition: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: 'recent',
  });

  useEffect(() => {
    filterListings();
  }, [filters]);

  const filterListings = () => {
    let filtered = [...sampleListings];

    if (filters.searchQuery) {
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(filters.searchQuery!.toLowerCase()) ||
          listing.description.toLowerCase().includes(filters.searchQuery!.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter((listing) => listing.category === filters.category);
    }

    if (filters.subcategory) {
      filtered = filtered.filter((listing) => listing.subcategory === filters.subcategory);
    }

    if (filters.location) {
      filtered = filtered.filter((listing) => listing.location === filters.location);
    }

    if (filters.condition) {
      filtered = filtered.filter((listing) => listing.condition === filters.condition);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((listing) => listing.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((listing) => listing.price <= filters.maxPrice!);
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    setListings(filtered);
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      category: '',
      subcategory: '',
      location: undefined,
      condition: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: 'recent',
    });
  };

  const activeFiltersCount = [
    filters.category,
    filters.location,
    filters.condition,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-green-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-green-600 bg-clip-text text-transparent">
                Ghana Marketplace
              </span>
            </Link>

            <div className="flex items-center space-x-3">
              <Link href="/sell">
                <Button variant="primary" size="sm">
                  Sell an Item
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search for items..."
                icon={<Search className="h-5 w-5 text-gray-400" />}
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              />
            </div>
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              size="md"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filter Results</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear all
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={filters.category}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value, subcategory: '' })
                    }
                  >
                    <option value="">All Categories</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={filters.location || ''}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value as any })
                    }
                  >
                    <option value="">All Locations</option>
                    {GHANA_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condition
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={filters.condition || ''}
                    onChange={(e) =>
                      setFilters({ ...filters, condition: e.target.value as any })
                    }
                  >
                    <option value="">All Conditions</option>
                    {CONDITIONS.map((cond) => (
                      <option key={cond.value} value={cond.value}>
                        {cond.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters({ ...filters, sortBy: e.target.value as any })
                    }
                  >
                    <option value="recent">Most Recent</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range (GHS)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={filters.minPrice || ''}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          minPrice: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={filters.maxPrice || ''}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          maxPrice: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {listings.length} {listings.length === 1 ? 'Item' : 'Items'} Found
          </h1>
          <p className="text-gray-600">
            Browse through our collection of quality second-hand items
          </p>
        </div>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button variant="primary" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <Link key={listing.id} href={`/listing/${listing.id}`}>
                <Card hover className="h-full overflow-hidden group">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <Image
                      src={listing.images[0]}
                      alt={listing.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <Heart className="h-4 w-4 text-gray-700" />
                      </button>
                    </div>
                    {listing.condition === 'new' && (
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded">
                          NEW
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {listing.title}
                    </h3>
                    <p className="text-2xl font-bold text-amber-600 mb-2">
                      {formatCurrency(listing.price)}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {listing.location}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {listing.views}
                      </div>
                      <span>{formatRelativeTime(listing.createdAt)}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
