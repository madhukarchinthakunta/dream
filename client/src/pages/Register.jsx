import { useEffect, useState } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom"
function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileImage: null,
  });
const [passwordMatch,setPasswordMatch]= useState(true)
  const {
    firstName,
    lastName,
    email,
    password,
    confirmpassword,
    profileImage,
  } = formData;


  const handleChange = (e) => {
    const {name, value, files} = e.target;
    setFormData({
      ...formData,
      [name]:[value],
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  useEffect(()=>{
    
    setPasswordMatch(password ===  confirmpassword || confirmpassword === "")
  })

  const handleSubmit =async (e)=>{
    e.preventDefault();
    
    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form
      })
      if (response.ok) {
        navigate("/login")
      }
    } catch (err){
      console.log("Registration failed", err.message)
    }
  }
  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            required
            value={firstName}
            onChange={handleChange}
          />
          <input
            placeholder="Last Name"
            name="lastName"
            required
            value={lastName}
            onChange={handleChange}
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            required
            value={email}
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            required
            value={password}
            onChange={handleChange}
          />

          <input
            placeholder="Confirm Password"
            name="confirmpassword"
            type="password"
            required
            value={confirmpassword}
            onChange={handleChange}
          />

{!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}
          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            required
            style={{ display: "none" }}
           
            onChange={handleChange}
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile " />
            <p>Upload Profile Photo</p>
          </label>
          {profileImage && (
            <img  src= {URL.createObjectURL(profileImage)}
            alt='profie'
            style={{maxWidth:"80px"}}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href="/login">Alredy having an account ? Login in Here</a>
      </div>
    </div>
  );
}

export default Register;
