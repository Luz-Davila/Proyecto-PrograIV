import axios from "axios";

export function cleanValue(value) {
  return value
    ?.toString()
    .trim()
    .replace(/^['"\s]+|['"\s]+$/g, "")
    .replace(/\\\$/g, "$")
    .replace(/\\(["'])/g, "$1")
    .replace(/\\\\/g, "\\");
}

export function resolveKey(envNames = []) {
  const candidates = envNames
    .map((name) => cleanValue(import.meta.env[name]))
    .filter((value) => value && value.trim() !== "");

  const key = candidates[0];

  if (!key) {
    throw new Error("Falta la clave de autenticación para JSONBin");
  }

  return key;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

export function resolveUrls({ binIdEnvName, urlEnvName, fixedUrls = [] }) {
  const candidates = [...fixedUrls];
  const rawId = cleanValue(import.meta.env[binIdEnvName]);

  if (rawId) {
    candidates.push(`https://api.jsonbin.io/v3/b/${rawId}`);
  }

  const rawUrl = cleanValue(import.meta.env[urlEnvName]);

  if (rawUrl) {
    candidates.push(rawUrl.replace(/\/+$/, ""));
  }

  return unique(candidates);
}

export function expandFetchUrls(urls) {
  return urls.flatMap((base) =>
    base.endsWith("/latest") ? [base] : [base, `${base}/latest`]
  );
}

export async function requestJsonBin({
  method = "get",
  keyEnvNames = [],
  binIdEnvName,
  urlEnvName,
  fixedUrls = [],
  data,
  headers = {},
}) {
  const key = resolveKey(keyEnvNames);
  const baseUrls = fixedUrls.length > 0
    ? fixedUrls
    : resolveUrls({ binIdEnvName, urlEnvName, fixedUrls });
  const requestUrls = method.toLowerCase() === "get"
    ? expandFetchUrls(baseUrls)
    : baseUrls;

  let lastError = null;

  for (const url of requestUrls) {
    try {
      const response = await axios.request({
        method,
        url,
        data,
        headers: {
          "X-Master-Key": key,
          ...headers,
        },
      });

      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("No se pudo completar la solicitud a JSONBin");
}