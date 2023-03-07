import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import useSnackbarCustom from "../../hooks/useSnackbarCustom";
import LoadingSpinner from "../loaders/LoadingSpinner";

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { snackbarWarning } = useSnackbarCustom();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (searchValue) {
      const city = searchValue;

      let onlyLetters = /^[^-\s][a-zA-Z\s-]+$/.test(city);
      /*
       If it containts letter we will navigate the user to the forecast page with city parameter,
       otherwise it will notify that only letters are allowed and clear the search field
      */
      if (onlyLetters) {
        setIsLoading(true);
        navigate(`/forecast/${city.toLowerCase()}`);
      } else {
        snackbarWarning("You can search for a place by letters only");
      }
      setSearchValue("");
    } else {
      snackbarWarning("You must enter a value in order to search");
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)} className="d-flex">
      <Form.Control
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
      />
      <Button style={{minWidth: "80px"}} className="d-flex align-items-center justify-content-center" type="submit" variant="warning">
       {isLoading ? <LoadingSpinner /> : "Search"}
      </Button>
    </Form>
  );
};

export default SearchForm;
