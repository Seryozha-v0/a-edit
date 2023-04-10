import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor/" element={<Editor />} />
                <Route path="/editting/:id" element={<Editor />} />
            </Routes>
        </ >
    );
}

export default App;
