import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
  FETCH_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_SUCCESS
} from "./action";

const initialState = {
  employees: [],
  currentEmployee: null,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload
      };
    case FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        currentEmployee: action.payload
      };
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.map(
          employee =>
            employee.id === action.payload.id ? action.payload : employee
        )
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.filter(
          employee => employee.id !== action.payload
        )
      };
    default:
      return state;
  }
};

export default reducer;
