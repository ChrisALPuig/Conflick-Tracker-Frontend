const BASE_URL = "http://localhost:8080/api/v1"

export async function apiFetch(endpoint, options = {}) {

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  })

  if (!response.ok) {
    throw new Error("API Error")
  }

  if (response.status === 204) return null

  return response.json()
}