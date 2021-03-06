import App from './App'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root') as HTMLElement)

/** Strict mode should not be used with React Router v6 */
root.render(<App />)
