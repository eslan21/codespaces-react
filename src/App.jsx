import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';

const people = [
  { id: 1, name: 'Freddy' },
  { id: 2, name: 'Adrian' },
  { id: 3, name: 'Sonnya' },
  { id: 4, name: 'Roxana' },
  { id: 5, name: 'Alexa' },
];

// Función para calcular el número de semana (lunes como primer día)
const getWeekNumber = (date) => {
  const target = new Date(date.valueOf());
  
  // Ajustar al lunes de la semana actual
  const dayOfWeek = target.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Si es domingo, retroceder 6 días
  target.setDate(target.getDate() + diff);
  
  // Obtener el primer lunes del año
  const yearStart = new Date(target.getFullYear(), 0, 1);
  const firstMonday = new Date(yearStart);
  const firstDayOfWeek = yearStart.getDay();
  const daysUntilMonday = firstDayOfWeek === 0 ? 1 : (8 - firstDayOfWeek) % 7;
  firstMonday.setDate(yearStart.getDate() + daysUntilMonday);
  
  // Calcular diferencia en semanas
  const weeksDiff = Math.floor((target - firstMonday) / (7 * 24 * 60 * 60 * 1000));
  
  return weeksDiff + 1;
};

function App() {
  const [currentDate, setCurrentDate] = useState(new Date()); // 6 de Octubre de 2025

  // Memoizar cálculos costosos
  const weekNumber = useMemo(() => getWeekNumber(currentDate), [currentDate]);
  
  const responsibleIndex = useMemo(() => 
    (weekNumber - 1) % people.length, 
    [weekNumber]
  );

  const currentResponsible = useMemo(() => 
    people[responsibleIndex], 
    [responsibleIndex]
  );

  const nextResponsible = useMemo(() => 
    people[(responsibleIndex + 1) % people.length], 
    [responsibleIndex]
  );

  return (
    <div className="flex lg:h-screen w-screen bg-gray-100 font-sans flex-col-reverse lg:flex-row">
      <Sidebar people={people} responsibleIndex={responsibleIndex} />
      
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Asignación de Responsables
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Semana Actual</h2>
            <span className="text-sm text-gray-500" aria-label={`Semana ${weekNumber}`}>
              Semana {weekNumber}
            </span>
          </header>

          <div className="flex flex-col items-center mb-8">
            <span className="text-gray-500 text-sm mb-1">Responsable</span>
            <span className="text-4xl font-bold text-blue-600">
              {currentResponsible.name}
            </span>
          </div>

          <Calendar currentDate={currentDate} />

          <footer className="text-center mt-6">
            <p className="text-gray-500 text-sm">Próximo responsable</p>
            <p className="text-lg font-semibold text-gray-700 mt-1">
              {nextResponsible.name}
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;