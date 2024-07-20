import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Odeme from "./odeme/Odeme.jsx";
import AdminPanel from "./adminpanel/AdminPanel.jsx";

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Hoş geldiniz! Ana Sayfa İçeriği</h1>
            <button onClick={() => navigate('/odeme')}>Ödeme Sayfasına Git</button>
            <button onClick={() => navigate('/adminpanel')}>Admin Paneline Git</button>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/odeme" element={<Odeme />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
        </Routes>
    );
}

export default App;
