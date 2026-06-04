import { useJsonBinCollection } from "./useJsonBinCollection";

const ABONADOS_URL = "https://api.jsonbin.io/v3/b/6a05c1c6c0954111d82171f8";
const ABONADOS_URLS = [ABONADOS_URL];
const ABONADOS_KEY_ENVS = ["VITE_JSONBIN_MASTER_KEY"];

export function useAbonados() {
  return useJsonBinCollection({
    keyEnvNames: ABONADOS_KEY_ENVS,
    fixedUrls: ABONADOS_URLS,
    selectItems: (payload) => payload?.record || [],
    loadErrorMessage: "No se pudieron cargar los abonados.",
    saveErrorMessage: "No se pudieron guardar los abonados.",
  });
}