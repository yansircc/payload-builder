interface FieldConfig {
  label: string
  placeholder: string
}

export interface FAQFieldConfigs {
  [key: string]: FieldConfig
}

export const fieldConfigs: FAQFieldConfigs = {
  question: {
    label: 'Question',
    placeholder: 'Enter your question...',
  },
  answer: {
    label: 'Answer',
    placeholder: 'Enter your detailed answer...',
  },
  title: {
    label: 'Title',
    placeholder: 'Enter section title...',
  },
  subtitle: {
    label: 'Subtitle',
    placeholder: 'Enter section subtitle...',
  },
}
