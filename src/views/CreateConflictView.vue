<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import ConflictForm from "../components/ConflictForm.vue"
import { apiFetch } from "../services/api.js"

const router = useRouter()
const countries = ref([]) 
const conflicts = ref([])

onMounted(async () => {
  try {
    conflicts.value = await apiFetch("/conflicts")
    const allCountries = conflicts.value.flatMap(c => c.countries || [])
    const uniqueCountriesMap = new Map()
    allCountries.forEach(c => {
      if (!uniqueCountriesMap.has(c.code)) uniqueCountriesMap.set(c.code, { code: c.code, name: c.name })
    })
    countries.value = Array.from(uniqueCountriesMap.values())
  } catch (err) {
    console.error(err)
    alert("Failed to load countries")
  }
})

const handleCreateConflict = async (payload) => {
  try {
    await apiFetch("/conflicts", { method: "POST", body: JSON.stringify(payload) })
    alert("Conflict created successfully!")
    router.push("/")
  } catch (err) {
    console.error(err)
    alert("Error creating conflict")
  }
}
</script>

<template>
  <div class="create-conflict-view">
    <div class="form-card">
      <h2>Create New Conflict</h2>
      <ConflictForm :countries="countries" @submit="handleCreateConflict" />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

/* Fondo general */
.create-conflict-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f0ff, #f9fafb);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 3rem;
  font-family: 'Inter', sans-serif;
}

/* Tarjeta del formulario */
.form-card {
  background-color: #fff;
  border-radius: 16px;
  padding: 3rem 2rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  transition: transform 0.25s, box-shadow 0.25s;
}

.form-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 35px rgba(0,0,0,0.12);
}

/* Título */
.form-card h2 {
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
}

/* Inputs y selects con estilo moderno */
input,
select,
textarea {
  width: 100%;
  padding: 14px 18px;
  margin-top: 8px;
  margin-bottom: 20px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  background-color: #fefefe;
  transition: all 0.25s ease-in-out;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.03);
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 10px rgba(59,130,246,0.3);
  background-color: #fff;
}

/* Floating labels */
.form-group {
  position: relative;
  margin-bottom: 25px;
}

.form-group label {
  position: absolute;
  top: 14px;
  left: 18px;
  color: #6b7280;
  font-size: 0.95rem;
  pointer-events: none;
  transition: 0.2s ease all;
}

input:focus + label,
input:not(:placeholder-shown) + label,
textarea:focus + label,
textarea:not(:placeholder-shown) + label,
select:focus + label,
select:not([value=""]) + label {
  top: -10px;
  left: 12px;
  font-size: 0.75rem;
  color: #3b82f6;
  background: #fff;
  padding: 0 4px;
}

/* Multi-select tipo chips (para países) */
select[multiple] {
  height: auto;
  min-height: 60px;
  padding: 10px;
}

/* Botón grande y moderno */
button[type="submit"] {
  padding: 14px 26px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  color: white;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s;
}

button[type="submit"]:hover {
  background: linear-gradient(90deg, #2563eb, #1d4ed8);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Errores */
.error {
  color: #ef4444;
  font-size: 0.85rem;
  text-align: left;
  margin-top: -12px;
  margin-bottom: 12px;
}
</style>