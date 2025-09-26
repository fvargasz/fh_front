

<template>
    <div class="relative inline-block">
    <!-- Dropdown Trigger Button -->
    <button
      @click="toggleDropdown"
      @blur="handleBlur"
      class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Sign In
      <slot name="chevron">
        <!-- Default chevron if no slot provided -->
        <span class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-180': isOpen }">▼</span>
      </slot>
    </button>

    <!-- Dropdown Content -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-sm border border-gray-200/20 rounded-md shadow-lg z-50"
        @click.stop
      >
        <!-- Tabs Container -->
        <div class="w-full">
          <!-- Tab List -->
          <div class="grid grid-cols-2 rounded-t-md rounded-b-none bg-gray-100/50">
            <button
              @click="onSwitchTab('login');"
              :class="[
                'flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-tl-md transition-colors duration-200',
                activeTab === 'login'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              <slot name="login-icon">
                <!-- Default user icon if no slot provided -->
                <Icon name="material-symbols:person" class="h-6 w-6"/>
              </slot>
              Login
            </button>
            <button
              @click="onSwitchTab('register')"
              :class="[
                'flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-tr-md transition-colors duration-200',
                activeTab === 'register'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              <slot name="register-icon">
                <!-- Default user plus icon if no slot provided -->
                <Icon name="material-symbols:add-2" class="h-6 w-6"/>
              </slot>
              Register
            </button>
          </div>
          <div v-if="errorMessage" class="bg-red-200 rounded-md mt-2 mx-4 py-2 justify-center">
            <p class="text-black text-center text-sm px-4">
                {{ errorMessage }}
            </p>
          </div>
          <!-- Login Tab Content -->
          <div v-if="activeTab === 'login'" class="p-4 space-y-4">
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                v-model="loginForm.email"
                type="email"
                placeholder="Enter your email"
                class="text-black w-full px-3 py-2 bg-gray-50/50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                v-model="loginForm.password"
                type="password"
                placeholder="Enter your password"
                class="text-black w-full px-3 py-2 bg-gray-50/50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              @click="handleLogin"
              class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>

          <!-- Register Tab Content -->
          <div v-if="activeTab === 'register'" class="p-4 space-y-4">
            <div class="space-y-2">
              <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                v-model="registerForm.name"
                type="text"
                placeholder="Enter your full name"
                class="w-full px-3 py-2 bg-gray-50/50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="space-y-2">
              <label for="register-email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="register-email"
                v-model="registerForm.email"
                type="email"
                placeholder="Enter your email"
                class="text-black w-full px-3 py-2 bg-gray-50/50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="space-y-2">
              <label for="register-password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="register-password"
                v-model="registerForm.password"
                type="password"
                placeholder="Create a password"
                class="text-black w-full px-3 py-2 bg-gray-50/50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="space-y-2">
              <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirm-password"
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="Confirm your password"
                class="text-black w-full px-3 py-2 bg-gray-50/50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              @click="handleRegister"
              class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'


const { user, isLoggedIn, login, logout, register } = useAuth();

// Reactive state
const isOpen = ref(false)
const activeTab = ref('login')
const errorMessage = ref('');

const loginForm = reactive({
  email: '',
  password: ''
})

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Methods
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleBlur = (event) => {
  // Close dropdown when clicking outside
  setTimeout(() => {
    if (!event.relatedTarget || !event.relatedTarget.closest('.relative')) {
      isOpen.value = false
    }
  }, 100)
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleLogin = async () => {
    try {
        const body = {
            email: loginForm.email,
            password: loginForm.password
        };
        const result = await login(body);
        
        closeDropdown()
    } catch (error) {
        errorMessage.value = error.response.data.error || 'Login failed. Please try again.'
    }
}

const handleRegister = async () => {
  if (registerForm.password !== registerForm.confirmPassword) {
    errorMessage.value = 'Passwords do not match!';
    return
  }
  try {
    const body = {
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password
    };

    await register(body);
    
    closeDropdown()
  } catch (error) {
    errorMessage.value = error.response.data.error || 'Register failed. Please try again.'
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isOpen.value = false
  }
}

const onSwitchTab = (tab) => {
  activeTab.value = tab;
  errorMessage.value = ''; // Clear error message when switching tabs
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>