import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Pos from "./pages/pos";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor/" element={<Editor />} />
                <Route path="/editting/:id" element={<Editor />} />
                <Route path="/pos" element={<Pos />} />
            </Routes>
        </ >
    );
}

export default App;
