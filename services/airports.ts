import axios from 'axios';
import type { Airport } from '~/types/airport';

export const fetchAirports = async () : Promise<Airport[]> => { 
    const config = useRuntimeConfig();
    const response = await axios.post(
        config.public.API_BASE_URL+"/airports/all" );

    console.log("Fetched airports:", response.data);
    return response.data as Airport[];
}