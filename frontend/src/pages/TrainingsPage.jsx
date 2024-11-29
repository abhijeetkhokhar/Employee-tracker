import { useState, useEffect } from "react";
import TrainingList from "../components/TrainingList";
import TrainingForm from "../components/TrainingForm";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedTrainings = loadFromLocalStorage("trainings") || [];
    setTrainings(savedTrainings);
  }, []);

  const handleAddTraining = (training) => {
    const newTraining = {
      ...training,
      id: Date.now().toString(),
    };
    const updatedTrainings = [...trainings, newTraining];
    setTrainings(updatedTrainings);
    saveToLocalStorage("trainings", updatedTrainings);
    setShowForm(false);
  };

  const handleUpdateTraining = (updatedTraining) => {
    const updatedTrainings = trainings.map((training) =>
      training.id === updatedTraining.id ? updatedTraining : training
    );
    setTrainings(updatedTrainings);
    saveToLocalStorage("trainings", updatedTrainings);
    setSelectedTraining(null);
    setShowForm(false);
  };

  const handleDeleteTraining = (id) => {
    const updatedTrainings = trainings.filter((training) => training.id !== id);
    setTrainings(updatedTrainings);
    saveToLocalStorage("trainings", updatedTrainings);
  };

  const handleEditTraining = (training) => {
    setSelectedTraining(training);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Trainings</h1>
        <button
          onClick={() => {
            setSelectedTraining(null);
            setShowForm(true);
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add Training
        </button>
      </div>

      {showForm ? (
        <TrainingForm
          training={selectedTraining}
          onSubmit={selectedTraining ? handleUpdateTraining : handleAddTraining}
          onCancel={() => {
            setShowForm(false);
            setSelectedTraining(null);
          }}
        />
      ) : (
        <TrainingList
          trainings={trainings}
          onEdit={handleEditTraining}
          onDelete={handleDeleteTraining}
        />
      )}
    </div>
  );
}
