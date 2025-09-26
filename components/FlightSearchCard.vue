<template>
  <div class="w-full max-w-6xl mx-auto space-y-8" v-if="airports && airports.length > 0">
    <div class="p-8 
    rounded-md
    bg-[linear-gradient(145deg,hsl(0_0%_100%/.9),hsl(0_0%_100%/.7))]
    backdrop-blur-sm 
    border-sky-primary/20 shadow-[box-shadow:0_8px_32px_-8px_hsl(217_91%_60%/.15)]">
      <div class="space-y-6">
        <!-- Trip Type Selection -->
        <div class="tabs flex gap-2">
            <button
            v-for="tab in tripItems"
            :key="tab.value"
            :class="['px-4 py-2 rounded', { 'bg-blue-500 text-white': tripType === tab.value, 'bg-gray-300': tripType !== tab.value }]"
            @click="setTripType(tab.value)"
            >
            {{ tab.label }}
            </button>
        </div>

        <!-- Search Form -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- From -->
          <div class="space-y-2">
            <Label for="from" class="text-sm font-medium text-foreground">From</Label>
            <div class="relative">
              <Icon
                name="ic:outline-flight-takeoff"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-primary pointer-events-none z-10"
              />
              <select
                id="from"
                v-model="searchData.from"
                @change="handleDepartureChange"
                class="w-full pl-10 pr-8 py-2 rounded border border-sky-primary/30 text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-sky-primary/20 focus:border-sky-primary"
              >
                <!-- <option value="" disabled selected>Select departure city or airport</option> -->
                <option
                  v-for="airport in airports"
                  :key="airport.code"
                  :value="airport.code"
                >
                  {{ airport.city }}, {{ airport.country_code }} ({{ airport.code }})
                </option>
              </select>
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg class="h-4 w-4 text-sky-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <!-- To -->
          <div class="space-y-2">
            <Label for="to" class="text-sm font-medium text-foreground">To</Label>
            <div class="relative">
              <Icon
                name="ic:outline-flight-land"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-primary pointer-events-none z-10"
              />
              <select
                id="to"
                v-model="searchData.to"
                @change="handleArrivalChange"
                class="w-full pl-10 pr-8 py-2 rounded border border-sky-primary/30 text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-sky-primary/20 focus:border-sky-primary"
              >
                <!-- <option value="" disabled selected>Select arrival city or airport</option> -->
                <option
                  v-for="airport in availableArrivalAirports"
                  :key="airport.code"
                  :value="airport.code"
                >
                  {{ airport.city }}, {{ airport.country_code }} ({{ airport.code }})
                </option>
              </select>
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg class="h-4 w-4 text-sky-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Departure Date -->
          <div class="space-y-2">
            <Label for="depart" class="text-sm font-medium text-foreground">Departure</Label>
            <div class="relative">
                <Icon
                    name="material-symbols:calendar-month-outline"
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-primary"
                />
                <Input
                    id="depart"
                    type="date"
                    v-model="searchData.departDate"
                    @input="onDepartDateChange"
                    :min="today"
                    class="w-full pl-10 pr-3 py-2 rounded border border-sky-primary/30 text-sm placeholder:text-sky-primary/50 focus:outline-none focus:ring-2 focus:ring-sky-primary/20 focus:border-sky-primary"
                />
            </div>
          </div>

            <!-- Return Date (only round trip) -->
            <div v-if="tripType === 'round_trip'" class="space-y-2">
                <Label for="return" class="text-sm font-medium text-foreground">Return</Label>
                <div class="relative">
                    <Icon
                        name="material-symbols:calendar-month-outline"
                        class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-primary"
                    />
                    <Input
                        id="return"
                        type="date"
                        v-model="searchData.returnDate"
                        @input="onReturnDateChange"
                        :min="minReturnDate"
                        class="w-full pl-10 pr-3 py-2 rounded border border-sky-primary/30 text-sm placeholder:text-sky-primary/50 focus:outline-none focus:ring-2 focus:ring-sky-primary/20 focus:border-sky-primary"
                    />
                </div>
            </div>
        </div>
        <!-- Search Button -->
        <div class="flex justify-center pt-4">
          <Button size="lg" @click="handleSearch" 
          class="min-w-48 px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center
         bg-gradient-to-r from-sky-500 to-indigo-600
         hover:from-sky-600 hover:to-indigo-700
         transition-colors duration-300"
          >
            Search Flights
            <Icon name="material-symbols:arrow-forward-rounded" class="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>

  
  <div v-if="showTrips" class="w-full max-w-6xl mx-auto mt-8">
    <div v-if="flights && flights.length > 0" class="p-4 mt-4
      bg-white/60
      backdrop-blur-sm rounded-md
      pr-8">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-foreground">{{ flights.length }} flight found</h2>
        <p>{{getTripType()}}</p>
      </div>
      <div v-for="flight in flights" class="flex flex-col">
        <FlightInfoCard v-if="tripType === 'one_way'" :outBoundFlight="flight" :trip-type="tripType"
        :onClick="data => onSelectPressed(data)" :owned-flight="false"/>
      </div>
    </div>
    <div v-else-if="tripOptions && tripOptions.length > 0" class="p-4 mt-4
      bg-white/60
      backdrop-blur-sm rounded-md
      pr-8">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-foreground">{{ tripOptions.length }} flight found</h2>
        <p>{{getTripType()}}</p>
      </div>
      
      <div v-for="option in tripOptions" class="flex flex-col">
        <FlightInfoCard v-if="tripType === 'round_trip'" 
        :outBoundFlight="option.outbound" 
        :return-flight="option.return" 
        :trip-type="tripType"
        :onClick="data => onSelectPressed(data)"
        :owned-flight="false"/>
      </div>
    </div>
  </div>
  <div v-else-if="showTrips && flights.length === 0 && tripOptions.length === 0" class="w-full max-w-6xl mx-auto mt-8">
    <div class="p-4 mt-4
      bg-white/60
      backdrop-blur-sm rounded-md
      pr-8">
      <h2 class="text-2xl font-bold text-foreground">No flights found. Please try different search criteria.</h2>
    </div>
  </div>
</template>

 <script setup lang="ts">
import { ref } from 'vue'
import { fetchAirports } from '~/services/airports';
import { fetchFlights } from '~/services/flight';
import { createTrip } from '~/services/Trips';
import type { Airport } from '~/types/airport';
import type { Flight } from '~/types/flight';
import type { TripOption } from '~/types/TripOption';

const flights = ref<Flight[]>([]);
const tripOptions = ref<TripOption[]>([]);
const departureAirport = ref();
const arrivalAirport = ref();
const airports = ref<Airport[]>([]);
const showTrips = ref(false);

// tabs
const tripType = ref<'one_way' | 'round_trip'>('round_trip')

const tripItems = [
  { label: 'Round Trip', value: 'round_trip' },
  { label: 'One Way', value: 'one_way' }
]

const getTripType = (): string =>
  tripItems.find(trip => trip.value === tripType.value)?.label || ""

const availableArrivalAirports = computed(() => {
  return airports.value.filter((airport: Airport) => airport.code !== searchData.from);
  });

  const minReturnDate = computed(() => {
  return searchData.departDate || today.value
})

const today = computed(() => {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
})

const searchData = reactive({
  from: '',
  to: '',
  departDate: '',
  returnDate: '',
  passengers: 1
})

// methods
async function handleSearch()  {

  flights.value = [];
  tripOptions.value = [];

  const body = {
    departure_airport_id: departureAirport.value?.id,
    arrival_airport_id: arrivalAirport.value?.id,
    tripType: tripType.value,
    departDate: searchData.departDate,
    returnDate: tripType.value === 'round_trip' ? searchData.returnDate : null,
  }

  try {
    const flightOptions = await fetchFlights(body);

    if (tripType.value === 'one_way') {
      flights.value = flightOptions as Flight[];
      console.log('one_way flights:', flights.value);
    } else {
      tripOptions.value = flightOptions as TripOption[];
      console.log('round_trip options:', tripOptions.value);
    }
    showTrips.value = true;
  } catch (error) {
    
  }
  
}

const handleDepartureChange = () => {
  if (searchData.from) {
    const selectedAirport = airports.value.find(airport => airport.code === searchData.from);
    if (selectedAirport) {
      departureAirport.value = selectedAirport;
      console.log('Departure airport set to:', selectedAirport);
    }
  }
};

// Handle arrival airport selection
const handleArrivalChange = () => {
  if (searchData.to) {
    const selectedAirport = airports.value.find(airport => airport.code === searchData.to);
    if (selectedAirport) {
      arrivalAirport.value = selectedAirport;
      console.log('Arrival airport set to:', selectedAirport);
    }
  }
};

function onDepartDateChange(event : any) {
  searchData.departDate = event.target.value
}

function onReturnDateChange(event : any) {
  searchData.returnDate = event.target.value
}

onMounted(async () => {
  airports.value = await fetchAirports();
});

function setTripType(type: 'one_way' | 'round_trip') {
  tripType.value = type;
  flights.value = [];
  tripOptions.value = [];
}

const onSelectPressed = async (trip: any) => {
  var body: any = {};

  const formatDate = (date: any) => {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }
  if (typeof date === 'string') {
    return new Date(date).toISOString().split('T')[0];
  }
  return date;
};
  
  if (tripType.value === 'round_trip') {
    const tripToStore = trip as TripOption;
    body = {
      trip_type: "round_trip", 
      origin_airport_id: tripToStore.outbound.departure_airport.id,
      destination_airport_id: tripToStore.return.arrival_airport.id,
      segments: [
        {
          flight_id: tripToStore.outbound.id,
          flight_date: formatDate(searchData.departDate),
          segment_order: 1,
          segment_type: 'outbound',
          price: parseFloat(tripToStore.outbound.price),
        },
        {
          flight_id: tripToStore.return.id,
          flight_date: formatDate(searchData.returnDate),
          segment_order: 2,
          segment_type: 'return',
          price: parseFloat(tripToStore.return.price),
        }
      ]
    }
  } else {
    console.log('Creating one_way trip for flight:', trip.departure_airport);
    body = {
      trip_type: "one_way", 
      origin_airport_id: trip.departure_airport.id, 
      destination_airport_id: trip.arrival_airport.id, 
      segments: [
        {
          flight_id: trip.id, 
          flight_date: formatDate(searchData.departDate),
          segment_order: 1,
          segment_type: 'outbound',
          price: parseFloat(trip.price), 
        }
      ]
    }
  }
  
  try {
    console.log('Request body:', body); 
    const result = await createTrip(body);
    console.log('Trip created successfully:', result);
  } catch (error) {
    console.error('Error creating trip:', error);
  }
}
</script>