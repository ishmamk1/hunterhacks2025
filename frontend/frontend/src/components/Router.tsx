import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ChatBot from "./ChatBot";
import About from "./About";

// Import your components

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="*" Component={Home}></Route>
        <Route path="/chat" Component={ChatBot}></Route>
        <Route path="/about" Component={About}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
