export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      instructors: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          website: string | null
          address_line1: string
          address_line2: string | null
          city: string
          postcode: string
          travel_distance: number
          experience: number
          hourly_rate: number
          about: string
          created_at: string
          updated_at: string
          latitude: number | null
          longitude: number | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          website?: string | null
          address_line1: string
          address_line2?: string | null
          city: string
          postcode: string
          travel_distance: number
          experience: number
          hourly_rate: number
          about: string
          created_at?: string
          updated_at?: string
          latitude?: number | null
          longitude?: number | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          website?: string | null
          address_line1?: string
          address_line2?: string | null
          city?: string
          postcode?: string
          travel_distance?: number
          experience?: number
          hourly_rate?: number
          about?: string
          created_at?: string
          updated_at?: string
          latitude?: number | null
          longitude?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_distance: {
        Args: {
          lat1: number
          lon1: number
          lat2: number
          lon2: number
        }
        Returns: number
      }
      find_nearby_instructors: {
        Args: {
          search_lat: number
          search_lon: number
          radius_miles: number
        }
        Returns: {
          id: string
          name: string
          postcode: string
          experience: number
          hourly_rate: number
          distance: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}