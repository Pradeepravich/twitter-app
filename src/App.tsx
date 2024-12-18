import React from "react";
import "./App.css";
import Router from "./Router";
import { SnackbarProvider } from "notistack";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <SnackbarProvider>
        <Router />
      </SnackbarProvider>
      <ToastContainer />
    </>
  );
}

export default App;
