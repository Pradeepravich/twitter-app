import React, { ChangeEvent, useEffect, useState } from "react";
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
import useUpdateCommentsByIdApi from "../services/useUpdateCommentsByIdApi";
import useCommentsByIdApi from "../services/useCommentsByIdApi";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EditPostProps {
  rowId: string;
  data: any;
  setData: React.Dispatch<any>;
}

const EditComment = ({ rowId, setData, data }: EditPostProps) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    text: "",
  });

  const { text } = values || {};

  const {comments,getComments} = useCommentsByIdApi(rowId);
  const { updateComment } = useUpdateCommentsByIdApi();

  const handleEditOpen = async () => {
    try {
      const response = await getComments();      
      setValues(response);
    } catch (error) {
      throw new Error(error);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleEditComment = async (rowId:string) => {
    try {
      if (text && rowId !== undefined) {
        const formattedValues = {
          ...values,
          id: rowId,
          updatedAt: moment().toISOString(), // Format DOB
        };
        const response = await updateComment(formattedValues);
        setData((prev) => {
          return prev.map((item) =>
            item?.id === rowId ? formattedValues : item
          );
        });
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // console.log("text", text);
  // console.log("data", data);

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
                  label="Comment"
                  name="text"
                  variant="outlined"
                  value={text}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={() => handleEditComment(rowId)}>Edit</Button>
        </DialogActions>
      </Dialog>
      <span className="text-right">
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className="!ml-4"
          onClick={handleEditOpen}
        >
          Edit
        </Button>
      </span>
    </>
  );
};

export default EditComment;
