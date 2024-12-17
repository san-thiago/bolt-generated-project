import { useState, useEffect } from 'react';
import { Vehicle } from '../types/Vehicle';
import { differenceInMinutes } from 'date-fns';

const PRICE_PER_HOUR = 10;
const STORAGE_KEY = 'parking-vehicles';

export const useParking = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored, (key, value) => {
      if (key === 'entryTime' || key === 'exitTime') {
        return value ? new Date(value) : null;
      }
      return value;
    }) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  }, [vehicles]);

  const addVehicle = (plate: string, model: string) => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      plate,
      model,
      entryTime: new Date(),
      paid: false
    };
    setVehicles(prev => [...prev, newVehicle]);
  };

  const removeVehicle = (id: string) => {
    setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
  };

  const checkoutVehicle = (id: string) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === id ? { ...vehicle, exitTime: new Date() } : vehicle
    ));
  };

  const calculatePrice = (vehicle: Vehicle): number => {
    if (!vehicle.exitTime) return 0;
    const minutes = differenceInMinutes(vehicle.exitTime, vehicle.entryTime);
    const hours = Math.ceil(minutes / 60);
    return hours * PRICE_PER_HOUR;
  };

  const markAsPaid = (id: string) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === id ? { ...vehicle, paid: true } : vehicle
    ));
  };

  return {
    vehicles,
    addVehicle,
    removeVehicle,
    checkoutVehicle,
    calculatePrice,
    markAsPaid
  };
};
