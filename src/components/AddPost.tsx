import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import axios from "axios";
import { API_BASE_URL } from "../config";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import { User } from "../contexts/AuthContext";
import useUserByIdApi from "../services/useUserByIdApi";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AddPostProps {
  setData: React.Dispatch<any>;
  userData: User | null;
  users: any;
}

const AddPost = ({ setData, userData, users }: AddPostProps) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const { title, description } = values;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleAddPost = async () => {
    try {
      if (title && description) {
        const formattedValues = {
          ...values,
          userId: userData?.id,
          updatedAt: moment().toISOString(), 
          createdAt: moment().toISOString(),           
        };
        const response = await axios.post(
          `${API_BASE_URL}/posts`,
          formattedValues
        );
        // console.log("response.data", response.data);        
        let formattedData = {...response.data, user: userData}
        setValues({ title: "", description: "" });         
        setData((prev) => [...prev, formattedData]);
        return response.data;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Adding Posts"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "400px",
              }}
            >
              <FormControl>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  name="title"
                  variant="outlined"
                  value={title}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="outlined-basic"
                  label="Description"
                  name="description"
                  variant="outlined"
                  value={description}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleAddPost}>Add</Button>
        </DialogActions>
      </Dialog>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        className=""
        onClick={handleClickOpen}
      >
        Add Post
      </Button>
    </>
  );
};

export default AddPost;
