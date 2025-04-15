import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  notificationsEnabled: boolean;
  preferredBlock: string | null;
  darkMode: boolean;
  autoRefresh: boolean;
  refreshInterval: number; // in seconds
}

interface SettingsStore extends SettingsState {
  toggleNotifications: () => void;
  setPreferredBlock: (blockId: string | null) => void;
  toggleDarkMode: () => void;
  toggleAutoRefresh: () => void;
  setRefreshInterval: (seconds: number) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      notificationsEnabled: true,
      preferredBlock: null,
      darkMode: false,
      autoRefresh: true,
      refreshInterval: 30,
      
      toggleNotifications: () => set(state => ({ 
        notificationsEnabled: !state.notificationsEnabled 
      })),
      
      setPreferredBlock: (blockId) => set({ 
        preferredBlock: blockId 
      }),
      
      toggleDarkMode: () => set(state => ({ 
        darkMode: !state.darkMode 
      })),
      
      toggleAutoRefresh: () => set(state => ({ 
        autoRefresh: !state.autoRefresh 
      })),
      
      setRefreshInterval: (seconds) => set({ 
        refreshInterval: seconds 
      }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);