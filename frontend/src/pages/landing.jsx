import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>ManthanMeet</h2>
        </div>

        {/* Hamburger Icon */}
        <div
          className="menuIcon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </div>

        {/* Navigation Links */}
        <div className={`navlist ${menuOpen ? "active" : ""}`}>
          <p
            onClick={() => {
              router("/aljk23");
              setMenuOpen(false);
            }}
          >
            Join as Guest
          </p>

          <p
            onClick={() => {
              router("/auth");
              setMenuOpen(false);
            }}
          >
            Register
          </p>

          <div
            role="button"
            onClick={() => {
              router("/auth");
              setMenuOpen(false);
            }}
          >
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            {/* <span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones */}
            Connect. <br></br>
          <span style={{ color: "#FF9839" }}>Collaborate</span>
          <br />
          Meet Anywhere.
          </h1>

          <p>Manthan Meet brings teams together with seamless video conferencing, real-time chat, and powerful collaboration tools.</p>

          <div role="button">
            <Link to="/auth">Get Started</Link>
          </div>
        </div>

        <div>
          
        </div>
      </div>
    </div>
  );
}