import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ChatBot from "./ChatBot";

// Import your components

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="*" Component={Home}></Route>
        <Route path="/chat" Component={ChatBot}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;