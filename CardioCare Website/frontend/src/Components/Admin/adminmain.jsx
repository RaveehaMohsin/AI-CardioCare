import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar1 from '../Navbar/navbar';
import Personadd from '../Patient/Person Add/personadd';
import Dashboardadmin from '../SideDashboard/dashboardadmin';
import PatientViewAdmin from './PatientView/patientview';
import PatientView from '../Patient/Patient View/patientview';
import SystemReviews from './Reviews/systemreview';
import AdminProfileView from './Profile/profileviewadmin';
import dashboard from './Dashboard/dashboard';


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
          <Route exact path="/admin/dashboard" component={dashboard} />
           <Route exact path="/admin/profileadd" component={Personadd} />
           <Route exact path="/admin/profileview" component={AdminProfileView} />
           <Route exact path="/admin/patientview" component={PatientViewAdmin} />
           <Route exact path="/admin/patientsview/patientpersonprofile/:userId" component={PatientView} />
           <Route exact path="/admin/reviews" component={SystemReviews} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
