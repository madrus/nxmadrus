import * as ReactDom from 'react-dom/client'

import App from './App'
import '../dist/assets/main.css'
// import './index.css'

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement)

/** Strict mode should not be used with React Router v6 */
root.render(<App />)
