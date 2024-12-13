import './App.css';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; 
import KeyboardScroll from './Components/keyboardscroll'; 
import Auth from './Components/auth/auth';
import PageNotFound from './Components/PageNotFound/Pagenotfound';
import LandingPage from './Components/LandingPage/LandingPage';
import PatientMain from './Components/Patient/patientmain';
import AdminMain from './Components/Admin/adminmain';

function App() {
  return (
    <div className="App">
      <KeyboardScroll />
      <Switch>
        {/* Redirect to /landing when the base URL is accessed */}
        <Route exact path="/">
          <Redirect to="/cardiocare" />
        </Route>


       {/* Landing Route */}
        <Route exact path="/cardiocare"  component={LandingPage} />


        {/* Auth Route */}
        <Route exact path="/auth" component={Auth} />

        {/* Student Role Routes */}
        <Route exact path="/patientprofile/patientadd" component={PatientMain} />
        <Route exact path="/patientprofile/patientview" component={PatientMain} />
        <Route exact path="/patient/chatbot" component={PatientMain} />
        <Route exact path="/patient/heartdisease" component={PatientMain} />
       


        {/* Admin Route */}
        <Route exact path="/admin/profileadd" component={AdminMain} />

        
       
        {/* Default */}
        {/* Catch-All Route for Undefined Paths */}
        <Route component={PageNotFound} />
      </Switch>

    </div>
  );
}

export default App;
