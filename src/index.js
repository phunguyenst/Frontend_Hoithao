import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContext from './context/AuthContext';

const AuthProvider = ({ children }) => {
  const [authEmail, setAuthEmail] = useState(localStorage.getItem('authEmail') || null);
  
  useEffect(() => {
    localStorage.setItem('authEmail', authEmail);
  }, [authEmail]);
  return (
    console.log("authEmail: ", authEmail),
    <AuthContext.Provider value={{ authEmail, setAuthEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
