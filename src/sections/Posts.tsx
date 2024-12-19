import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddPost from "../components/AddPost";
import axios from "axios";
import { API_BASE_URL } from "../config";
import EditPost from "../components/EditPost";
import usePostsApi from "../services/usePostsApi";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserByIdApi from "../services/useUserByIdApi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Posts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page
  const { userData, logout } = useAuth();
  const { getPosts } = usePostsApi();
  const { user: users } = useUserByIdApi("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await getPosts();
        // setData(fetchedPosts);
        setData(
          fetchedPosts?.map((post: any) => {
            return {
              ...post,
              user: users?.find((user: any) => post.userId === user.id),
            };
          })
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, [getPosts, users]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // setRowsPerPage(parseInt(event.target.value, 2));
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleDelete = (rowId: any) => {
    axios
      .delete(`${API_BASE_URL}/posts/${rowId}`)
      .then((response) => {
        setData(data?.filter((item: any) => item?.id !== rowId));
        setPage(0);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  console.log("data", data);
  console.log("userData", userData);

  return (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h4" color="error" align="center" mt={4}>
          <h1>User Name: {userData?.name}</h1>
        </Typography>
        <Box sx={{ mx: "auto" }}>
          <div className="flex flex-wrap justify-between items-center">
            <AddPost setData={setData} userData={userData} users={users} />
            <Button
              variant="contained"
              color="info"
              onClick={() => logout(navigate)}
            >
              Logout
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ mt: "1rem" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.NO</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                  <StyledTableCell align="left">Author</StyledTableCell>
                  <StyledTableCell align="right">ACTION</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item: any, index) => (
                    <StyledTableRow key={item?.id}>
                      <StyledTableCell>
                        {item?.userId === userData?.id ? (
                          <Link to={`/posts/${item?.id}`}>{index + 1}</Link>
                        ) : (
                          index + 1
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item?.userId === userData?.id ? (
                          <Link to={`/posts/${item?.id}`}>{item?.title}</Link>
                        ) : (
                          item?.title
                        )}{" "}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {item?.description}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {item?.user?.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item?.userId === userData?.id ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              className="!mx-2"
                              onClick={() => navigate(`/posts/${item?.id}`)}
                            >
                              View
                            </Button>
                            <EditPost
                              rowId={item?.id}
                              setData={setData}
                              data={data}
                            />
                            <Button
                              variant="contained"
                              color="error"
                              className="!mx-2"
                              onClick={() => handleDelete(item?.id)}
                            >
                              Delete
                            </Button>
                          </>
                        ) : (
                          ""
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Container>
    </>
  );
};

export default Posts;
