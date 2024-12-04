import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/index.css'
import App from '../src/components/App_ComponentRouter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
