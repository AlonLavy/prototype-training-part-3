import { Dispatch, SetStateAction, createContext, useState } from "react";
import "./App.css";
import { EmployeeCardsContainer } from "./Components/Employees/EmployeeCardsContainer/EmployeeCardsContainer";
import { Employee } from "./Modules/Employee";
import { MapComponent } from "./Components/Map/MapComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const employeeContext = createContext<{
  employees: Array<Employee>;
  setEmployees: Dispatch<SetStateAction<Array<Employee>>>;
}>({ employees: [], setEmployees: () => {} });

const App = () => {
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  return (
    <employeeContext.Provider value={{ employees, setEmployees }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<EmployeeCardsContainer />} />
          <Route path="map" element={<MapComponent />} />
        </Routes>
      </BrowserRouter>
    </employeeContext.Provider>
  );
};

export default App;
