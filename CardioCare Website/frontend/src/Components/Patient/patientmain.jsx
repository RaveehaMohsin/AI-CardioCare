import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar1 from '../Navbar/navbar';
import Dashboard from '../SideDashboard/dashboardpatient';
import Personadd from './Person Add/personadd';
import PatientView from './Patient View/patientview';
import Chatbot from './Chatbot/chatbot';
import PredictDiseasePage from './Predict Heart Disease/pagepredict';


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
           <Route exact path="/patientprofile/patientview" component={PatientView} />
           <Route exact path="/patient/heartdisease" component={PredictDiseasePage} />
           <Route exact path="/patient/chatbot" component={Chatbot} />
           
          </Switch>
        </div>
      </div>
    </div>
  );
}
