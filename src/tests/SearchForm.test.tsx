import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import SearchForm from "../components/navBar/SearchForm";

//Mocked notistack
const mockEnqueue = jest.fn();
jest.mock("notistack", () => ({
  ...jest.requireActual("notistack"),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue,
    };
  },
}));

afterEach(cleanup);

describe("SearchForm", () => {
  it("Check for existance", async () => {
    await render(
      <SnackbarProvider maxSnack={3} autoHideDuration={1500} preventDuplicate>
        <Router>
          <SearchForm />
        </Router>
      </SnackbarProvider>
    );
    const inputField = screen.getByPlaceholderText("Search");
    const button = screen.getByText("Search");
    expect(inputField).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("Input value check", async () => {
    await render(
      <SnackbarProvider maxSnack={3} autoHideDuration={1500} preventDuplicate>
        <Router>
          <SearchForm />
        </Router>
      </SnackbarProvider>
    );
    const inputField = screen.getByPlaceholderText("Search");
    const button = screen.getByRole("button");

    //Check if no value is entered
    fireEvent.click(button);
    expect(mockEnqueue).toBeCalledWith("You must enter a value in order to search", { variant: "warning" });

    //Check if correct value is entered
    fireEvent.change(inputField, { target: { value: "Plovdiv" } });
    expect(inputField).toHaveValue("Plovdiv");
    fireEvent.click(button);
    expect(inputField).toHaveValue("");

    //Check if invalid value is entered
    fireEvent.change(inputField, { target: { value: "_123s@cf" } });
    expect(inputField).toHaveValue("_123s@cf");
    fireEvent.click(button);
    expect(inputField).toHaveValue("");
    expect(mockEnqueue).toBeCalledWith("You can search for a place by letters only", { variant: "warning" });
  });
});
