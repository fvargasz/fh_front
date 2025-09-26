import axios from "axios";

export const createTrip = async (body: any) : Promise<any> => {
    const config = useRuntimeConfig();
    const response = await axios.post(
        config.public.API_BASE_URL+"/trip/create", body );

    return response.data;
}