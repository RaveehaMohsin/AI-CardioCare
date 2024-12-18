import React, { useEffect, useState } from "react";
import "./auth.css";
import { FaUser} from 'react-icons/fa'; 
import { PiPasswordBold } from "react-icons/pi";
import { IoMailSharp } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("AI-CardioCareUsers", JSON.stringify(null));
}, []);


  // States for form inputs and error messages
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });


  const toggle = () => {
    setIsSignIn(!isSignIn);
    setFormData({
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });
    setErrorMessages({});
    setMessage({ text: "", type: "" }); // Clear message
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
  
    // Check for empty fields
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    });
  
    // Validate email format
    if (formData.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }
  
    // Ensure first name and last name contain only alphabets
    if (formData.firstName && !/^[A-Za-z]+$/.test(formData.firstName)) {
      errors.firstName = "First name should contain only alphabets";
      isValid = false;
    }
  
    if (formData.lastName && !/^[A-Za-z]+$/.test(formData.lastName)) {
      errors.lastName = "Last name should contain only alphabets";
      isValid = false;
    }
  
    // Validate password length
    if (formData.password && formData.password.length < 7) {
      errors.password = "Password must be atleast 7 characters long";
      isValid = false;
    }
  
    // Check if password and confirm password match
    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }
  
    setErrorMessages(errors);
    return isValid;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        try {
            const response = await fetch("http://localhost:4000/addauthuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    role: formData.role,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                setMessage({ text: "User registered successfully!", type: "success" });
                setTimeout(() => {
                    setMessage({ text: "", type: "" });
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        role: "",
                    });
                }, 3000); 
            } else {
                const error = await response.json();
                setMessage({ text: error.error || "Failed to sign up.", type: "error1" });
                setTimeout(() => {
                  setMessage({ text: "", type: "" });
                  setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      role: "",
                  });
              }, 3000);
            }
        } catch (err) {
            setMessage({ text: "An error occurred. Please try again later.", type: "error1" });
            setTimeout(() => {
              setMessage({ text: "", type: "" });
              setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  role: "",
              });
          }, 3000);
          console.log(err)
        }
    }
};


const validateSignIn = () => {
  const errors = {};
  if (!formData.email) errors.email = "Email is required";
  if (!formData.password) errors.password = "Password is required";
  setErrorMessages(errors);
  return Object.keys(errors).length === 0;
};

const handleSignIn = async (e) => {
  e.preventDefault();
  if (validateSignIn()) {
    try {
      const response = await fetch("http://localhost:4000/getauthuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      console.log(response)

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("AI-CardioCareUsers", JSON.stringify(user));
      
        setMessage({ text: "Login successful!", type: "success" });
        setTimeout(() => {
          setMessage({ text: "", type: "" });
          setFormData({
              email: "",
              password: "",
          });
  
          // Navigate based on user role after a delay
          if (user.user.role === "Patient") {
              history.push("/patientprofile/patientadd");
          }
          else if (user.user.role === "Admin") {
            history.push("/admin/dashboard");
        } 
        else {
              history.push("/");
          }
      }, 2000); 
      
      
      } else {
        const error = await response.json();
        setMessage({ text: "Invalid credentials", type: "error1" });
                setTimeout(() => {
                    setMessage({ text: "", type: "" });
                    setFormData({
                        email: "",
                        password: "",
                    });
        }, 2000); 
      }
    } catch (err) {
      setMessage({ text: "An error occurred. Please try again later.", type: "error1" });
    }
  }
};



  return (
    <div
      id="container"
      className={`container ${isSignIn ? "sign-in" : "sign-up"}`}
    >
      {/* Form Section */}
      <div className="row">
        {/* Sign Up */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <MdDriveFileRenameOutline  className="iconauth"/>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder={errorMessages.firstName || "Firstname"}
                  className={errorMessages.firstName ? "error-input" : ""}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <MdDriveFileRenameOutline  className="iconauth"/>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder={errorMessages.lastName || "Lastname"}
                  className={errorMessages.lastName ? "error-input" : ""}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <IoMailSharp  className="iconauth"/>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={errorMessages.email || "Email"}
                  className={errorMessages.email ? "error-input" : ""}
                  required
                />
              </div>
              <div className="input-group role-group">
                <i className="bx bx-mail-send"></i>
                <FaUser  className="iconauth" />
                <select 
                  className={`role-dropdown ${errorMessages.role ? "error-input" : ""}`}
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    {errorMessages.role || "Select Role"}
                  </option>
                  <option value="Patient">Patient</option>
                </select>
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <PiPasswordBold  className="iconauth" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={errorMessages.password || "Password"}
                  className={errorMessages.password ? "error-input" : ""}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <PiPasswordBold  className="iconauth" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder={errorMessages.confirmPassword || "Confirm password"}
                  className={errorMessages.confirmPassword ? "error-input" : ""}
                  required
                />
              </div>
              <button onClick={handleSubmit}>Sign up   <PiSignInBold /></button>
              <div className={`message-box ${message.type} ${message.text ? "" : "hidden"}`}>
                {message.text}
            </div>

              <p>
                <span>Already have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>

        {/* Sign In */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div className="form sign-in">
             <CgProfile className="signIn-Icon"/>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <IoMailSharp className="iconauth" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={errorMessages.email || "Email"}
                  className={errorMessages.email ? "error-input" : ""}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <PiPasswordBold  className="iconauth"/>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={errorMessages.password || "Password"}
                  className={errorMessages.password ? "error-input" : ""}
                  required
                />
              </div>
              <button onClick={handleSignIn}>Sign in   <PiSignInBold /></button>
              <div className={`message-box ${message.type} ${message.text ? "" : "hidden"}`}>
                {message.text}
            </div>
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign up here
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="row content-row">
        {/* Sign In Content */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
        </div>

        {/* Sign Up Content */}
        <div className="col align-items-center flex-col">
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
