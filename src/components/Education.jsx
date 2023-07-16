import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Chrono } from "react-chrono";
import { Container } from "react-bootstrap";
import Fade from "react-reveal";
import { ThemeContext } from "styled-components";
import FallbackSpinner from "./FallbackSpinner";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import "../css/education.css";

function Education({ header }) {
  const { accentColor, chronoTheme } = useContext(ThemeContext);
  const { cardBgColor, cardForeColor, titleColor } = chronoTheme;
  const theme = {
    primary: accentColor,
    secondary: accentColor,
    cardBgColor,
    cardForeColor,
    titleColor,
  };

  const [data, setData] = useState(null);
  const [width, setWidth] = useState("50vw");
  const [mode, setMode] = useState("VERTICAL_ALTERNATING");

  useEffect(() => {
    fetch(endpoints.education)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    if (window?.innerWidth < 576) {
      setMode("VERTICAL");
      setWidth("90vw");
    } else if (window?.innerWidth < 768) {
      setWidth("90vw");
    } else if (window?.innerWidth < 1024) {
      setWidth("75vw");
    } else {
      setWidth("50vw");
    }
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container" style={{ width }}>
            <Container>
              <Chrono
                hideControls
                allowDynamicUpdate
                useReadMore={false}
                items={data.education}
                cardHeight={250}
                mode={mode}
                // theme={theme}
              >
                <div className="chrono-icons">
                  {data.education.map((education) =>
                    education.icon ? (
                      <img
                        key={education.icon.src}
                        src={education.icon.src}
                        alt={education.icon.alt}
                      />
                    ) : null
                  )}
                </div>
              </Chrono>
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
