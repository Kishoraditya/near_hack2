import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Wallet from './components/Wallet';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import CreateProfile from './pages/CreateProfile';
import SignUp from './pages/SignUp';
import './styles/stylesheet.css'; // You can import your global styles here

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Wallet />
        <Switch>
          <Route path="/" exact component={Jobs} />
          <Route path="/job/:id" component={JobDetails} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/create-profile" component={CreateProfile} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
