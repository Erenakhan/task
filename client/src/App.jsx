import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './Index';
import Register from './Register';
import Update from './Update';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="register" element={<Register />} />
        <Route path="update" element={<Update />} />
      </Routes>
    </Router>
  );
}
