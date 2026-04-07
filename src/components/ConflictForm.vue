<script setup>
import { ref } from "vue"

// Recibimos los países desde la página padre
const props = defineProps({
  countries: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(["submit"])

// Campos del formulario
const name = ref("")
const startDate = ref("")
const status = ref("ACTIVE")
const description = ref("")
const selectedCountries = ref([])

// Validación simple
const errors = ref({})

const handleSubmit = () => {
  errors.value = {}

  if (!name.value) errors.value.name = "Name is required"
  if (!startDate.value) errors.value.startDate = "Start date is required"
  if (selectedCountries.value.length === 0) errors.value.countryCodes = "Select at least one country"

  if (Object.keys(errors.value).length > 0) return

  emit("submit", {
    name: name.value,
    startDate: startDate.value,
    status: status.value,
    description: description.value,
    countryCodes: selectedCountries.value
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="conflict-form">

    <div class="form-group">
      <input id="name" type="text" v-model="name" placeholder=" " />
      <label for="name">Conflict Name</label>
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>

    <div class="form-group">
      <input id="startDate" type="date" v-model="startDate" placeholder=" " />
      <label for="startDate">Start Date</label>
      <span v-if="errors.startDate" class="error">{{ errors.startDate }}</span>
    </div>

    <div class="form-group">
      <select id="status" v-model="status">
        <option value="ACTIVE">ACTIVE</option>
        <option value="FROZEN">FROZEN</option>
        <option value="ENDED">ENDED</option>
      </select>
      <label for="status">Status</label>
    </div>

    <div class="form-group">
      <textarea id="description" v-model="description" placeholder=" "></textarea>
      <label for="description">Description (optional)</label>
    </div>

    <div class="form-group">
      <select id="countries" v-model="selectedCountries" multiple>
        <option v-for="c in props.countries" :key="c.code" :value="c.code">
          {{ c.name }}
        </option>
      </select>
      <label for="countries">Countries</label>
      <span v-if="errors.countryCodes" class="error">{{ errors.countryCodes }}</span>
    </div>

    <button type="submit">Create Conflict</button>
  </form>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.conflict-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Inter', sans-serif;
}

.form-group {
  position: relative;
  margin-bottom: 25px;
}

input, select, textarea {
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  background-color: #fefefe;
  transition: all 0.25s ease-in-out;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.03);
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 10px rgba(59,130,246,0.3);
  background-color: #fff;
}

label {
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

select[multiple] {
  height: auto;
  min-height: 60px;
  padding: 10px;
}

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

.error {
  color: #ef4444;
  font-size: 0.85rem;
  text-align: left;
  margin-top: -12px;
  margin-bottom: 12px;
}
</style>