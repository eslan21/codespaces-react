import React from 'react';

function Calendar({ currentDate }) {
  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - (currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1));

  const weekDays = daysOfWeek.map((day, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    const isToday = date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth();

    return (
      <div
        key={index}
        className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 ${
          isToday ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        <span className="text-sm font-semibold mb-1">{day}</span>
        <span className="text-xl font-bold">{date.getDate()}</span>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-7 gap-4 text-center">
      {weekDays}
    </div>
  );
}

export default Calendar;