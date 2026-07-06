import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

async function start() {
    if (import.meta.env.DEV) {
        try {
            const { worker } = await import("./api/browser")
            await worker.start()
        } catch (e) {
            console.warn("[MSW] Failed to start mock service worker, continuing without mocks:", e)
        }
    }

    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
      </StrictMode>,
    )
}

start()
