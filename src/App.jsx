import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import TopBar from "./components/common/TopBar";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Portfolio from "./pages/Portfolio";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ExhibitionCalendar from "./pages/ExhibitionCalendar";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  // Handle extension messaging to prevent "listener indicated async response" error
  useEffect(() => {
    const handleMessage = (request, sender, sendResponse) => {
      // Send response immediately without waiting for async operation
      sendResponse({ received: true });
      // Don't return true - handle the response synchronously
      return undefined;
    };

    // Wrap console.error to suppress the specific error
    const originalError = console.error;
    const errorFilter = (...args) => {
      const message = String(args[0] || '');
      // Suppress only the extension messaging error
      if (message.includes('listener indicated an asynchronous response') || 
          message.includes('message channel closed')) {
        return;
      }
      originalError.apply(console, args);
    };
    console.error = errorFilter;

    // Add listener if chrome.runtime is available
    try {
      if (typeof window !== 'undefined' && 
          typeof window.chrome !== 'undefined' && 
          window.chrome.runtime && 
          window.chrome.runtime.onMessage) {
        window.chrome.runtime.onMessage.addListener(handleMessage);
      }
    } catch (error) {
      // Extension APIs not available
    }

    return () => {
      console.error = originalError;
      try {
        if (typeof window !== 'undefined' && 
            typeof window.chrome !== 'undefined' && 
            window.chrome.runtime && 
            window.chrome.runtime.onMessage) {
          window.chrome.runtime.onMessage.removeListener(handleMessage);
        }
      } catch (error) {
        // Cleanup error, ignore
      }
    };
  }, []);

  return (
    <>
      {!isAdminPage && <TopBar />}
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/exhibition" element={<ExhibitionCalendar />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
