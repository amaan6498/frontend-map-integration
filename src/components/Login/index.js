import { Component } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { Navigate } from "react-router-dom";
import "./index.css";

class Login extends Component {
  state = {
    userName: "",
    password: "",
    errorMessage: "",
  };

  onChangeUserName = (event) => {
    this.setState({ userName: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { userName, password } = this.state;

    const data = {
      username: userName,
      password: password,
    };

    try {
      // Send a POST request with CORS mode enabled
      const response = await fetch(
        "https://map-integration-api.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          mode: "cors", // Explicitly enabling CORS
        }
      );

      if (!response.ok) {
        // If the response is not OK, show an error message
        const errorData = await response.json();
        this.setState({ errorMessage: errorData.message || "Login failed" });
      } else {
        // If login is successful, get the token from the response
        const responseData = await response.json();
        console.log("Login successful, token:", responseData.token);

        // Store the token in a cookie (using js-cookie)
        Cookies.set("token", responseData.token, { expires: 7, path: "/" }); // Expires in 7 days

        // Redirect the user to the dashboard or another page
        window.location.href = "/dashboard"; // Change to your actual dashboard route
      }
    } catch (error) {
      console.error("Network error:", error);
      this.setState({
        errorMessage: "A network error occurred. Please try again later.",
      });
    }
  };

  render() {
    const { userName, password, errorMessage } = this.state;
    const jwtToken = Cookies.get("token");
    if (jwtToken !== undefined) {
      return <Navigate to="/dashboard" />;
    }
    return (
      <div className="main-container">
        <div className="login-container">
          <form className="form-container" onSubmit={this.handleLogin}>
            <h2 className="heading-login">Login</h2>

            <label className="labels" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={this.onChangeUserName}
              value={userName}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.onChangePassword}
              value={password}
              required
            />

            <button type="submit">Login</button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
        <div className="image-container"></div>
      </div>
    );
  }
}

export default Login;
