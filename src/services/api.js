const BASE_URL = import.meta.env.VITE_API_URL + "/api/v1";

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    // Mejor manejo de errores (evita contaminar estado)
    const errorText = await response.text();
    throw new Error(errorText || "API Error");
  }

  if (response.status === 204) return null;

  return response.json();
}