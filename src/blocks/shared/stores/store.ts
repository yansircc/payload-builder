import { create } from 'zustand'

interface GenerationState {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useGenerationStore = create<GenerationState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}))
