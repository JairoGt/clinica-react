import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import { useState } from 'react';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <Router>
//       <div className="container">
//         <Routes>
//           <Route path="/" element={
//             isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
//           } />
//           <Route path="/dashboard" element={
//             isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;