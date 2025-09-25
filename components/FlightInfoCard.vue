<script setup lang="ts">
import type { Flight } from '../types/flight';

defineProps<{
    flight: Flight,
    tripType: string
}>()

const duration = (flight: Flight): string => {
  const [startH, startM] = flight.departure_time.split(":").map(Number);
  const [endH, endM] = flight.arrival_time.split(":").map(Number);

  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  // Handle flights that cross midnight
  let diffMinutes = endMinutes - startMinutes;
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60; // add 24 hours
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours}h ${minutes}m`;
};

</script>

<template>
    <div class="mt-4 p-4 
    bg-[linear-gradient(145deg,hsl(0_0%_100%/.9),hsl(0_0%_100%/.7))]
    w-full
    rounded-md
    flex
    flex-row">
        <!-- Left size of the card -->
        <div class="flex-1 items-center space-x-4">
            <div class="flex flex-row space-x-3 py-2 items-center">
                <div class="bg-blue-600 rounded-full aspect-square w-8 h-8 flex items-center justify-center">
                    <h1 class="text-white text-center text-sm font-semibold">{{ flight.airline }}</h1>
                </div>
                <div class="items-center">
                    <p class="font-semibold ">{{flight.name}}</p>
                    <p class="text-gray-500">Flight {{ flight.airline }} {{ flight.number }}</p>
                </div>
            </div>
            <div class="flex items-center flex-row space-x-4">
                <div class="flex flex-col items-center">
                    <p class="text-2xl font-bold text-foreground">{{ flight.departure_time }}</p>
                    <p class="text-sm text-muted-foreground">{{flight.departure_airport}}</p>
                </div>
                <div class="flex-1 relative">
                    <div class="border-t-2 border-dashed border-sky-primary/30 relative">
                        <Icon name="stash:airplane" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-sky-primary rotate-90" />
                    </div>
                    <p class="text-center text-xs text-muted-foreground mt-1">{{duration(flight)}}</p>
                </div>
                <div class="flex flex-col items-center">
                    <p class="text-2xl font-bold text-foreground">{{ flight.arrival_time }}</p>
                    <p class="text-sm text-muted-foreground">{{flight.arrival_airport}}</p>
                </div>
            </div>
            <div class="flex items-center space-x-4 mt-3 text-xs text-muted-foreground">
                <div class="flex items-center space-x-1">
                    <Icon name="material-symbols:alarm-outline-rounded" class="h-3 w-3" />
                    <span>Dep: {{flight.departure_time}}, ({{flight.departure_airport}})</span>
                </div>
                <div class="flex items-center space-x-1">
                    <Icon name="material-symbols:alarm-outline-rounded" class="h-3 w-3" />
                    <span>Arr: {{flight.arrival_time}}, ({{flight.arrival_airport}})</span>
                </div>
            </div>
        </div>

        <!-- Right side of the card -->
        <div class="flex flex-col text-right ml-6 justify-center">
            <div class="mb-4">
                <p class="text-3xl font-bold text-sky-primary">{{flight.price}}</p>
                <p class="text-sm text-muted-foreground">per person</p>
            </div>
            <Button class=" px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center
                bg-gradient-to-r from-sky-500 to-indigo-600
                hover:from-sky-600 hover:to-indigo-700
                transition-colors duration-300" size="lg">
                Select Flight
            </Button>
        </div>
    </div>
</template>