import React from 'react';

function Sidebar({ people, responsibleIndex }) {
  return (
    <div className="lg:w-64 bg-white p-6 shadow-md rounded-tr-xl rounded-br-xl">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Responsables</h2>
      <div className="border-b border-gray-200 pb-4 mb-4">
        <p className="text-gray-500 text-sm mb-2">Lista de Personas</p>
        <ul className="space-y-2">
          {people.map((person, index) => (
            <li
              key={person.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                index === responsibleIndex ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <span className="font-medium">{person.name}</span>
              {index === responsibleIndex && (
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-700 text-white">Actual</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;