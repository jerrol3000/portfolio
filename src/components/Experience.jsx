import React, { useEffect, useState, useContext } from "react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";
import Fade from "react-reveal";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";
import "../css/experience.css";

const styles = {
  ulStyle: {
    listStylePosition: "outside",
    paddingLeft: 20,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitleStyle: {
    display: "inline-block",
  },
  inlineChild: {
    display: "inline-block",
  },
  itemStyle: {
    marginBottom: 10,
  },
};

function Experience({ header }) {
  const theme = useContext(ThemeContext);
  const { accentColor, color, timelineLineColor } = theme;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />

      {data ? (
        <div className="section-content-container">
          <Container>
            <Timeline lineColor={timelineLineColor}>
              {data.map(({ title, dateText, subtitle, workType }, i) => (
                <Fade key={i}>
                  <TimelineItem
                    key={title + dateText}
                    dateText={dateText}
                    dateInnerStyle={{ background: accentColor }}
                    style={styles.itemStyle}
                    bodyContainerStyle={{ color: color }}
                  >
                    <h2 className="item-title">{title}</h2>
                    <div style={styles.subtitleContainerStyle}>
                      <h4
                        style={{
                          ...styles.subtitleStyle,
                          color: accentColor,
                        }}
                      >
                        {subtitle}
                      </h4>
                      {workType && (
                        <h5 style={styles.inlineChild}>&nbsp;· {workType}</h5>
                      )}
                    </div>
                    <ul style={styles.ulStyle}>
                      {item.workDescription.map((point) => (
                        <div key={point}>
                          <li>
                            <ReactMarkdown
                              children={point}
                              components={{
                                p: "span",
                              }}
                            />
                          </li>
                          <br />
                        </div>
                      ))}
                    </ul>
                  </TimelineItem>
                </Fade>
              ))}
            </Timeline>
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
