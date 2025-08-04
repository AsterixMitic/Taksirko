import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import VoznjeZaDatum from './pages/DayOverviewPage.tsx';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/voznje/:datum" element={<VoznjeZaDatum />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
