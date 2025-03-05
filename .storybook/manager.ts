import { addons } from '@storybook/manager-api'
import { themes } from '@storybook/theming'

// Configure Storybook UI theme
addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'Payload Design System',
    brandUrl: '/',
    brandTarget: '_self',
  },
})
