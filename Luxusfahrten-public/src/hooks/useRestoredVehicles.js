import { useEffect, useState } from "react";

export function useRestoredVehicles() {
  const [restoredCars, setRestoredCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/restoredVehicles")
      .then((res) => res.json())
      .then((data) => setRestoredCars(Array.isArray(data) ? data : []))
      .catch(() => setRestoredCars([]))
      .finally(() => setLoading(false));
  }, []);

  return { restoredCars, loading };
}