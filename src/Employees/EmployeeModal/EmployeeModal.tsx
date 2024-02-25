import { Typography } from "@mui/material";
import { Employee } from "../../Modules/Employee";
import { useEffect, useState } from "react";
import axios from "axios";

interface EmployeeModalProps {
  employee: Employee;
}

export const EmployeeModal = ({
  employee,
}: EmployeeModalProps): JSX.Element => {
  const [timezone, setTimezone] = useState<string>();
  const [localTime, setLocalTime] = useState<string>();
  useEffect(() => {
    axios<{
      timezone: string;
      datetime: string;
      date: string;
      year: string;
      month: string;
      day: string;
      hour: string;
      minute: string;
      second: string;
      day_of_week: string;
    }>({
      method: "get",
      url: `https://api.api-ninjas.com/v1/worldtime?city=${employee.city}`,
      headers: { "X-Api-Key": "Cz0zWhhmWLR56Q+Zdp+sdw==5gX0cML8aJZTA3Ph" },
    }).then(({ data }) => {
      setTimezone(data.timezone);
      setLocalTime(`${data.day_of_week}, ${data.datetime.split(" ")[1]}`);
    });
  }, []);
  return (
    <div style={{ padding: "70px", textAlignLast: "center" }}>
      <img src={employee.imageUrl} />
      <Typography variant="h4">
        {employee.firstName} {employee.lastName}
      </Typography>
      <Typography variant="body1">{employee.title}</Typography>
      <Typography variant="body2">
        {employee.city}, {employee.country}
      </Typography>
      <Typography variant="body2">
        Timezone:{" "}
        {timezone ? timezone.split("/")[1]?.replace("_", " ") : "Loading..."}
      </Typography>
      <Typography variant="body2">
        Local Time: {localTime ? localTime : "Loading..."}
      </Typography>
      <br />
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel
        vehicula nisl. Ut mauris metus, fermentum nec orci nec, sagittis laoreet
        eros. Nam porta luctus mi, sodales aliquam nibh convallis ac. Nunc
        tempor malesuada lobortis. Pellentesque habitant morbi tristique
        senectus et netus et malesuada fames ac turpis egestas. Phasellus eu
        tristique enim. Sed id malesuada velit. Suspendisse ut nisi quis neque
        venenatis vestibulum id non ipsum. Aliquam aliquet dapibus nisi, ut
        tempor massa hendrerit ut. Sed efficitur ex posuere, interdum turpis a,
        maximus urna. Aenean sed sapien nec erat viverra lobortis cursus sit
        amet ex. Maecenas vel tempus mi, volutpat maximus tortor. Suspendisse
        tempus eget ligula id mattis. Nam porttitor mauris a accumsan convallis.
      </Typography>
    </div>
  );
};
