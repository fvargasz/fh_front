import type { Flight } from './flight';

export interface TripSegment {
  id: number
  trip_id: number
  flight_id: number
  flight: Flight
  flight_date: string          
  price: string                
  segment_order: number
  segment_type: "outbound" | "return"
  created_at: string           
  updated_at: string           
}