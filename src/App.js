import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from "./authentication/PrivateRoute";
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import Login from "./authentication/Login"
import axios from "axios";
import PostUpdate from "./components/PostUpdate";
import SignUpPage from "./components/SignUpPage";
import PostDetails from "./components/PostDetails";
function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem("token"),
            },
        };
        axios
            .get("http://localhost:8080/isLoggedIn",config)
            .then((response) => {
                console.log(response.status)
                if(response.status===200) {
                    setIsAuthenticated(true);
                }
                else{
                    setIsAuthenticated(false);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

  return (
      <Router>
            <div className="App">
              <Switch>
                  <Route exact path='/' render={(props) => <Login {...props} handleLogin={handleLogin} />} />
                  <ProtectedRoute path='/homepage' component={Home} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                  <ProtectedRoute path='/userPage' component={UserPage} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                  <ProtectedRoute path="/announcement/:id/edit" component={PostUpdate} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                  <Route exact path='/signUpPage' component={SignUpPage} />
                  <ProtectedRoute path="/announcement/:id/view" component={PostDetails} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
              </Switch>
            </div>
      </Router>
  );
}

export default App;
