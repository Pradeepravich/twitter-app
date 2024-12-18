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
import React, { useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { API_BASE_URL } from "../config";
import useUserInfoApi from "../hooks/useUserInfoApi";
import useUserInfoDataApi from "../services/useUserInfoDataApi";
import { Link, useNavigate } from "react-router-dom";
// Importing toastify module
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });

  const [data, setData] = useState<any>([]);

  const { userData, setUserData } = useAuth();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  // const { getUser } = useUserInfoApi(email, password);
  const { user, getUser } = useUserInfoDataApi(email, password);

  // console.log("user info", user);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validateField(name, value);
  };

  const validateField = (name: string, value: any) => {
    let error = "";
    switch (name) {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const fetchedUser = await getUser();
        // console.log("user submit", fetchedUser);
        if (fetchedUser && fetchedUser.length > 0) {
          // console.log("Login Successful", fetchedUser);
          setUserData(fetchedUser[0]);
          toast.success("Login successful", {
            position: "bottom-right",
          });
          navigate("/posts");
        } else {
          toast.error("Invalid credentials", {
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error(`Error fetching user: ${error}`, {
          position: "bottom-right",
        });
      }
    } else {
      toast.error("Please enter the required fields", {
        position: "bottom-right",
      });
      setMessage("Please enter the required fields");
    }
  };

  const resetForm = () => {
    setValues({
      email: "",
      password: "",
    });
    setData([]);
    setErrors({
      email: "",
      password: "",
    });
    setMessage("");
  };

  console.log("userData", userData);

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
            Login
          </Typography>
          <Card variant="outlined">
            <CardContent>
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                onSubmit={handleSubmit}
              >
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
                    <span className="block text-red-700 font-bold mb-2">
                      {errors.password}
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
                    Login
                  </Button>
                </Box>
              </Box>
              <Box className="text-right">
                <span>
                  Doesn't have an account?{" "}
                  <Link
                    className="underline text-blue-600 
                   hover:text-rose-900 
                   visited:text-rose-700"
                    to="/signup"
                  >
                    Sign up
                  </Link>
                </span>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
