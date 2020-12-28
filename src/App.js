import React, { useState, useEffect, useCallback } from 'react';
import style from './App.module.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import AuthService from './services/AuthService';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = value => {
    setIsAuthenticated(value);
  }

  const isAuth = useCallback(() => {
    try {
      const fetchData = async() => {
        await AuthService.isVerified() === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      }
      fetchData();
    } catch (exception) {
      console.error(exception.message);
    }
  }, []);

  useEffect(() => isAuth(), [isAuth]);

  return (
    <div className = { style.app }>
      <Router>
        <Switch>
          <Route exact path = '/register' render = { props => !isAuthenticated ? <Register { ...props } setAuth = { setAuth }/> : <Redirect to = '/'/> }/>
          <Route exact path = '/login' render = { props => !isAuthenticated ? <Login { ...props } setAuth = { setAuth }/> : <Redirect to = '/'/> }/>
          <Route exact path = '/' render = { props => isAuthenticated ? <Dashboard { ...props } setAuth = { setAuth }/> : <Redirect to = '/login'/> }/>
        </Switch>
      </Router>
    </div>
  );
}
