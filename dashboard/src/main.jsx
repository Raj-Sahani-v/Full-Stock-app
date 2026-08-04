import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ContextVariable } from './components/ContextVariable.jsx'
import { Protected } from './components/Protected.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
  <ContextVariable>
        <Routes>
      <Route path='/*' element={ 
        <Protected>
          <App/>
</Protected>
      } />
    </Routes>
  </ContextVariable>
    </BrowserRouter>
  // {/* </StrictMode>, */}
)
