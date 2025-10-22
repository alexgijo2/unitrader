'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { NFTCard } from '@/components/nft/nft-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';

const categories = ['All', 'Art', 'Music', 'Domain Names', 'Virtual Worlds', 'Trading Cards', 'Collectibles', 'Sports', 'Utility'];
const statusFilters = ['Buy Now', 'On Auctions', 'Has Offers'];
const chains = ['Ethereum', 'Polygon', 'Klaytn'];

const mockNFTs = [
  {
    id: '1',
    title: 'Hamlet Contemplates Contemporary Existence',
    media_url: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg',
    price: 4.89,
    likes: 100,
    views: 223,
    sale_type: 'auction' as const,
    auction_end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'available' as const,
    creator: {
      id: '1',
      name: 'SalvadorDali',
      avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    },
    owner: {
      id: '1',
      name: 'SalvadorDali',
      avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    },
  },
  {
    id: '2',
    title: 'Triumphant Awakening Contemporary Art',
    media_url: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg',
    price: 4.89,
    likes: 220,
    views: 445,
    sale_type: 'auction' as const,
    auction_end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'available' as const,
    creator: {
      id: '2',
      name: 'Trista Francis',
      avatar_url: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    },
    owner: {
      id: '2',
      name: 'Trista Francis',
      avatar_url: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    },
  },
  {
    id: '3',
    title: 'Living Vase 01 By Lanza',
    media_url: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg',
    price: 4.89,
    likes: 90,
    views: 312,
    sale_type: 'auction' as const,
    auction_end_time: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'available' as const,
    creator: {
      id: '3',
      name: 'Freddie Carpenter',
      avatar_url: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    },
    owner: {
      id: '3',
      name: 'Freddie Carpenter',
      avatar_url: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    },
  },
  {
    id: '4',
    title: 'Flame Dress By Balmain',
    media_url: 'https://images.pexels.com/photos/1102772/pexels-photo-1102772.jpeg',
    price: 4.89,
    likes: 143,
    views: 567,
    sale_type: 'fixed' as const,
    status: 'available' as const,
    creator: {
      id: '4',
      name: 'Tyler Covington',
      avatar_url: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    },
    owner: {
      id: '4',
      name: 'Tyler Covington',
      avatar_url: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    },
  },
];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const toggleChain = (chain: string) => {
    setSelectedChains(prev =>
      prev.includes(chain) ? prev.filter(c => c !== chain) : [...prev, chain]
    );
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span className="breadcrumb-separator">/</span>
            <span>Explore</span>
          </div>

          <h1 className="mb-6">Explore 4</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover unique digital assets from talented creators around the world
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Status
              </h3>
              <div className="space-y-2">
                {statusFilters.map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStatus.includes(status)}
                      onChange={() => toggleStatus(status)}
                      className="rounded border-border"
                    />
                    <span className="text-sm">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Chains</h3>
              <div className="space-y-2">
                {chains.map((chain) => (
                  <label key={chain} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedChains.includes(chain)}
                      onChange={() => toggleChain(chain)}
                      className="rounded border-border"
                    />
                    <span className="text-sm">{chain}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search NFTs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 input-field"
                />
              </div>
              <Button variant="outline" className="btn-secondary">
                Sort by
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNFTs.map((nft) => (
                <NFTCard key={nft.id} {...nft} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="btn-secondary" size="lg">
                Load More
              </Button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
