import type { Flight } from "./flight";

export interface TripOption {
  outbound: Flight;
  return: Flight;
}