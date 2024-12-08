import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar1 from '../Navbar/navbar';
import Dashboard from '../SideDashboard/dashboardpatient';

import Studentadd from './Student Add/studentadd';


export default function PatientMain() {
  const userData = JSON.parse(localStorage.getItem('CareerPathNavigatorUsers'));
  const userRole = userData?.user?.role;

  if (!userData || userRole !== 'Student') {
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
           <Route exact path="/studentprofile/studentadd" component={Studentadd} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
