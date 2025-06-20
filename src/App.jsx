import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import TestAPI from './components/TestAPI';
import Header from './components/Header';
import Footer from './components/Footer';
import { CompanyProvider } from './contexts/CompanyContext';
import './styles/App.css';

function App() {
  return (
    <CompanyProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/test-api" element={<TestAPI />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CompanyProvider>
  );
}

export default App;