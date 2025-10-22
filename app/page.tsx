'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { NFTCard } from '@/components/nft/nft-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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

const topSellers = [
  {
    id: '1',
    name: 'SalvadorDali',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    sales: '34.5 ETH',
  },
  {
    id: '2',
    name: 'Trista Francis',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    sales: '28.2 ETH',
  },
  {
    id: '3',
    name: 'Freddie Carpenter',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    sales: '24.8 ETH',
  },
  {
    id: '4',
    name: 'Tyler Covington',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    sales: '19.7 ETH',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg')] bg-cover bg-center opacity-5"></div>

        <div className="section-container relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6">
                Discover, Collect, and Trade
                <span className="text-gradient block">Extraordinary NFTs</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Unitrader is the premier marketplace for digital art, collectibles, and unique digital assets.
                Join thousands of creators and collectors in the future of digital ownership.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Button size="lg" className="btn-primary" asChild>
                  <Link href="/explore">
                    Explore NFTs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="btn-secondary" asChild>
                  <Link href="/create">Create NFT</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
            >
              {[
                { icon: TrendingUp, label: 'Total Volume', value: '1.2M ETH' },
                { icon: Users, label: 'Active Users', value: '45K+' },
                { icon: Zap, label: 'NFTs Minted', value: '128K+' },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-2xl p-6">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-bold text-2xl mb-1">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="mb-2">Live Auctions</h2>
            <p className="text-muted-foreground">Bid on exclusive NFTs before time runs out</p>
          </div>
          <Button variant="outline" className="btn-secondary" asChild>
            <Link href="/explore?filter=auction">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockNFTs.map((nft, i) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <NFTCard {...nft} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="mb-2">Top Sellers</h2>
            <p className="text-muted-foreground">Meet the most successful creators this month</p>
          </div>
          <Button variant="outline" className="btn-secondary" asChild>
            <Link href="/rankings">
              View Rankings
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topSellers.map((seller, i) => (
            <motion.div
              key={seller.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Link href={`/profile/${seller.id}`}>
                <div className="glass rounded-2xl p-6 hover:scale-105 transition-all cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={seller.avatar} />
                        <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{seller.name}</h4>
                      <p className="text-sm text-muted-foreground">Creator</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Sales</p>
                    <p className="font-bold text-lg">{seller.sales}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-container">
        <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 gradient-bg opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="mb-4">Start Your NFT Journey Today</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Create, sell, and collect unique digital assets. Join the Unitrader community and be part of the future of digital ownership.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" className="btn-primary" asChild>
                <Link href="/auth/register">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
