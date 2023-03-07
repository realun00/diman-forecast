import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import NavBar from "../components/navBar/NavBar";

test("Check if text logo exists", async () => {
  await render(
    <SnackbarProvider maxSnack={3} autoHideDuration={1500} preventDuplicate>
      <Router>
        <NavBar />
      </Router>
    </SnackbarProvider>
  );

  const logoText = screen.getByText("Diman Forecast");
  expect(logoText).toBeInTheDocument();
});
