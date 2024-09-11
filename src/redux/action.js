import {
    fetchEmployees as fetchEmployeesApi,
    fetchEmployee as fetchEmployeeApi,
    createEmployee as createEmployeeApi,
    updateEmployee as updateEmployeeApi,
    deleteEmployee as deleteEmployeeApi
  } from '../api';
  
  export const FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST';
  export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
  export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';
  export const FETCH_EMPLOYEE_SUCCESS = 'FETCH_EMPLOYEE_SUCCESS';
  export const CREATE_EMPLOYEE_SUCCESS = 'CREATE_EMPLOYEE_SUCCESS';
  export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS';
  export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS';
  
  export const fetchEmployees = () => async (dispatch) => {
    dispatch({ type: FETCH_EMPLOYEES_REQUEST });
    try {
      const data = await fetchEmployeesApi();
      dispatch({ type: FETCH_EMPLOYEES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_EMPLOYEES_FAILURE, payload: error.message });
    }
  };
  
  export const fetchEmployee = (id) => async (dispatch) => {
    try {
      const data = await fetchEmployeeApi(id);
      dispatch({ type: FETCH_EMPLOYEE_SUCCESS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
  
  export const createEmployee = (employee) => async (dispatch) => {
    try {
      const data = await createEmployeeApi(employee);
      dispatch({ type: CREATE_EMPLOYEE_SUCCESS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateEmployee = (id, employee) => async (dispatch) => {
    try {
      const data = await updateEmployeeApi(id, employee);
      dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteEmployee = (id) => async (dispatch) => {
    try {
      await deleteEmployeeApi(id);
      dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: id });
    } catch (error) {
      console.error(error);
    }
  };
  