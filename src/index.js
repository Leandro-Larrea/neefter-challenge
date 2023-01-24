import  ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { ImageProvider } from "./context/imageContext.jsx";




const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <BrowserRouter>
        <ImageProvider>
            <App/>
        </ImageProvider>
    </BrowserRouter>
);