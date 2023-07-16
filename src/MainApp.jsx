import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FallbackSpinner from "./components/FallbackSpinner";
import NavBarWithRouter from "./components/NavBar";
import Home from "./components/Home";
import endpoints from "./constants/endpoints";

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        <Router>
          <Suspense fallback={<FallbackSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              {data &&
                data.sections.map((route) => {
                  const SectionComponent = React.lazy(() =>
                    import(`./components/${route.component}`)
                  );
                  return (
                    <Route
                      key={route.headerTitle}
                      path={route.path}
                      element={<SectionComponent header={route.headerTitle} />}
                    />
                  );
                })}
            </Routes>
          </Suspense>
        </Router>
      </main>
    </div>
  );
}

export default MainApp;
