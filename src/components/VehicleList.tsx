import React from 'react';
import { Vehicle } from '../types/Vehicle';
import { format } from 'date-fns';
import { FaCar, FaCheck, FaSignOutAlt, FaTrash, FaCreditCard } from 'react-icons/fa';
import clsx from 'clsx';

interface VehicleListProps {
  vehicles: Vehicle[];
  onCheckout: (id: string) => void;
  onRemove: (id: string) => void;
  onPay: (id: string) => void;
  calculatePrice: (vehicle: Vehicle) => number;
}

export const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  onCheckout,
  onRemove,
  onPay,
  calculatePrice
}) => {
  if (vehicles.length === 0) {
    return (
      <div className="bg-gray-800 rounded-2xl p-8 shadow-xl animate-fade-in">
        <div className="text-center text-gray-400">
          <FaCar className="mx-auto text-5xl mb-4 opacity-50" />
          <p className="text-lg">Nenhum veículo registrado no momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead>
            <tr>
              <th className="table-header">Placa</th>
              <th className="table-header">Modelo</th>
              <th className="table-header">Entrada</th>
              <th className="table-header">Saída</th>
              <th className="table-header">Valor</th>
              <th className="table-header">Status</th>
              <th className="table-header">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {vehicles.map(vehicle => (
              <tr 
                key={vehicle.id}
                className="hover:bg-gray-700/50 transition-colors duration-200"
              >
                <td className="table-cell font-medium">{vehicle.plate}</td>
                <td className="table-cell">{vehicle.model}</td>
                <td className="table-cell">
                  {format(vehicle.entryTime, 'HH:mm:ss')}
                </td>
                <td className="table-cell">
                  {vehicle.exitTime ? format(vehicle.exitTime, 'HH:mm:ss') : '-'}
                </td>
                <td className="table-cell">
                  {vehicle.exitTime 
                    ? `R$ ${calculatePrice(vehicle).toFixed(2)}` 
                    : '-'
                  }
                </td>
                <td className="table-cell">
                  <span className={clsx(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
                    vehicle.paid
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  )}>
                    {vehicle.paid ? (
                      <>
                        <FaCheck className="text-xs" />
                        Pago
                      </>
                    ) : (
                      <>
                        <FaCreditCard className="text-xs" />
                        Pendente
                      </>
                    )}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="flex gap-2">
                    {!vehicle.exitTime && (
                      <button 
                        onClick={() => onCheckout(vehicle.id)}
                        className="btn btn-success"
                      >
                        <FaSignOutAlt />
                        Saída
                      </button>
                    )}
                    {vehicle.exitTime && !vehicle.paid && (
                      <button 
                        onClick={() => onPay(vehicle.id)}
                        className="btn btn-primary"
                      >
                        <FaCreditCard />
                        Pagar
                      </button>
                    )}
                    {vehicle.paid && (
                      <button 
                        onClick={() => onRemove(vehicle.id)}
                        className="btn btn-danger"
                      >
                        <FaTrash />
                        Remover
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
