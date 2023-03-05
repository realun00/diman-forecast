import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";

import NavBar from "./components/navBar/NavBar";

const Forecast = lazy(() => import("./pages/Forecast"));
const NotFound = lazy(() => import("./components/errors/NotFound"));

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container fluid="xxl" id="df-container">
        <Routes>
          <Route path="/" element={<Forecast />} />

          {/* NO FOUND */}
          <Route
            path="*"
            element={
              <Suspense fallback={<>...</>}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
