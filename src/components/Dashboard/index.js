import React, { Component } from "react";
import Cookies from "js-cookie";
import { Link, Navigate } from "react-router-dom";

import "./index.css";

const icons = {
  ticket: "🎟️",
  globe: "🌍",
};

class Dashboard extends Component {
  state = {
    data: [],
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        "https://map-integration-api.onrender.com/api/dashboard",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      this.setState({ data: data.cards, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  render() {
    const { data, isLoading, error } = this.state;
    const jwtToken = Cookies.get("token");
    if (jwtToken === undefined) {
      return <Navigate to="/" />;
    }
    return (
      <div className="dashboard-container">
        <button className="logout-button" onClick={this.handleLogout}>
          Logout
        </button>
        <h2 className="dashboard-heading">Dashboard</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="cards-container">
          {data.map((item) => (
            <Link to="/map" key={item.id} className="link-class">
              <div className="card">
                <div className="card-header">
                  <span className="icon">{icons[item.icon]}</span>
                  <h3 className="card-title">{item.title}</h3>
                </div>
                <p className="card-value">{item.value}</p>
                <div className="trend">
                  <span
                    className={`trend-value ${
                      item.trend === "up" ? "up" : "down"
                    }`}
                  >
                    {item.trend === "up" ? "↑" : "↓"} {item.trendValue}%
                  </span>
                </div>
                <p className="card-description">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
