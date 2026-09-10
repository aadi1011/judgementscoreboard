import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import HowToPlay from "./HowToPlay";
import Setup from "./Setup";
import Game from "./Game";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/howto" element={<HowToPlay />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

