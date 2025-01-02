import { AuthState } from './types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			refresh_token: null,
			isAuthenticated: false,
			login: (user, token, refresh_token) =>
				set({ user, token, refresh_token, isAuthenticated: true }),
			logout: () => set({ user: null, token: null, isAuthenticated: false })
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => sessionStorage)
		}
	)
)
