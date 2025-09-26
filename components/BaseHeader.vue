<script setup>

const emit = defineEmits(['logUser']);

const handleLogin = (formData) => {
  console.log('Login data:', formData)
  // Your login logic here
}

const handleRegister = (formData) => {
  console.log('Register data:', formData)
  // Your register logic here
}

</script>

<template>
  <header class="w-full px-4 py-6">
    <nav class="flex items-center justify-between max-w-7xl mx-auto text-primary_white">
      <!-- Logo -->
      <div class="flex items-center space-x-2 ">
        <Icon name="ion:paper-airplane" class="h-8 w-8 text-primary_white" />
        <h1 class="text-2xl font-bold ">SkyJourney</h1>
      </div>

      <!-- Nav Links -->
      <div class="hidden md:flex items-center space-x-6">
        <NuxtLink
          to="#"
          class=" hover:opacity-90 transition-colors"
        >
          Flights
        </NuxtLink>
        <NuxtLink
          to="#"
          class=" hover:opacity-90 transition-colors"
        >
          Deals
        </NuxtLink>
        <NuxtLink
          to="#"
          class=" hover:opacity-90 transition-colors"
        >
          Help
        </NuxtLink>

        <!-- Button -->
        <LoginMenu  @login="handleLogin" @register="handleRegister"/>
      </div>
    </nav>
  </header>
</template>

