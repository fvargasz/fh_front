import axios from 'axios';
import type { Flight } from '~/types/flight';

export const fetchFlights = async (body: any) : Promise<any[]> => { 
    const config = useRuntimeConfig();
    
    const response = await axios.post(
    config.public.API_BASE_URL+"/flight/flights", body );

    if (body.tripType === 'round-trip') {
        console.log('Round-trip response data:', response.data);
        return response.data.trips;
    }

    const flights = response.data.flights;

    return flights;
}
