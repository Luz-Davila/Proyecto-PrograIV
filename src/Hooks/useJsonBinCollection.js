import { useCallback, useState } from "react";
import { requestJsonBin } from "../Lib/jsonbin";

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

function getErrorMessage(error, fallbackMessage) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallbackMessage
  );
}

export function useJsonBinCollection({
  selectItems,
  keyEnvNames = [],
  binIdEnvName,
  urlEnvName,
  fixedUrls = EMPTY_ARRAY,
  initialData = EMPTY_ARRAY,
  loadHeaders = EMPTY_OBJECT,
  saveHeaders = EMPTY_OBJECT,
  loadErrorMessage = "No se pudieron cargar los datos.",
  saveErrorMessage = "No se pudieron guardar los datos.",
}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const payload = await requestJsonBin({
        method: "get",
        keyEnvNames,
        binIdEnvName,
        urlEnvName,
        fixedUrls,
        headers: loadHeaders,
      });

      const items = selectItems(payload);
      setData(items);
      return items;
    } catch (loadError) {
      console.error(loadError);
      setError(getErrorMessage(loadError, loadErrorMessage));
      setData(initialData);
      return initialData;
    } finally {
      setLoading(false);
    }
  }, [
    keyEnvNames,
    binIdEnvName,
    urlEnvName,
    fixedUrls,
    initialData,
    loadHeaders,
    selectItems,
    loadErrorMessage,
  ]);

  const save = useCallback(async (nextData) => {
    setError("");

    try {
      await requestJsonBin({
        method: "put",
        keyEnvNames,
        binIdEnvName,
        urlEnvName,
        fixedUrls,
        data: nextData,
        headers: {
          "Content-Type": "application/json",
          ...saveHeaders,
        },
      });

      setData(nextData);
      return nextData;
    } catch (saveError) {
      console.error(saveError);
      setError(getErrorMessage(saveError, saveErrorMessage));
      throw saveError;
    }
  }, [
    keyEnvNames,
    binIdEnvName,
    urlEnvName,
    fixedUrls,
    saveHeaders,
    saveErrorMessage,
  ]);

  return {
    data,
    setData,
    loading,
    error,
    setError,
    reload: load,
    save,
  };
}