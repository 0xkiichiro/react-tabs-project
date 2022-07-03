import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const API_URL = "https://course-api.com/react-tabs-project";

function App() {
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTabs(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>;
      </section>
    );
  }
  // console.log(tabs);
  const { company, dates, duties, title } = tabs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
      </div>
      <div className="underline"></div>
      <div className="jobs-center">
        {/* button container */}
        <div className="btn-container">
          {tabs.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setValue(index)}
                className={`job-btn ${index === value && "active-btn"}`}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((item, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{item}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
