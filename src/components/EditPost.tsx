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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EditPostProps{
  data: any;
  rowId: string;
  setData: React.Dispatch<any>;
}

const EditPost = ({rowId, setData, data}:EditPostProps ) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",        
  });
  const { title, description } = values;

  

  const handleEditOpen = async() => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${rowId}`);      
      setValues(response?.data);
    } catch (error) {
      throw new Error(error);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleEditPost = async (rowId) => {   
    console.log("rowId", rowId);
    try {
      if(title && description && rowId !== undefined) {
        const formattedValues = {
          ...values,
          updatedAt: moment().toISOString(), // Format DOB
        };
        const response = await axios.put(`${API_BASE_URL}/posts/${rowId}`, formattedValues);      
        // console.log("response.data", response.data);        
        setData((prev)=>{
          return prev.map((item) =>
            item?.id === rowId ? formattedValues : item
          );
        })
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
        <DialogTitle>{"Edit Posts"}</DialogTitle>
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
          <Button onClick={()=>handleEditPost(rowId)}>Edit</Button>
        </DialogActions>
      </Dialog>
      <span className="text-right">
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className=""
          onClick={handleEditOpen}
        >
          Edit Post
        </Button>
      </span>
    </>
  );
};

export default EditPost;
