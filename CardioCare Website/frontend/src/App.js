import './App.css';
import './App.css';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; 
// import auth from './Components/auth/auth';
import KeyboardScroll from './Components/keyboardscroll'; 
// import PageNotFound from './Components/PageNotFound/Pagenotfound';

// import LandingPage from './Components/LandingPage/LandingPage';


function App() {
  return (
    <div className="App">
      <KeyboardScroll />
      <Switch>
        {/* Redirect to /landing when the base URL is accessed */}
        {/* <Route exact path="/">
          <Redirect to="/careerpathnavigator" />
        </Route> */}


       {/* Landing Route */}
        {/* <Route exact path="/careerpathnavigator"  component={LandingPage} /> */}


        {/* Auth Route */}
        {/* <Route exact path="/auth" component={auth} /> */}

        {/* Student Role Routes */}
        {/* <Route exact path="/student/dashboard" component={StudentMain} /> */}
       

  




        {/* Admin Route */}
        {/* <Route exact path="/admin/dashboard" component={AdminMain} /> */}

        
       
        {/* Default */}
        {/* Catch-All Route for Undefined Paths */}
        {/* <Route component={PageNotFound} /> */}
      </Switch>

    </div>
  );
}

export default App;
