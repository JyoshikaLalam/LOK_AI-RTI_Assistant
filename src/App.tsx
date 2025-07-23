import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { InfoCenter } from './pages/InfoCenter';
import { Tracker } from './pages/Tracker';
import { RTIProvider } from './context/RTIContext';

function App() {
  return (
    <RTIProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/info" element={<InfoCenter />} />
              <Route path="/tracker" element={<Tracker />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </RTIProvider>
  );
}

export default App;
