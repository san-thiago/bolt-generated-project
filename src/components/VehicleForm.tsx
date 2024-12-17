import React, { useState } from 'react';
import { FaCar, FaIdCard } from 'react-icons/fa';

interface VehicleFormProps {
  onSubmit: (plate: string, model: string) => void;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({ onSubmit }) => {
  const [plate, setPlate] = useState('');
  const [model, setModel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (plate && model) {
      onSubmit(plate.toUpperCase(), model);
      setPlate('');
      setModel('');
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl mb-8 animate-fade-in">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <div className="input-group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FaIdCard />
          </div>
          <input
            type="text"
            placeholder="Placa do Veículo"
            className="input"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            pattern="[A-Za-z0-9]{7}"
            title="Digite uma placa válida (7 caracteres)"
            required
          />
        </div>
        
        <div className="input-group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FaCar />
          </div>
          <input
            type="text"
            placeholder="Modelo do Veículo"
            className="input"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          <FaCar />
          Registrar Entrada
        </button>
      </form>
    </div>
  );
};
