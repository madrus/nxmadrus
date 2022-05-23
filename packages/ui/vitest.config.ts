import { mergeConfig } from 'vite'
import baseConfig from '../../vitest.config'

export default mergeConfig(baseConfig, {
  test: {
    ...baseConfig.test,
    setupFiles: 'src/setupTests.ts',
  },
})
