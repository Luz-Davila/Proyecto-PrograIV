import axios from "axios";

const API_KEY =
  "$2a$10$jjCVtnAWT4riuP29W1QgiejF4ac6UAypahXZjiSUEIqWIuZDcu5S.";

const BIN_ID =
  "6a0e3a336610dd3ae87b5435";

const URL =
  `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const headers = {
  "X-Master-Key": API_KEY,
};

export const obtenerAverias = async () => {

  try {

    const response = await axios.get(
      URL,
      {
        headers,
      }
    );

    return response.data.record.averias;

  } catch (error) {

    console.error(
      "Error obteniendo averías:",
      error
    );

    return [];
  }
};

export const agregarAveria = async (nuevaAveria) => {
  try {

    // OBTENER LOS DATOS ACTUALES
    const getResp = await axios.get(URL, { headers });
    const currentRecord = getResp.data.record || {};
    const actuales = Array.isArray(currentRecord.averias)
      ? currentRecord.averias
      : [];

    // GENERAR ID
    const maxId = actuales.reduce((max, a) => {
      const idNum = Number(a.id) || 0;
      return idNum > max ? idNum : max;
    }, 0);

    const nuevoId = maxId + 1 || Date.now();

    const averiaConId = {
      id: nuevoId,
      ...nuevaAveria,
      fecha: nuevaAveria.fecha || new Date().toISOString(),
    };

    const actualizado = [...actuales, averiaConId];

    // ACTUALIZAR EL BIN (PUT con el objeto completo)
    const putResp = await axios.put(
      URL,
      { averias: actualizado },
      {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      }
    );

    return putResp.data.record ? putResp.data.record.averias : actualizado;

  } catch (error) {

    console.error(
      "Error obteniendo averías para agregar:",
      error
    );
  }

  return null;
};