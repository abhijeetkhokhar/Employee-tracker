import { useState, useEffect } from "react";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedEmployees = loadFromLocalStorage("employees") || [];
    setEmployees(savedEmployees);
  }, []);

  const handleAddEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now().toString(),
    };
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    saveToLocalStorage("employees", updatedEmployees);
    setShowForm(false);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    setEmployees(updatedEmployees);
    saveToLocalStorage("employees", updatedEmployees);
    setSelectedEmployee(null);
    setShowForm(false);
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
    saveToLocalStorage("employees", updatedEmployees);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button
          onClick={() => {
            setSelectedEmployee(null);
            setShowForm(true);
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>

      {showForm ? (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={selectedEmployee ? handleUpdateEmployee : handleAddEmployee}
          onCancel={() => {
            setShowForm(false);
            setSelectedEmployee(null);
          }}
        />
      ) : (
        <EmployeeList
          employees={employees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />
      )}
    </div>
  );
}
