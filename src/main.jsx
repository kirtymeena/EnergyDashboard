import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./sass/reset.scss"
import "./sass/common.scss"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'primereact/resources/primereact.css'; // core css
import "primereact/resources/themes/lara-light-cyan/theme.css";
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
