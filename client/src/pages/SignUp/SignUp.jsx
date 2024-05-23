import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/user/register/", formData);
      console.log(response.data); // In ra dữ liệu phản hồi từ backend
      navigate("../login");
      // Xử lý dữ liệu phản hồi ở đây (ví dụ: chuyển hướng đến trang đăng nhập)
    } catch (error) {
      console.error(error.response.data); // In ra thông báo lỗi từ backend
      // Hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <div>
      <div id="signup-rec1">
        <img
          src="https://img.freepik.com/free-psd/3d-icon-weather-conditions-with-rain-sun_23-2150108737.jpg?w=740&t=st=1714836832~exp=1714837432~hmac=0673e5103276c1ccb8e5a27da27d4fc598a68bd962c162491f7624d2ef53c720"
          alt="logo"
          className="logo"
        />
        <div
          className="type-signup"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input type="text" name="email" value={formData.email} onChange={handleInputChange} className="email" placeholder="Email" />
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="username" placeholder="Tên người dùng" />
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="password" placeholder="Mật khẩu" />
        </div>
        <button className="signup" style={{cursor:'pointer'}} onClick={handleSignUp}>
          Đăng ký
        </button>
      </div>

      <div id="signup-rec2">
        <p className="have-an-acc">Đã có tài khoản?</p>
        <a href="./login" className="login">
          Đăng nhập
        </a>
      </div>
    </div>
  );
}

export default SignUp;
