import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
// import LogIn from "./pages/LogIn/LogIn";

// const fakeAuth = {
//   isAuthenticated: false, // Đã đăng nhập hay chưa
//   authenticate(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // Fake async
//   },
//   signout(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100); // Fake async
//   }
// };

// const PrivateRoute = ({ element, ...rest }) => {
//   return fakeAuth.isAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            return (
              //<PrivateRoute
              <Route
                key={route.path}
                path={route.path}
                element={<Page />}
              />
            );  
          })}
          {/* <Route path="/login" element={<LogIn />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
