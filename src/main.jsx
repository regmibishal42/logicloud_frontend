import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import globalReducer from "./state/index.js";
import { ToastProvider } from "use-toast-mui";

// React Query
import { QueryClient, QueryClientProvider } from 'react-query'

const store = configureStore({
  reducer: {
    global: globalReducer,
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //other query settings
      refetchOnWindowFocus: false,
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Provider>
    </QueryClientProvider>

  </React.StrictMode>,
)
