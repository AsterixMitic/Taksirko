import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './global.css'
import App from './App.tsx'
import 'bootswatch/dist/quartz/bootstrap.min.css';

import 'leaflet/dist/leaflet.css';
import './components/map/fix/fixLeafletIcons.ts'

import DayOverviewPage from './pages/DayOverviewPage.tsx';
import VoznjaOverviewPage from "./pages/VoznjaOverviewPage.tsx";
import NovaVoznjaPage from "./pages/NovaVoznjaPage.tsx";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/dispecer/day/:datum" element={<DayOverviewPage />} />
                <Route path="/dispecer/voznja/:voznja_id" element={<VoznjaOverviewPage />} />
                <Route path="/dispecer/nova_voznja" element={<NovaVoznjaPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
