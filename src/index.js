import React from 'react';
import ReactDOM from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </LocalizationProvider>
);
