import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";

// Import your components

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;