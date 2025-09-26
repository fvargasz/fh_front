import axios from 'axios';
import type { Airport } from '~/types/airport';

export const fetchAirports = async () : Promise<Airport[]> => { 
    const config = useRuntimeConfig();
    const response = await axios.post(
        config.public.API_BASE_URL+"/airports/all" );

    return response.data as Airport[];
}