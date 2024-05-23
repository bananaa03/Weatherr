import React, { useState } from "react";
import "./LogIn.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function LogIn() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", formData);
      console.log(response.data);
      // Xử lý dữ liệu phản hồi ở đây (ví dụ: chuyển hướng hoặc hiển thị thông báo)
      alert("Thành công đăng nhập!");
      navigate("/");
      localStorage.setItem("token", response.data);
    } catch (error) {
      console.error("Error:", error.response.data);
      // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi)
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
            <div>
              <input
                id="username"
                name="username"
                className="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="Tên người dùng"
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="password"
                placeholder="Mật khẩu"
              />
            </div>
            <button style={{cursor:"pointer"}} type="submit" className="submit">Đăng nhập</button>
          </form>
      </div>

      <div id="rec2">
        <p className="dont-have-acc" >Bạn chưa có tài khoản?</p>
        <a href="./signup" className="signup">
          Đăng ký
        </a>
      </div>

    </div>
  );
}

export default LogIn;
