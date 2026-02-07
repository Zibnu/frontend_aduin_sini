import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster
        position='top-center'
        toastOptions={{
          duration : 1000,
          style : {
            background : 'rgba(255,255,255, 0.8)',
            backdropFilter : "blur(10px)",
            borderRadius : "12px",
            fontSize : "14px",
            color : "#333"
          }
        }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
