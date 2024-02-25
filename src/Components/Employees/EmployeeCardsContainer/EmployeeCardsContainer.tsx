import axios from "axios";
import { Employee } from "../../../Modules/Employee";
import { useContext, useEffect } from "react";
import { EmployeeCard } from "./EmployeeCard/EmployeeCard";
import { Typography } from "@mui/material";
import "./EmployeeCardsContainer.css";
import { employeeContext } from "../../../App";

export const EmployeeCardsContainer = () => {
  const { employees, setEmployees } = useContext(employeeContext);
  useEffect(() => {
    axios
      .get<Array<Employee>>("http://localhost:3030/api/employees/")
      .then(({ data }) => {
        setEmployees(data);
      });
  }, []);
  return (
    <>
      <Typography variant="h3" sx={{ margin: "2%" }}>
        Meet The Team!
      </Typography>
      <div className="employees">
        {employees.map((employee) => {
          return (
            <div className="employee" key={employee.id}>
              <EmployeeCard employee={employee} />
            </div>
          );
        })}
      </div>
    </>
  );
};
