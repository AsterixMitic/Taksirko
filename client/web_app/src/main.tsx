import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import './index.css'
import App from './App.tsx'
import 'bootswatch/dist/quartz/bootstrap.min.css';

import DayOverviewPage from './pages/DayOverviewPage.tsx';
import VoznjaOverviewPage from "./pages/VoznjaOverviewPage.tsx";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/dispecer/day/:datum" element={<DayOverviewPage />} />
              <Route path="/dispecer/voznja/:voznja_id" element={<VoznjaOverviewPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
