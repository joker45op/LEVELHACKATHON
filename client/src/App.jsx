// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AstrologyForm from "./components/AstrologyForm";
import AstrologyData from "./components/AstrologyData";
import Home from "./components/Home";
import AppProvider from "./context/AppContext"; // Import the provider

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App min-h-screen flex items-center justify-center">
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<AstrologyForm />} />
              <Route path="/data" element={<AstrologyData />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
