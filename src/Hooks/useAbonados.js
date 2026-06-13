import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = "https://localhost:7098/api/abonados";

export function useAbonados() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch {
      setError("No se pudieron cargar los abonados.");
    } finally {
      setLoading(false);
    }
  }, []);

  const save = useCallback(async (abonado, id = null) => {
    if (id) {
      await axios.put(`${API_URL}/${id}`, abonado);
    } else {
      await axios.post(API_URL, abonado);
    }
  }, []);

  return { data, setData, loading, error, save, reload };
}