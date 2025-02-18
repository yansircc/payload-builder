import { create } from 'zustand'

interface CTAGenerationState {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useCTAGenerationStore = create<CTAGenerationState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}))
