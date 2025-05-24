import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SQLQuery from './components/SQLQuery';
import { clearTokens } from './utils/auth';  // Import the function to clear tokens
import AppNavbar from './components/AppNavbar';
import CreateTable from './components/CreateTable';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));

  const handleLogout = () => {
    clearTokens();  // Remove tokens from localStorage
    setIsAuthenticated(false);  // Update state
  };

  return (
    <Router>
        <AppNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} /> 
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/createtable" element={<CreateTable />} />
            <Route path="/sqlquery" element={<SQLQuery />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
