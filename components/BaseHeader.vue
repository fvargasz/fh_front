
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
        <!-- <NuxtLink
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
        </NuxtLink> -->

        <!-- Button -->
        <LoginMenu v-if="!isLoggedIn" @login="handleLogin" @register="handleRegister"/>
        <div v-else class="flex items-center space-x-4">
          <span class="hover:opacity-90 transition-colors">Hello, {{ user.name }}</span>
          <Button @click="useAuth().logout" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>

const { user, isLoggedIn } = useAuth();

const handleLogin = (formData) => {
  console.log('Login data:', formData)
  // Your login logic here
}

const handleRegister = (formData) => {
  console.log('Register data:', formData)
  // Your register logic here
}

</script>
