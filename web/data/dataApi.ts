import { employees } from "./employees";
import { kudos } from "./kudos";

export const getEmployees = () => {
  // return employees.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
  return employees;
};

export const getEmployeeById = (id: number) => {
  return employees.find((e) => e.id === id);
};

export const getKudos = () => {
  return kudos;
};
