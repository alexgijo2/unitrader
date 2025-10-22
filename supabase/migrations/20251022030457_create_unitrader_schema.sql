/*
  # Create Unitrader NFT Marketplace Schema

  ## Overview
  This migration creates the complete database schema for the Unitrader NFT marketplace,
  including tables for users, NFTs, orders, conversations, messages, bids, and QR records.

  ## New Tables

  ### 1. profiles
  Extended user profile information linked to auth.users
  - `id` (uuid, pk, references auth.users)
  - `name` (text) - User's display name
  - `bio` (text) - User biography
  - `avatar_url` (text) - Profile picture URL
  - `banner_url` (text) - Profile banner URL
  - `wallet_address` (text, unique) - Connected wallet address
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. nfts
  NFT listings and metadata
  - `id` (uuid, pk)
  - `title` (text) - NFT title
  - `description` (text) - NFT description
  - `media_url` (text) - Media file URL
  - `owner_id` (uuid, fk -> profiles) - Current owner
  - `creator_id` (uuid, fk -> profiles) - Original creator
  - `price` (numeric) - Current/fixed price
  - `status` (text) - 'available', 'sold', 'auction', 'draft'
  - `sale_type` (text) - 'fixed', 'auction', 'bid'
  - `category` (text) - NFT category
  - `tags` (text[]) - Array of tags
  - `metadata` (jsonb) - Additional metadata
  - `views` (integer) - View count
  - `likes` (integer) - Like count
  - `auction_end_time` (timestamptz) - For auctions
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. orders
  Purchase orders and transactions
  - `id` (uuid, pk)
  - `nft_id` (uuid, fk -> nfts)
  - `buyer_id` (uuid, fk -> profiles)
  - `seller_id` (uuid, fk -> profiles)
  - `amount` (numeric) - Transaction amount
  - `status` (text) - 'pending', 'completed', 'cancelled'
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. bids
  Auction bids
  - `id` (uuid, pk)
  - `nft_id` (uuid, fk -> nfts)
  - `bidder_id` (uuid, fk -> profiles)
  - `amount` (numeric) - Bid amount
  - `status` (text) - 'active', 'accepted', 'rejected', 'outbid'
  - `created_at` (timestamptz)

  ### 5. conversations
  Chat conversations between users
  - `id` (uuid, pk)
  - `participant_one_id` (uuid, fk -> profiles)
  - `participant_two_id` (uuid, fk -> profiles)
  - `order_id` (uuid, fk -> orders, nullable) - Associated order
  - `last_message_at` (timestamptz)
  - `created_at` (timestamptz)

  ### 6. messages
  Chat messages
  - `id` (uuid, pk)
  - `conversation_id` (uuid, fk -> conversations)
  - `from_id` (uuid, fk -> profiles)
  - `to_id` (uuid, fk -> profiles)
  - `text` (text) - Message content
  - `attachments` (jsonb) - File attachments
  - `read_at` (timestamptz) - When message was read
  - `created_at` (timestamptz)

  ### 7. qr_records
  QR code generation and scan records
  - `id` (uuid, pk)
  - `order_id` (uuid, fk -> orders)
  - `payload_hash` (text) - Hashed payload for verification
  - `generated_at` (timestamptz)
  - `scanned_at` (timestamptz) - When QR was scanned
  - `scanned_by_ip` (text) - IP address of scanner
  - `status` (text) - 'generated', 'scanned', 'verified'

  ### 8. likes
  User likes on NFTs
  - `user_id` (uuid, fk -> profiles)
  - `nft_id` (uuid, fk -> nfts)
  - `created_at` (timestamptz)
  - Primary key: (user_id, nft_id)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated user access
  - Implement ownership checks where appropriate
  - Public read access for NFT listings
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  bio text DEFAULT '',
  avatar_url text,
  banner_url text,
  wallet_address text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create nfts table
CREATE TABLE IF NOT EXISTS nfts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  media_url text NOT NULL,
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  creator_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  price numeric(20, 8) DEFAULT 0,
  status text DEFAULT 'available' CHECK (status IN ('available', 'sold', 'auction', 'draft')),
  sale_type text DEFAULT 'fixed' CHECK (sale_type IN ('fixed', 'auction', 'bid')),
  category text DEFAULT 'art',
  tags text[] DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  auction_end_time timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE nfts ENABLE ROW LEVEL SECURITY;

-- NFT policies
CREATE POLICY "Public NFTs are viewable by everyone"
  ON nfts FOR SELECT
  USING (status != 'draft' OR owner_id = auth.uid());

CREATE POLICY "Authenticated users can create NFTs"
  ON nfts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id AND auth.uid() = creator_id);

CREATE POLICY "Owners can update their NFTs"
  ON nfts FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their NFTs"
  ON nfts FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nft_id uuid REFERENCES nfts(id) ON DELETE CASCADE NOT NULL,
  buyer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount numeric(20, 8) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Order policies
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Authenticated users can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Participants can update their orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id)
  WITH CHECK (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nft_id uuid REFERENCES nfts(id) ON DELETE CASCADE NOT NULL,
  bidder_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount numeric(20, 8) NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'accepted', 'rejected', 'outbid')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- Bid policies
CREATE POLICY "Anyone can view bids on public NFTs"
  ON bids FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM nfts
      WHERE nfts.id = bids.nft_id
      AND nfts.status IN ('available', 'auction')
    )
  );

CREATE POLICY "Authenticated users can place bids"
  ON bids FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = bidder_id);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_one_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  participant_two_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  last_message_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT different_participants CHECK (participant_one_id != participant_two_id)
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Conversation policies
CREATE POLICY "Participants can view their conversations"
  ON conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = participant_one_id OR auth.uid() = participant_two_id);

CREATE POLICY "Authenticated users can create conversations"
  ON conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = participant_one_id OR auth.uid() = participant_two_id);

CREATE POLICY "Participants can update conversations"
  ON conversations FOR UPDATE
  TO authenticated
  USING (auth.uid() = participant_one_id OR auth.uid() = participant_two_id)
  WITH CHECK (auth.uid() = participant_one_id OR auth.uid() = participant_two_id);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  from_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  to_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  text text NOT NULL,
  attachments jsonb DEFAULT '[]',
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Message policies
CREATE POLICY "Conversation participants can view messages"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() = from_id OR auth.uid() = to_id);

CREATE POLICY "Authenticated users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_id);

CREATE POLICY "Message recipients can mark as read"
  ON messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = to_id)
  WITH CHECK (auth.uid() = to_id);

-- Create qr_records table
CREATE TABLE IF NOT EXISTS qr_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  payload_hash text NOT NULL,
  generated_at timestamptz DEFAULT now(),
  scanned_at timestamptz,
  scanned_by_ip text,
  status text DEFAULT 'generated' CHECK (status IN ('generated', 'scanned', 'verified'))
);

ALTER TABLE qr_records ENABLE ROW LEVEL SECURITY;

-- QR record policies
CREATE POLICY "Users can view QR records for their orders"
  ON qr_records FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = qr_records.order_id
      AND (orders.buyer_id = auth.uid() OR orders.seller_id = auth.uid())
    )
  );

CREATE POLICY "Order participants can create QR records"
  ON qr_records FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_id
      AND (orders.buyer_id = auth.uid() OR orders.seller_id = auth.uid())
    )
  );

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  nft_id uuid REFERENCES nfts(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, nft_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Like policies
CREATE POLICY "Anyone can view likes"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can like NFTs"
  ON likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike NFTs"
  ON likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_nfts_owner ON nfts(owner_id);
CREATE INDEX IF NOT EXISTS idx_nfts_creator ON nfts(creator_id);
CREATE INDEX IF NOT EXISTS idx_nfts_status ON nfts(status);
CREATE INDEX IF NOT EXISTS idx_nfts_category ON nfts(category);
CREATE INDEX IF NOT EXISTS idx_nfts_created_at ON nfts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller ON orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_nft ON orders(nft_id);
CREATE INDEX IF NOT EXISTS idx_bids_nft ON bids(nft_id);
CREATE INDEX IF NOT EXISTS idx_bids_bidder ON bids(bidder_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_participants ON conversations(participant_one_id, participant_two_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_nfts_updated_at ON nfts;
CREATE TRIGGER update_nfts_updated_at
  BEFORE UPDATE ON nfts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', ''), NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
