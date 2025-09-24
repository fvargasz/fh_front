<script setup lang="ts">

</script>

<template>
  <div class="bg-[url('/landingImg.jpg')] bg-cover bg-center bg-no-repeat min-h-screen">
    <BaseHeader/>
    <main class="flex-1 flex items-center justify-center px-4 py-12">
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
              <!-- <GlobeIcon class="h-5 w-5 text-cloud-white" /> -->
              <span class="text-cloud-white font-medium">Worldwide Coverage</span>
            </div>
            <div class="flex items-center space-x-2 bg-cloud-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <!-- <ClockIcon class="h-5 w-5 text-cloud-white" /> -->
              <span class="text-cloud-white font-medium">Timezone Smart</span>
            </div>
            <div class="flex items-center space-x-2 bg-cloud-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <!-- <PlaneIcon class="h-5 w-5 text-cloud-white" /> -->
              <span class="text-cloud-white font-medium">Best Prices</span>
            </div>
          </div>

          <div class="pt-8">
            <FlightSearchCard />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>