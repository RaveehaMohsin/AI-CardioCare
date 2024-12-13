import React from 'react'
import Upperheader from "../../UpperHeader/upperheader";

export default function Predictheartdisease() {
    const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
    const currentuser = userData.user;
    const username = currentuser.firstName + " " + currentuser.lastName;
  return (
    <div>
      <Upperheader title="Predict Heart Disease" name={username} />
    </div>
  )
}
