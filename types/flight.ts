import type { Airline } from "./airline";
import type { Airport } from "./airport";

export interface Flight {
    id: number;
    airline: Airline;
    number: number;
    name: string;
    departure_airport: Airport;
    departure_time: string;
    arrival_airport: Airport;
    arrival_time: string;
    price: number;

}