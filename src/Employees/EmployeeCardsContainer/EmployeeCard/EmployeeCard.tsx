import { Button, Dialog, Paper, Typography } from "@mui/material";
import { Employee } from "../../../Modules/Employee";
import { useState } from "react";
import { EmployeeModal } from "../../EmployeeModal/EmployeeModal";

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard = ({ employee }: EmployeeCardProps): JSX.Element => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <>
      <Paper>
        <img src={employee.imageUrl} />
        <Typography variant="h5">
          {employee.firstName} {employee.lastName}
        </Typography>
        <Typography variant="body1">{employee.title}</Typography>
        <Typography variant="body2">
          {employee.city}, {employee.country}
        </Typography>
        <Button
          onClick={() => setDialogOpen(true)}
          variant="contained"
          sx={{ margin: "3%" }}
        >
          ABOUT ME
        </Button>
      </Paper>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{ sx: { backgroundColor: "lightblue" } }}
      >
        <EmployeeModal employee={employee} />
      </Dialog>
    </>
  );
};
