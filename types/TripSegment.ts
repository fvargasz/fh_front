import type { Flight } from './flight';

export interface TripSegment {
  id: number
  trip_id: number
  flight_id: number
  flight: Flight
  flight_date: string          // ISO datetime
  price: string                // or number if you parse it
  segment_order: number
  segment_type: "outbound" | "return"
  created_at: string           // ISO datetime
  updated_at: string           // ISO datetime
}