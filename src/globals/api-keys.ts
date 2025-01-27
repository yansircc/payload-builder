import { GlobalConfig } from 'payload'

/**
 * API密钥配置
 */
export const ApiKey: GlobalConfig = {
  slug: 'api-key',
  fields: [
    {
      name: 'keys',
      type: 'array',
      fields: [
        {
          name: 'openai',
          label: 'OpenAI API Key',
          type: 'text',
          admin: {
            description: '⚠️ OpenAI API密钥将以加密形式存储',
            placeholder: 'sk-xxxxxxxxxxxxxxxx',
            autoComplete: 'off',
            style: {
              fontFamily: 'monospace',
            },
          },
        },
        {
          name: 'deepseek',
          label: 'DeepSeek API Key',
          type: 'text',
          admin: {
            description: '⚠️ DeepSeek API密钥将以加密形式存储',
            placeholder: 'sk-xxxxxxxxxxxxxxxx',
            autoComplete: 'off',
            style: {
              fontFamily: 'monospace',
            },
          },
        },
      ],
    },
  ],
}
