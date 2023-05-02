import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from "./authentication/PrivateRoute";
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import Login from "./authentication/Login"
function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

  return (
      <Router>
            <div className="App">
              <Switch>
                  <Route exact path='/' render={(props) => <Login {...props} handleLogin={handleLogin} />} />
                  <ProtectedRoute path='/homepage' component={Home} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                  <ProtectedRoute path='/userPage' component={UserPage} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
              </Switch>
            </div>
      </Router>
  );
}

export default App;
