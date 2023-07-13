import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalState from './context/global/GlobalState';
import AuthProvider from './context/auth/AuthProvider';
import WebSocketProvider from './context/webSocket/WebSocketProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Router>
        <GlobalState>
          <AuthProvider>
            <WebSocketProvider>
              <App />   
            </WebSocketProvider>
          </AuthProvider>
        </GlobalState>
     </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
