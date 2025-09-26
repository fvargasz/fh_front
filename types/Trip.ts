import type { Airport } from "./airport"
import type { Flight } from "./flight"

export interface Trip {
  id: number
  user_id: number
  trip_type: "one_way" | "round_trip"
  origin_airport_id: number
  destination_airport_id: number
  origin_airport: Airport
  destination_airport: Airport
  earliest_departure: string   // ISO datetime
  latest_arrival: string       // ISO datetime
  segments: Flight[]
  segments_count: number
  total_price: string          // maybe change to number if API allows
  is_upcoming: boolean
  created_at: string           // ISO datetime
  updated_at: string           // ISO datetime
}