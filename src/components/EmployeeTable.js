import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography
} from "@mui/material";
import { deleteEmployee, fetchEmployees } from "../redux/action";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import logo from "../assets/fortmindz.png";
import avatar from "../assets/avatar.png";
import Modal from "@mui/material/Modal";

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, loading, error } = useSelector(state => state);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  console.log(selectedEmployee)

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "black",
    border: "2px solid white",
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = id => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = id => {
    dispatch(deleteEmployee(id));
  };

  const handleOpen = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div>
      <img
        src={logo}
        alt="logo"
        style={{ display: "block", margin: "0 auto", color: "white" }}
      />
      <TableContainer component={Paper} style={{ background: "black" }}>
        <Table>
          <TableHead style={{ background: "#f18f0f" }}>
            <TableRow>
              <TableCell
                style={{
                  color: "white",
                  fontWeight: 600,
                  borderRight: "1px solid white"
                }}
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  fontWeight: 600,
                  borderRight: "1px solid white"
                }}
              >
                Image
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              <TableRow>
                <TableCell
                  colSpan={3}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%"
                    }}
                  >
                    <CircularProgress sx={{ color: "#f18f0f" }} />
                  </div>
                </TableCell>
              </TableRow>}
            {error &&
              <TableRow>
                <TableCell colSpan={3} style={{ color: "white" }}>
                  Error: {error}
                </TableCell>
              </TableRow>}
            {!loading &&
              !error &&
              employees.map(employee =>
                <TableRow key={employee.id}>
                  <TableCell style={{ color: "white" }}>
                    {employee.employee_name}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    <img
                      src={
                        employee.profile_image ? employee.profile_image : avatar
                      }
                      alt={employee.employee_name}
                      style={{ width: 50, height: 50, cursor: 'pointer' }}
                      onClick={() => handleOpen(employee)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(employee.id)}
                      style={{ marginRight: 10 }}
                    >
                      <FaRegEdit />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(employee.id)}
                    >
                      <MdDeleteOutline />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedEmployee && (
            <>
              <img
                src={selectedEmployee.profile_image ? selectedEmployee.profile_image : avatar}
                alt={selectedEmployee.employee_name}
                style={{ width: '60%', height: 'auto', border:"2px solid white", borderRadius:"50%" }}
              />
               <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color:"white"}}>
                {selectedEmployee.employee_name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2, color:"white" }}>
                Age : <span style={{color:"#f18f0f"}}>{selectedEmployee.employee_age}</span>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 1, color:"white" }}>
                Salary : <span style={{color:"#f18f0f"}}>{selectedEmployee.employee_salary}</span>
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default EmployeeTable;
