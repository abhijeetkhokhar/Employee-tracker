import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadFromLocalStorage } from "../utils/localStorage";
import DashboardStats from "../components/DashboardStats";
import DashboardEmployeeList from "../components/DashboardEmployeeList";
import DashboardTrainingList from "../components/DashboardTrainingList";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeTrainings: 0,
    completedTrainings: 0,
    complianceRate: 0,
  });
  const [employees, setEmployees] = useState([]);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const savedEmployees = loadFromLocalStorage("employees") || [];
    const savedTrainings = loadFromLocalStorage("trainings") || [];

    const completedTrainings = savedTrainings.filter(
      (t) => t.status === "completed"
    ).length;
    const activeTrainings = savedTrainings.filter(
      (t) => t.status === "in-progress"
    ).length;
    const complianceRate =
      savedTrainings.length > 0
        ? Math.round((completedTrainings / savedTrainings.length) * 100)
        : 0;

    setStats({
      totalEmployees: savedEmployees.length,
      activeTrainings,
      completedTrainings,
      complianceRate,
    });
    setEmployees(savedEmployees);
    setTrainings(savedTrainings);
  }, []);

  const handleEditEmployee = (employee) => {
    navigate("/employees", { state: { editEmployee: employee } });
  };

  const handleEditTraining = (training) => {
    navigate("/trainings", { state: { editTraining: training } });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <DashboardStats stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardEmployeeList
          employees={employees}
          onEdit={handleEditEmployee}
        />
        <DashboardTrainingList
          trainings={trainings}
          onEdit={handleEditTraining}
        />
      </div>
    </div>
  );
}
