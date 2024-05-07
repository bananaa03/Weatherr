import React from "react";
import "./LogIn.css";
import axios from 'axios';

function LogIn() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    
    try {
        const response = await axios.post('http://localhost:3000/users/login', {
            email: email,
            password: password
        });
        console.log(response.data);
        // Xử lý dữ liệu phản hồi ở đây (ví dụ: lưu token vào localStorage)
    } catch (error) {
        console.error(error.response.data);
    }
};
  return (
    <div>
      <div id="rec1">
        <img
          src="https://img.freepik.com/free-psd/3d-icon-weather-conditions-with-rain-sun_23-2150108737.jpg?w=740&t=st=1714836832~exp=1714837432~hmac=0673e5103276c1ccb8e5a27da27d4fc598a68bd962c162491f7624d2ef53c720"
          alt="logo"
          className="logo"
        />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="username"
            placeholder="Username, or email"
          />
          <br />
          <input type="password" className="password" placeholder="Password" />
          <br />
          <br />
          <input type="submit" className="submit" value="Log in" />
        </form>
      </div>

      <div id="rec2">
        <p className="dont-have-acc">Don't have an account?</p>
        <a href="./signup" className="signup">
          Sign up
        </a>
      </div>
    </div>
  );
}

export default LogIn;
