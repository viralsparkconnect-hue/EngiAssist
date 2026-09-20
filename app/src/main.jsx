import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted fonts (no request to Google Fonts): Bricolage Grotesque for headings, Geist for text.
import '@fontsource-variable/bricolage-grotesque/wght.css'
import '@fontsource-variable/geist/index.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
