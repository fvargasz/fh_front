 <script setup lang="ts">
import { ref } from 'vue'
import type { Flight } from '~/types/flight';

  const flights : [Flight] = [
    {
      airline: "AC",
      number: 301,
      name: "Air Canada",
      departure_airport: "YUL",
      departure_time: "07:35",
      arrival_airport: "YVR",
      arrival_time: "10:05",
      price: 273.23
    }
  ];

// tabs
const tripType = ref<'one-way' | 'round-trip'>('round-trip')

const tripItems = [
  { label: 'Round Trip', value: 'round-trip' },
  { label: 'One Way', value: 'one-way' }
]

const getTripType = (): string =>
  tripItems.find(trip => trip.value === tripType.value)?.label || ""

const searchData = ref({
  from: '',
  to: '',
  departDate: '',
  returnDate: '',
  passengers: 1
})

// methods
async function handleSearch()  {
  console.log('Searching flights with:', {
    tripType: tripType.value,
    ...searchData.value
  })
}


</script>

<template>
  <div class="w-full max-w-6xl mx-auto space-y-8">
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
            @click="tripType = tab.value"
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
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-primary"
                />
                <Input
                    id="from"
                    placeholder="City or airport"
                    v-model="searchData.from"
                    class="w-full pl-10 pr-3 py-2 rounded border border-sky-primary/30 text-sm placeholder:text-sky-primary/50 focus:outline-none focus:ring-2 focus:ring-sky-primary/20 focus:border-sky-primary"
                />
            </div>
          </div>

          <!-- To -->
          <div class="space-y-2">
            <Label for="to" class="text-sm font-medium text-foreground">To</Label>
            <div class="relative">
                <Icon
                    name="ic:outline-flight-land"
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-primary"
                />
                <Input
                    id="to"
                    placeholder="City or airport"
                    v-model="searchData.to"
                    class="w-full pl-10 pr-3 py-2 rounded border border-sky-primary/30 text-sm placeholder:text-sky-primary/50 focus:outline-none focus:ring-2 focus:ring-sky-primary/20 focus:border-sky-primary"
                />
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
                    class="w-full pl-10 pr-3 py-2 rounded border border-sky-primary/30 text-sm placeholder:text-sky-primary/50 focus:outline-none focus:ring-2 focus:ring-sky-primary/20 focus:border-sky-primary"
                />
            </div>
          </div>

            <!-- Return Date (only round trip) -->
            <div v-if="tripType === 'round-trip'" class="space-y-2">
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
                        class="w-full pl-10 pr-3 py-2 rounded border border-sky-primary/30 text-sm placeholder:text-sky-primary/50 focus:outline-none focus:ring-2 focus:ring-sky-primary/20 focus:border-sky-primary"
                    />
                </div>
            </div>

          <!-- Passengers (if one-way, occupies last col) -->
            <div v-if="tripType === 'one-way'" class="space-y-2">
                <Label for="passengers" class="text-sm font-medium text-gray-600">Passengers</Label>
                <div class="relative">
                <input
                    id="passengers"
                    type="number"
                    min="1"
                    max="9"
                    v-model.number="searchData.passengers"
                    class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/20 focus:outline-none focus:bg-white"
                />
                </div>
            </div>
        </div>

        <!-- Passengers for round trip -->
        <div v-if="tripType === 'round-trip'" class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="space-y-2">
            <Label for="passengers-rt" class="text-sm font-medium text-foreground">Passengers</Label>
            <input
                id="passengers"
                type="number"
                min="1"
                max="9"
                v-model.number="searchData.passengers"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/20 focus:outline-none focus:bg-white"
            />
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

  

  <div v-if="flights && flights.length > 0" class="p-4 mt-4
    bg-white/60
    backdrop-blur-sm rounded-md
    pr-8">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-foreground">{{ flights.length }} flight found</h2>
      <p>{{getTripType()}}</p>
    </div>
    <div v-for="flight in flights" class="flex flex-col">
      <FlightInfoCard :flight="flight" :trip-type="tripType"/>
    </div>
  </div>
</template>
