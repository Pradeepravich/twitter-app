// import "../styles/globals.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import React, { useMemo, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

interface SignupValues {
  full_name: string;
  email: string;
  password: string;
  dob: moment.Moment | null;
}

const Signup = () => {
  const [values, setValues] = useState<SignupValues>({
    full_name: "",
    email: "",
    password: "",
    dob: null,
  });

  const [data, setData] = useState<any>([]);

  const [errors, setErrors] = useState({
    full_name: "",
    email: "",
    password: "",
    dob: "",
  });

  const { full_name, email, password, dob } = values;

  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validateField(name, value);
  };

  const handleDateChange = (date: moment.Moment | null) => {
    setValues({ ...values, dob: date });
    validateField("dob", date);
  };

  const validateField = (name: string, value: any) => {
    let error = "";
    switch (name) {
      case "full_name":
        if (isEmpty(value)) {
          error = "Full Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "Full Name can only contain letters and spaces";
        }
        break;
      case "email":
        if (isEmpty(value)) {
          error = "Email is required";
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        ) {
          error = "Invalid email format";
        }
        break;
      case "password":
        if (isEmpty(value)) {
          error = "Password is required";
        } else if (!/^[a-zA-Z0-9]{6,}$/.test(value)) {
          error = "Password must contain atleast 6 alphanumeric characters";
        }
        break;
      case "dob":
        if (isEmpty(value)) {
          error = "Date of birth is required";
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const isValidFields = useMemo(() => {
    return (
      Object.values(errors).every((error) => !error) &&
      Object.values(values).every((value) => value?.toString().trim() !== "")
    );
  }, [errors, values]);

  const validateForm = () => {
    let isValid = true;
    Object.entries(values).forEach(([name, value]) => {
      validateField(name, value as string);
      if (errors[name as keyof typeof errors]) {
        isValid = false;
      }
    });
    return isValid;
  };

  const resetForm = () => {
    setValues({
      full_name: "",
      email: "",
      password: "",
      dob: null,
    });
    setData([]);
    setErrors({
      full_name: "",
      email: "",
      password: "",
      dob: "",
    });
    setMessage("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      // const checkFields = data.some((value: any) => value.email === email);
      // if (checkFields) {
      //   setMessage("User already exists");
      //   enqueueSnackbar("User already exists", {
      //     anchorOrigin: {
      //       vertical: "bottom",
      //       horizontal: "right",
      //     },
      //     variant: "error",
      //   });
      //   return;
      // }

      const formattedValues = {
        ...values,
        dob: values.dob ? values.dob.toISOString() : null, // Format DOB
      };
      setData([formattedValues]);
      axios
        .post(`${API_BASE_URL}/users`, formattedValues)
        .then((response) => {
          enqueueSnackbar("Form submitted successfully", {
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
            variant: "success",
          });
          setMessage("Form submitted successfully!");
          setValues({
            full_name: "",
            email: "",
            password: "",
            dob: null,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      enqueueSnackbar("Please enter the required fields", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        variant: "error",
      });
      setMessage("Please enter the required fields");
    }
  };

  console.log("data", data);
  console.log("values", values);
  // console.log("errors", errors);
  // console.log("isValidFields", isValidFields);
  // console.log("Object.values(errors)", Object.values(errors));

  return (
    <Container>
      <CssBaseline />
      <Box className="">
        <Box sx={{ width: "75%", mx: "auto" }}>
          <Typography
            variant="h3"
            align="center"
            mt={4}
            pt={2}
            pb={2}
            sx={{ bgcolor: "#9C27B0", color: "#ffffff" }}
            className="bg-blue-500"
          >
            Signup
          </Typography>
          <Card variant="outlined">
            <CardContent>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Box
                  component="form"
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  onSubmit={handleSubmit}
                >
                  <FormControl>
                    <TextField
                      id="outlined-basic"
                      label="Full Name"
                      name="full_name"
                      variant="outlined"
                      value={full_name}
                      onChange={handleChange}
                    />
                    {errors.full_name && (
                      <span className="block text-red-700 font-bold mb-2">
                        {errors.full_name}
                      </span>
                    )}
                  </FormControl>
                  <FormControl>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      name="email"
                      variant="outlined"
                      value={email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className="block text-red-700 font-bold mb-2">
                        {errors.email}
                      </span>
                    )}
                  </FormControl>
                  <FormControl>
                    <TextField
                      id="outlined-basic"
                      label="Password"
                      name="password"
                      variant="outlined"
                      value={password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <span style={{ color: "red" }}>{errors.password}</span>
                    )}
                  </FormControl>
                  <FormControl>
                    <DatePicker
                      label="Date of Birth"
                      name="dob"
                      value={dob}
                      onChange={handleDateChange}
                    />
                    {errors.dob && (
                      <span style={{ color: "red" }} className="text-red-600">
                        {errors.dob}
                      </span>
                    )}
                  </FormControl>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      disabled={!isValidFields}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
                <Box className="text-right">
                  <span>
                    Already a existing User? <Link to="/login">Signin</Link>
                  </span>
                </Box>
              </LocalizationProvider>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};
export default Signup;
