import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import { employeeContext } from "../../App";
import axios from "axios";
import { Employee } from "../../Modules/Employee";

export const MapComponent = (): JSX.Element => {
  const { employees, setEmployees } = useContext(employeeContext);
  const [citiesAndEmployees, setCitiesAndEmployees] = useState<
    Array<{
      names: string[];
      city: string;
      center: {
        lat: number;
        lng: number;
      };
    }>
  >([]);

  useEffect(() => {
    if (employees.length === 0) {
      axios
        .get<Array<Employee>>("http://localhost:3030/api/employees/")
        .then(({ data }) => {
          setEmployees(data);
        });
    }
  }, []);
  useEffect(() => {
    const cities = employees.map((employee) => employee.city);
    const citiesCoordinatesPromises = cities.map(async (city) => {
      return axios<{
        name: string;
        latitude: number;
        longitude: number;
        country: string;
        population: number;
        is_capital: boolean;
      }>({
        method: "get",
        url: `https://api.api-ninjas.com/v1/city?name=${city}`,
        headers: { "X-Api-Key": "Cz0zWhhmWLR56Q+Zdp+sdw==5gX0cML8aJZTA3Ph" },
      }).then(({ data }) => {
        return { city, center: { lat: data.latitude, lng: data.longitude } };
      });
    });
    Promise.all(citiesCoordinatesPromises).then((results) => {
      setCitiesAndEmployees(
        results.map((result) => {
          const employeesInCity = employees.filter(
            (employee) => result.city === employee.city
          );
          return {
            ...result,
            names: employeesInCity.map(
              (employee) => `${employee.firstName} ${employee.lastName}`
            ),
          };
        })
      );
    });
  }, [employees]);

  return (
    <MapContainer
      center={{ lat: 0, lng: 0 }}
      zoom={2}
      scrollWheelZoom={false}
      style={{ width: "1000px", height: "700px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {citiesAndEmployees.map((cityWithEmployees) => {
        return (
          <>
            <Marker position={cityWithEmployees.center}>
              <Popup>
                City: {cityWithEmployees.city}
                Employees: {cityWithEmployees.names.join(", ")}
              </Popup>
            </Marker>
          </>
        );
      })}
    </MapContainer>
  );
};
