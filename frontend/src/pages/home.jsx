import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";

import {
  Button,
  TextField,
  Paper,
} from "@mui/material";

import VideoCallIcon from "@mui/icons-material/VideoCall";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  const navigate = useNavigate();

  const [meetingCode, setMeetingCode] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return;

    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <div className="homePage">

      {/* ================= NAVBAR ================= */}

      <nav className="homeNavbar">

        <div className="logoArea">
          <VideoCallIcon sx={{ fontSize: 34 }} />
          <h2>ManthanMeet</h2>
        </div>

        <div className={`navButtons ${menuOpen ? "active" : ""}`}>

          <Button
            startIcon={<HistoryIcon />}
            onClick={() => {
              navigate("/history");
              setMenuOpen(false);
            }}
          >
            History
          </Button>

          <Button
            color="error"
            startIcon={<LogoutIcon />}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
              setMenuOpen(false);
            }}
          >
            Logout
          </Button>

        </div>

        <div
          className="menuIcon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="heroSection">

        <div className="heroLeft">

          <span className="heroBadge">
            🚀 Connect Anytime, Anywhere
          </span>

          <h1>
            Video Meetings
            <br />
            Made <span>Simple.</span>
          </h1>

          <p>
            Create or join secure HD meetings instantly.
            Collaborate with friends, classmates and teammates
            using ManthanMeet.
          </p>

          <Paper elevation={4} className="joinCard">

            <TextField
              fullWidth
              label="Enter Meeting Code"
              variant="outlined"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleJoinVideoCall}
            >
              Join Meeting
            </Button>

          </Paper>

        </div>

        <div className="heroRight">

          <img
            src="/logo3.png"
            alt="Meeting"
            className="heroImage"
          />

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="featureSection">

        <Paper elevation={3} className="featureCard">
          <h3>🔒 Secure</h3>
          <p>
            End-to-end encrypted meetings with complete privacy.
          </p>
        </Paper>

        <Paper elevation={3} className="featureCard">
          <h3>⚡ Fast</h3>
          <p>
            Join meetings instantly with a single meeting code.
          </p>
        </Paper>

        <Paper elevation={3} className="featureCard">
          <h3>🎥 HD Quality</h3>
          <p>
            Crystal-clear audio and high-definition video calls.
          </p>
        </Paper>

      </section>

    </div>
  );
}

export default withAuth(HomeComponent);