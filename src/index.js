import React from 'react';
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormPage from './Components/FormPage';
import Landing from './Components/Landing';
import Map from './Components/Map';
import App from './App';
import reportWebVitals from './reportWebVitals';

let root = createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route index element={<Landing/>}/>
        <Route path="new-activity" element={<FormPage />}/>
        <Route path="map" element={<Map />}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

