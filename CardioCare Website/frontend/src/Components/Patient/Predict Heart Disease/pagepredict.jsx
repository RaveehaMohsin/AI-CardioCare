// PredictDiseasePage.js
import React, { useState } from 'react';
import Upperheader from '../../UpperHeader/upperheader';
import PredictDisease from './predictheartdisease';
import AddDisease from './modal';

export default function PredictDiseasePage() {
  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const currentuser = userData.user;
  const username = currentuser.firstName + " " + currentuser.lastName;

  const [isAddingdisease, setIsAddingDisease] = useState(false);

  const handleInterestClick = () => {
    setIsAddingDisease(true);
  };

  const handleCloseDialog = () => {
    setIsAddingDisease(false);
  };

  return (
    <div>
      <Upperheader title="Predict Heart Disease" name={username} />
      <PredictDisease setisbtnclick={handleInterestClick} />
      {isAddingdisease && (
        <AddDisease
          isOpen={isAddingdisease}
          onCancel={handleCloseDialog}
        />
      )}
    </div>
  );
}
