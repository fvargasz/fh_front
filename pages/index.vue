
<template>
  <div class="bg-[url('/landingImg.jpg')] bg-cover bg-center bg-scroll bg-no-repeat min-h-screen">
    <div class="sticky inset-0 bg-sky-primary/15"></div>
    <BaseHeader/>
    <main class="flex-1 flex items-center justify-center px-4 py-12 z-10">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center space-y-8 animate-fade-in-up">
          <div class="space-y-4">
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-cloud-white leading-tight">
              Your Journey
              <span class="block text-sky-secondary">Starts Here</span>
            </h1>
            <p class="text-xl md:text-2xl text-cloud-white/90 max-w-3xl mx-auto">
              Discover the world with intelligent flight search. Find the perfect trip from anywhere to everywhere, 
              with smart timezone management and unbeatable prices.
            </p>
          </div>

          <div class="flex flex-wrap justify-center gap-4">
            <div class="flex items-center space-x-2 bg-cloud-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span class="text-cloud-white font-medium">Worldwide Coverage</span>
            </div>
            <div class="flex items-center space-x-2 bg-cloud-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span class="text-cloud-white font-medium">Timezone Smart</span>
            </div>
            <div class="flex items-center space-x-2 bg-cloud-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span class="text-cloud-white font-medium">Best Prices</span>
            </div>
          </div>

          <div class="pt-8" v-if="!hasConnectionError">
            <FlightSearchCard v-if="isInitialized && !hasConnectionError" />
            
          </div>
          <div v-else>
            <div class="flex justify-center flex-col items-center">
              <h2 class="text-cloud-white text-xl mb-4">Connection Error</h2>
              <p class="text-cloud-white/80 mb-4">Unable to connect to the database. Please check your connection.</p>
              <button 
                @click="retryConnection" 
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
          <div v-if="isLoggedIn" class="pt-6 flex flex-col items-center gap-4">
            <h2 class="text-xl md:text-2xl font-semibold text-cloud-white">
              Want to check your trips?
            </h2>
            <Button 
            @click="handleSearch"
            variant="hero" size="lg" class="min-w-48 px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center
              bg-gradient-to-r from-sky-500 to-indigo-600
              hover:from-sky-600 hover:to-indigo-700
              transition-colors duration-300">
              Show
            </Button>
            <div v-if="showTrips" class="w-full mt-6">
              <div v-if="trips.length === 0" class="text-xl md:text-2xl font-semibold text-black">
                <p>No trips found.</p>
              </div>
              <div v-for="trip in trips" :key="trip.id">
                <FlightInfoCard  
                  :trip="trip"
                  :outBoundFlight="trip.segments[0]!.flight" 
                  :trip-type="trip.trip_type"
                  :returnFlight="trip.trip_type === 'round_trip' ? trip.segments[1]!.flight : undefined"
                  :owned-flight="true"
                  :outboundDate="formatDate(trip.segments[0]!.flight_date)"
                  :returnDate="trip.trip_type === 'round_trip' ? formatDate(trip.segments[1]!.flight_date) : undefined"
                />
              </div>
          </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import type { Trip } from '~/types/Trip';

  const { user, isLoggedIn, isInitialized, loading, hasConnectionError, initializeAuth, retryConnection } = useAuth();

  const authPromise = initializeAuth();

  const trips = ref<Trip[]>([]);
  const showTrips = ref(false);

  async function handleSearch()  {
    showTrips.value = true;
    try {
     const config = useRuntimeConfig();
    const response = await axios.post(
        config.public.API_BASE_URL+"/trip/getActiveUserTrips" );

        trips.value = response.data.data as Trip[];
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-GB")
    .replace(/\//g, "-")        
}

</script>