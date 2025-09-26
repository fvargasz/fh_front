import axios from "axios";

export const useAuth = () => {
  // Authentication logic here

  const user = useState('auth.user', () => null)
  const isLoggedIn = computed(() => !!user.value)
  const isInitialized = useState('auth.initialized', () => false)
  const loading = useState('auth.loading', () => false)
  const hasConnectionError = useState('auth.connectionError', () => false)

  const initializeAuth = async () => {
    loading.value = true

    if (isInitialized.value) return;
    const config = useRuntimeConfig();

    const token = useCookie('auth-token');
    if (token.value) {
        try {
            
            const response = await axios.post(config.public.API_BASE_URL+ "/users/getActiveUser", {},
               { 
                headers: {
                    'Authorization': `Bearer ${token.value}`,
                    'Content-Type': 'application/json'
                }});

            user.value = response.data.user;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
            loading.value = false;
            hasConnectionError.value = false;
        
        } catch (error) {
            hasConnectionError.value = true;
            console.log('hasConnectionError set to:', hasConnectionError);
            token.value = null
            user.value = null
            delete axios.defaults.headers.common['Authorization']
            loading.value = false;
            throw error;
        }

    }
    isInitialized.value = true
    loading.value = false;
  }

  const login = async (credentials) => {
    try {
        const config = useRuntimeConfig();
      const { data } = await axios.post(config.public.API_BASE_URL + "/users/login", credentials);
      user.value = data.user;

      if (data.token) {
        const token = useCookie('auth-token', {
          secure: true,
          sameSite: 'strict'
        })
        token.value = data.token
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      }
      
      return data

    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    user.value = null
    delete axios.defaults.headers.common['Authorization']
    const token = useCookie('auth-token')
    token.value = null
    window.location.reload()
  }

  const register = async (userInfo) => {
        try {
            const config = useRuntimeConfig()
        // Your registration API call
        const { data } = await axios.post(config.public.API_BASE_URL+ "/users/create", userInfo);
        user.value = data.user;

        if (data.token) {
            const token = useCookie('auth-token', {
            secure: true,
            sameSite: 'strict'
            })
            token.value = data.token
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        }
      
            return data
        } catch (error) {
        throw error
        }
    }

  const retryConnection = async () => {
    isInitialized.value = false;
    await initializeAuth();
  }

  return {
    user: readonly(user),
    isLoggedIn,
    isInitialized,
    loading,
    hasConnectionError,
    initializeAuth,
    login,
    logout,
    register,
    retryConnection
  }
}