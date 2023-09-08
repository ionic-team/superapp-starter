import { employees } from "./employees";
import { kudos } from "./kudos";

export const getEmployees = () => {
  return employees.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
};

export const getEmployeeById = (id: number) => {
  return employees[id];
};

export const getKudos = () => {
  return kudos;
};
