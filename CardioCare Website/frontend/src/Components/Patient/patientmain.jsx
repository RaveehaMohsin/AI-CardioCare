import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar1 from '../Navbar/navbar';
import Dashboard from '../SideDashboard/dashboardpatient';
import Personadd from './Person Add/personadd';


export default function PatientMain() {
  const userData = JSON.parse(localStorage.getItem('AI-CardioCareUsers'));
  const userRole = userData?.user?.role;

  if (!userData || userRole !== 'Patient') {
    return <Redirect to="/page-not-found" />;
  }

  return (
    <div>
      <div className="navbar">
        <Navbar1 />
      </div>
      <div style={{ display: 'flex' }}>
        <Dashboard />
        <div className="main-content">
          <Switch>
           <Route exact path="/patientprofile/patientadd" component={Personadd} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
