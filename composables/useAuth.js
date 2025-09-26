import axios from "axios";

export const useAuth = () => {
  // Authentication logic here

  const user = useState('auth.user', () => null)
  const isLoggedIn = computed(() => !!user.value)
  const isInitialized = useState('auth.initialized', () => false)

  const initializeAuth = async () => {
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
        
        } catch (error) {
            token.value = null
            user.value = null
            delete axios.defaults.headers.common['Authorization']
        }

    }
    isInitialized.value = true
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
  }

  const register = async (userInfo) => {
        try {
            const config = useRuntimeConfig()
        // Your registration API call
        const { data } = await axios.post(config.public.API_BASE_URL+ "/users/register", userInfo);
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

  return {
    user: readonly(user),
    isLoggedIn,
    isInitialized,
    initializeAuth,
    login,
    logout,
    register
  }
}