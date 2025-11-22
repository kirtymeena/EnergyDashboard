import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./sass/reset.scss"
import "./sass/common.scss"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'primereact/resources/primereact.css'; // core css
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "leaflet/dist/leaflet.css";
import { Provider } from "react-redux";
import store from "./store";
import { logout } from "./store/slices/authSlice";
import { attachInterceptors } from "./api/axios";


attachInterceptors({
  // if 401 occurs, dispatch logout to clear token and redirect if needed
  onUnauthorized: () => {
    store.dispatch(logout());
    // optionally redirect: window.location.href = "/login";
  }
});

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
)
