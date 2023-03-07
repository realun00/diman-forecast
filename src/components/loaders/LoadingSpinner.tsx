import React from "react";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface LoadingSpinnerInterface {
  class?: string;
}

const LoadingSpinner = (props: LoadingSpinnerInterface) => {
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
      }}
    >
      <FontAwesomeIcon icon={faSpinner} className={"fa-spin " + props.class ?? undefined} />
    </Box>
  );
};

export default LoadingSpinner;
