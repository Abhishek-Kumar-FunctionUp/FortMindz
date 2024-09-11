import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";
import { createEmployee, fetchEmployee, updateEmployee } from "../redux/action";
import logo from "../assets/fortmindz.png";

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const currentEmployee = useSelector(state => state.currentEmployee);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(
    () => {
      if (id) {
        dispatch(fetchEmployee(id));
      }
    },
    [id, dispatch]
  );

  useEffect(
    () => {
      if (currentEmployee) {
        setName(currentEmployee.employee_name);
        setImage(currentEmployee.profile_image);
        setIsEditing(true);
      }
    },
    [currentEmployee]
  );

  const handleSubmit = async e => {
    e.preventDefault();
    const employee = { employee_name: name, profile_image: image };

    try {
      if (isEditing) {
        await dispatch(updateEmployee(id, employee));
      } else {
        await dispatch(createEmployee(employee));
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <img
        src={logo}
        alt="logo"
        style={{ display: "block", margin: "0 auto" }}
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
          sx={{
            mb: 2,
            width: "80%",
            "& .MuiInputBase-input": {
              color: "#ffffff"
            },
            "& .MuiInputLabel-root": {
              color: "#ffffff"
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#f18f0f"
              },
              "&:hover fieldset": {
                borderColor: "#f18f0f"
              },
              "&.Mui-focused fieldset": {
                borderColor: "#f18f0f"
              }
            }
          }}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          value={image}
          onChange={e => setImage(e.target.value)}
          sx={{
            mb: 2,
            width: "80%",
            "& .MuiInputBase-input": {
              color: "#ffffff"
            },
            "& .MuiInputLabel-root": {
              color: "#ffffff"
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#f18f0f"
              },
              "&:hover fieldset": {
                borderColor: "#f18f0f"
              },
              "&.Mui-focused fieldset": {
                borderColor: "#f18f0f"
              }
            }
          }}
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          {isEditing ? "Update" : "Create"}
        </Button>
      </Box>
    </div>
  );
};

export default EmployeeForm;
