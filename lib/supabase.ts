import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          bio: string | null;
          avatar_url: string | null;
          banner_url: string | null;
          wallet_address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string;
          bio?: string | null;
          avatar_url?: string | null;
          banner_url?: string | null;
          wallet_address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          bio?: string | null;
          avatar_url?: string | null;
          banner_url?: string | null;
          wallet_address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      nfts: {
        Row: {
          id: string;
          title: string;
          description: string;
          media_url: string;
          owner_id: string;
          creator_id: string;
          price: number;
          status: 'available' | 'sold' | 'auction' | 'draft';
          sale_type: 'fixed' | 'auction' | 'bid';
          category: string;
          tags: string[];
          metadata: Record<string, any>;
          views: number;
          likes: number;
          auction_end_time: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          media_url: string;
          owner_id: string;
          creator_id: string;
          price?: number;
          status?: 'available' | 'sold' | 'auction' | 'draft';
          sale_type?: 'fixed' | 'auction' | 'bid';
          category?: string;
          tags?: string[];
          metadata?: Record<string, any>;
          views?: number;
          likes?: number;
          auction_end_time?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          media_url?: string;
          owner_id?: string;
          creator_id?: string;
          price?: number;
          status?: 'available' | 'sold' | 'auction' | 'draft';
          sale_type?: 'fixed' | 'auction' | 'bid';
          category?: string;
          tags?: string[];
          metadata?: Record<string, any>;
          views?: number;
          likes?: number;
          auction_end_time?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          nft_id: string;
          buyer_id: string;
          seller_id: string;
          amount: number;
          status: 'pending' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nft_id: string;
          buyer_id: string;
          seller_id: string;
          amount: number;
          status?: 'pending' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nft_id?: string;
          buyer_id?: string;
          seller_id?: string;
          amount?: number;
          status?: 'pending' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
      };
      bids: {
        Row: {
          id: string;
          nft_id: string;
          bidder_id: string;
          amount: number;
          status: 'active' | 'accepted' | 'rejected' | 'outbid';
          created_at: string;
        };
        Insert: {
          id?: string;
          nft_id: string;
          bidder_id: string;
          amount: number;
          status?: 'active' | 'accepted' | 'rejected' | 'outbid';
          created_at?: string;
        };
        Update: {
          id?: string;
          nft_id?: string;
          bidder_id?: string;
          amount?: number;
          status?: 'active' | 'accepted' | 'rejected' | 'outbid';
          created_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          participant_one_id: string;
          participant_two_id: string;
          order_id: string | null;
          last_message_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          participant_one_id: string;
          participant_two_id: string;
          order_id?: string | null;
          last_message_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          participant_one_id?: string;
          participant_two_id?: string;
          order_id?: string | null;
          last_message_at?: string;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          from_id: string;
          to_id: string;
          text: string;
          attachments: any[];
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          from_id: string;
          to_id: string;
          text: string;
          attachments?: any[];
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          from_id?: string;
          to_id?: string;
          text?: string;
          attachments?: any[];
          read_at?: string | null;
          created_at?: string;
        };
      };
      qr_records: {
        Row: {
          id: string;
          order_id: string;
          payload_hash: string;
          generated_at: string;
          scanned_at: string | null;
          scanned_by_ip: string | null;
          status: 'generated' | 'scanned' | 'verified';
        };
        Insert: {
          id?: string;
          order_id: string;
          payload_hash: string;
          generated_at?: string;
          scanned_at?: string | null;
          scanned_by_ip?: string | null;
          status?: 'generated' | 'scanned' | 'verified';
        };
        Update: {
          id?: string;
          order_id?: string;
          payload_hash?: string;
          generated_at?: string;
          scanned_at?: string | null;
          scanned_by_ip?: string | null;
          status?: 'generated' | 'scanned' | 'verified';
        };
      };
      likes: {
        Row: {
          user_id: string;
          nft_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          nft_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          nft_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
