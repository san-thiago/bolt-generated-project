import React from 'react';
import { VehicleForm } from './components/VehicleForm';
import { VehicleList } from './components/VehicleList';
import { useParking } from './hooks/useParking';
import { FaParking } from 'react-icons/fa';

const App: React.FC = () => {
  const {
    vehicles,
    addVehicle,
    removeVehicle,
    checkoutVehicle,
    calculatePrice,
    markAsPaid
  } = useParking();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 animate-slide-up">
          <div className="flex items-center justify-center gap-4 mb-4">
            <FaParking className="text-5xl text-primary-500" />
            <h1 className="text-4xl font-bold text-white">
              Sistema de Estacionamento
            </h1>
          </div>
          <p className="text-xl text-gray-400">
            Gerencie seu estacionamento de forma simples e eficiente
          </p>
        </header>

        <VehicleForm onSubmit={addVehicle} />
        <VehicleList
          vehicles={vehicles}
          onCheckout={checkoutVehicle}
          onRemove={removeVehicle}
          onPay={markAsPaid}
          calculatePrice={calculatePrice}
        />
      </div>
    </div>
  );
};

export default App;
