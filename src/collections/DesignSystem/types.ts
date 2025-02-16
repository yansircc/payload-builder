import { Payload } from 'payload'

export interface DesignSystemTheme {
  label: string
  colors: {
    primary: string
    secondary: string
    background: string
    foreground: string
    muted: string
    accent: string
  }
  typography: {
    fontFamily: string
    headingFamily: string
  }
  radius: {
    small: string
    medium: string
    large: string
  }
  spacing: {
    container: string
    section: string
  }
}

export interface DesignSystemBeforeChangeData {
  id?: string
  tenant: string
  isActive: boolean
}

export interface DesignSystemBeforeChangeContext {
  data: DesignSystemBeforeChangeData
  req: {
    payload: Payload
  }
}
