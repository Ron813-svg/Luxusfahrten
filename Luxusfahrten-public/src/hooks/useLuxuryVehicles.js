import { useEffect, useState } from "react";

export function useLuxuryVehicles() {
  const [luxuryCars, setLuxuryCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/vehicles")
      .then((res) => res.json())
      .then((data) => setLuxuryCars(Array.isArray(data) ? data : []))
      .catch(() => setLuxuryCars([]))
      .finally(() => setLoading(false));
  }, []);

  return { luxuryCars, loading };
}