<script setup>
import { onMounted } from "vue"
import { useConflictStore } from "../stores/conflictStore"

const store = useConflictStore()

onMounted(() => {
  store.fetchConflicts()
})
</script>

<template>
  <div v-if="store.loading" class="loading">
    Loading conflicts...
  </div>

  <div v-else class="conflict-list">
    <div 
      v-for="conflict in store.conflicts" 
      :key="conflict.id" 
      class="conflict-card"
    >
      <h3>{{ conflict.name }}</h3>
      <p>Status: {{ conflict.status }}</p>

      <router-link 
        :to="`/conflicts/${conflict.id}`" 
        class="details-button"
      >
        Ver detalles
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.loading {
  text-align: center;
  margin-top: 2rem;
}

.conflict-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.conflict-card {
  margin-bottom: 2rem;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
  width: 300px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.details-button {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  background-color: #3490dc;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}

.details-button:hover {
  background-color: #1d6fa5;
}
</style>