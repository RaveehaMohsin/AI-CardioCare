import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar1 from '../Navbar/navbar';
import Personadd from '../Patient/Person Add/personadd';
import Dashboardadmin from '../SideDashboard/dashboardadmin';


export default function AdminMain() {
  const userData = JSON.parse(localStorage.getItem('AI-CardioCareUsers'));
  const userRole = userData?.user?.role;

  if (!userData || userRole !== 'Admin') {
    return <Redirect to="/page-not-found" />;
  }

  return (
    <div>
      <div className="navbar">
        <Navbar1 />
      </div>
      <div style={{ display: 'flex' }}>
        <Dashboardadmin />
        <div className="main-content">
          <Switch>
           <Route exact path="/admin/profileadd" component={Personadd} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
