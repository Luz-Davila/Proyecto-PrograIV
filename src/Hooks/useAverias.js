import { useJsonBinCollection } from "./useJsonBinCollection";

const AVERIAS_URL = "https://api.jsonbin.io/v3/b/6a0cfcf66610dd3ae8725473";
const AVERIAS_URLS = [AVERIAS_URL];
const AVERIAS_KEY_ENVS = ["VITE_JSON_MASTER_KEY"];

export function useAverias() {
  return useJsonBinCollection({
    keyEnvNames: AVERIAS_KEY_ENVS,
    fixedUrls: AVERIAS_URLS,
    selectItems: (payload) => payload?.record || [],
    loadErrorMessage: "Error al cargar las averías.",
    saveErrorMessage: "No se pudo guardar la avería.",
  });
}
