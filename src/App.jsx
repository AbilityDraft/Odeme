import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css'
import Odeme from "./odeme/Odeme.jsx";
import AdminPanel from "./adminpanel/AdminPanel.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/odeme" element={<Odeme />} />
                <Route path="/adminpanel" element={<AdminPanel />} />
                <Route path="/" element={<div>Hoş geldiniz! Ana Sayfa İçeriği</div>} />
            </Routes>
        </Router>
    );
}

export default App
