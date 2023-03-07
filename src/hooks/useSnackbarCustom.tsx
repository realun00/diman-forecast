import { useSnackbar } from "notistack";

/*INFORMATION
    1) message - The message that will be displayed on the screen
    2) type - the type of the snackbar.
     Types:
      - error (red)
      - success (green)
      - info (blue)
      - warning (yellow)
    3) positioning - where the snackbar will appear on the screen
     Positions:
      - top-right
      - top-center
      - top-left
      - bottom-right
      - bottom-center
      - bottom-left
------------------------------------------*/

const useSnackbarCustom = () => {
  //calling the useSnackbar hook
  const { enqueueSnackbar } = useSnackbar();

  const snackbarSuccess = (message: string, modal: boolean = false) => {
    if (modal) {
      enqueueSnackbar(message, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }

    enqueueSnackbar(message, { variant: "success" });
  };

  const snackbarError = (error: string, modal: boolean = false) => {
    if (modal) {
      enqueueSnackbar(error, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }

    enqueueSnackbar(error, { variant: "error" });
  };

  const snackbarWarning = (warning: string, modal: boolean = false) => {
    if (modal) {
      enqueueSnackbar(warning, {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }

    enqueueSnackbar(warning, { variant: "warning" });
  };

  const snackbarInfo = (info: string, modal: boolean = false) => {
    if (modal) {
      enqueueSnackbar(info, {
        variant: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }

    enqueueSnackbar(info, { variant: "info" });
  };

  return { snackbarSuccess, snackbarError, snackbarWarning, snackbarInfo };
};

export default useSnackbarCustom;
