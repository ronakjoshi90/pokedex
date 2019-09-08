import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { SampleActionCreators } from "../actions/SampleActionCreators";

const SampleContent = ({ title, subtitle, text }) => {
  const handleClick = () => {
    SampleActionCreators.actionCreator001();
  };

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./img/hero.jpeg)",
          height: "40vh",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 32
        }}
      >
        <div
          className="hero-title"
          style={{
            fontWeight: 900,
            fontSize: 72,
            color: "white"
          }}
        >
          Starter React Flux
        </div>
        <div
          className="hero-subtitle"
          style={{
            fontWeight: 300,
            fontSize: 40,
            color: "white"
          }}
        >
          Superfast React development tool
        </div>
      </div>
      <div style={{ padding: 32 }}>
        <div
          style={{
            fontWeight: 900,
            fontSize: 48
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontWeight: 300,
            fontSize: 24
          }}
        >
          {subtitle}
        </div>
        <div style={{ fontFamily: "Merriweather", padding: "40px 0" }}>
          {text}
        </div>
        <Button
          variant="contained"
          style={{ backgroundColor: "black", color: "white" }}
          size="large"
          onClick={handleClick}
        >
          Try Flux
        </Button>
      </div>
    </div>
  );
};

SampleContent.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default SampleContent;
