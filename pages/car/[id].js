import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';

export default function CarDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/cars.json`).then((response) => {
        const selectedCar = response.data.find((c) => c.id === id);
        setCar(selectedCar);
      });
    }
  }, [id]);

  if (!car) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <img src={car.image} alt={car.name} className="w-full h-60 object-cover rounded" />
      <h1 className="text-xl font-bold">{car.name}</h1>
      <p>Brand: {car.brand}</p>
      <p>Price: ${car.price}</p>
      <p>Fuel Type: {car.fuelType}</p>
      <p>Seating Capacity: {car.seatingCapacity}</p>
    </div>
  );
}
