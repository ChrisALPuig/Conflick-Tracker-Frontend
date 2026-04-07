<script setup>
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useConflictStore } from "../stores/conflictStore"

const route = useRoute()
const router = useRouter()
const store = useConflictStore()

const conflict = ref(null)

onMounted(async () => {
  conflict.value = await store.fetchConflictById(route.params.id)
})

// Función para volver a la página anterior
const goBack = () => {
  router.back()
}
</script>

<template>
  <div v-if="conflict" class="conflict-detail">

    <h2>{{ conflict.name }}</h2>

    <p>Status: {{ conflict.status }}</p>

    <p>Start Date: {{ conflict.startDate }}</p>

    <p>{{ conflict.description }}</p>

    <div v-if="conflict.countries && conflict.countries.length" class="countries">
      <h3>Countries:</h3>
      <ul>
        <li v-for="country in conflict.countries" :key="country.id">
          {{ country.name }} ({{ country.code }})
        </li>
      </ul>
    </div>
     <button @click="goBack" class="back-button">← Volver</button>
  </div>
</template>

<style scoped>
.conflict-detail {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
}

.back-button {
  margin-bottom: 1rem;
  padding: 0.4rem 0.8rem;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #1d6fa5;
}

.countries ul {
  list-style-type: none;
  padding: 0;
}

.countries li {
  margin-bottom: 0.3rem;
}
</style>