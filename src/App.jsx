import './App.css';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';

const people = [
  { id: 1, name: 'Ana García' },
  { id: 2, name: 'Carlos Rodríguez' },
  { id: 3, name: 'María López' },
];

function App() {
  const [responsibleIndex, setResponsibleIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Calcular el responsable basándose en la semana del año
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const diff = currentDate - startOfYear;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const weekNumber = Math.floor(diff / oneWeek);

    // Rotar el responsable
    setResponsibleIndex(weekNumber % people.length);
  }, [currentDate]);

  const nextResponsibleName = people[(responsibleIndex + 1) % people.length].name;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar people={people} responsibleIndex={responsibleIndex} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Asignación de Responsables</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Semana Actual</h2>
            <span className="text-sm text-gray-500">
              Semana {Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24 * 7)) + 1}
            </span>
          </div>

          <div className="flex flex-col items-center mb-8">
            <span className="text-gray-500 text-sm mb-1">Responsable</span>
            <span className="text-4xl font-bold text-blue-600">
              {people[responsibleIndex].name}
            </span>
          </div>
          <Calendar currentDate={currentDate} />
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Próximo responsable desde el {new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).getDate()} de {new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleString('es-ES', { month: 'long' })}
            </p>
            <p className="text-lg font-semibold text-gray-700 mt-1">{nextResponsibleName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;