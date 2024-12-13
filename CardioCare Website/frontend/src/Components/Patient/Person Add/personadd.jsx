import React, { useEffect, useState } from "react";
import Upperheader from "../../UpperHeader/upperheader";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import "./personadd.css";

export default function Personadd() {
  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const currentuser = userData.user;
  const username = currentuser.firstName + " " + currentuser.lastName;

  const [city, setCity] = useState("");
  const [dob, setdob] = useState("");
  const [country, setcountry] = useState("");
  const [homeaddress, sethomeaddress] = useState("");
  const [gender, setgender] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [cnic, setcnic] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

   const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) { // Allows only alphabets and spaces
      setter(value);
    }
  };

  const handleAddressChange = (e) => {
    sethomeaddress(e.target.value);
  };


  useEffect(() => {
    const userId = currentuser.userId;

    // Fetch user details from the server
    fetch(`http://localhost:4000/getperson/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setCity(data.City || "");
          setdob(data.DOB ? formatDate(data.DOB) : "");
          setcountry(data.Country || "");
          sethomeaddress(data.Address || "");
          setgender(data.Gender || "");
          setphoneno(data.PhoneNo || "");
          setcnic(data.CNIC || "");
          // If the profile image exists, set the selected image
          if (data.Img) {
            setSelectedImage('http://localhost:4000'+ data.Img);  // Assuming the server returns the image URL
          }
        } else {
          // If no data is found, fields will remain empty
          console.log("No person data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  },[]);

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleClear = () => {
    setCity("");
    setdob("");
    setcountry("");
    sethomeaddress("");
    setgender("");
    setphoneno("");
    setcnic("");
    setSelectedImage(null);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Allow only digits, "+" at the start, and ensure it doesn't exceed a reasonable length
    if (/^\+?[0-9]{0,15}$/.test(value)) {
      setphoneno(value);
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("userId", currentuser.userId);
    formData.append("gender", gender);
    formData.append("phoneNo", phoneno);
    formData.append("cnic", cnic);
    formData.append("dob", dob);
    formData.append("address", homeaddress);
    formData.append("city", city);
    formData.append("country", country);
  
    // Check if selectedImage is a URL or a File
    if (selectedImage) {
      if (typeof selectedImage === "string") {
        try {
          const response = await fetch(selectedImage);
          const blob = await response.blob();
          const file = new File([blob], "profileImage.jpg", { type: blob.type });
          formData.append("profileImage", file);
          console.log("Converted URL to File and appended:", file);
        } catch (error) {
          console.error("Error fetching the image:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to process the image. Please try again.",
          });
          return; // Stop form submission
        }
      } else {
        formData.append("profileImage", selectedImage);
      }
    }
  
    // Submit the form data to the server
    fetch("http://localhost:4000/addperson", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: data.message,
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.error || "An unexpected error occurred.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred.",
        });
      });
  };
  

  return (
    <div>
      <Upperheader title="Add Personal Details" name={username} />
      {/* Student Add Form */}
      <div className="student-form">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-row">
            {/* Left Column - Profile Picture */}
            <div className="form-column profile-column">
              {selectedImage ? (
                <img
                src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="profile-image1"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <FaUserCircle
                  className="profile-icon"
                  style={{ fontSize: "150px" }}
                />
              )}
              <div className="image-buttons">
                <label style={{ color: "white" }} className="image-btn">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    name="profileImage"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                  />
                </label>
                <button
                  className="image-btn remove-btn"
                  type="button"
                  onClick={removeImage}
                  disabled={!selectedImage}
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Center Column - First Set of Fields */}
            <div className="form-column">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                readOnly
                value={currentuser.firstName}
              />

              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                required
                value={dob}
                onChange={(e) => setdob(e.target.value)}
              />

              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                required
                value={city}
                
                onChange={handleInputChange(setCity)}
              />

              <label>Country</label>
              <input
                type="text"
                className="form-control"
                name="country"
                required
                placeholder="USA"
                value={country}
                onChange={handleInputChange(setcountry)}
              />

              <label>Home Address</label>
              <input
                type="text"
                className="form-control"
                name="homeaddress"
                value={homeaddress}
                onChange={handleAddressChange}
                placeholder="Enter your home address"
                style={{
                  borderColor: homeaddress.length >= 7 ? "lightgrey" : "red",
                }}
              />
              {homeaddress.length < 7 && (
                <small className="text-danger">
                  Address must be at least 7 characters long.
                </small>
              )}
            </div>

            {/* Right Column - Second Set of Fields */}
            <div className="form-column">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                readOnly
                value={currentuser.lastName}
              />

              <label>Gender</label>
              <select
                className="form-control"
                name="gender"
                required
                value={gender}
                onChange={(e) => setgender(e.target.value)}
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <label>Email</label>
              <input
                type="email"
                className="form-control"
                readOnly
                value={currentuser.email}
              />

              <label>Phone Number</label>
              <input
                type="tel"
                className="form-control"
                required
                placeholder="+12345678"
                name="phoneno"
                value={phoneno}
                onChange={handlePhoneChange}
                pattern="^\+?[0-9]{7,15}$" // Enforce at least 7 to 15 digits including optional "+"
                title="Phone number must be between 7 to 15 digits and can optionally start with +"
              />

              <label>CNIC</label>
              <input
                type="text"
                className="form-control"
                name="cnic"
                value={cnic}
                onChange={(e) => setcnic(e.target.value)}
              />
            </div>
          </div>

          {/* Save and Clear Buttons */}
          <div className="form-buttons">
            <button type="submit" className="action-btn save-btn">
              Save Changes
            </button>
            <button type="button" className="action-btn clear-btn" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}