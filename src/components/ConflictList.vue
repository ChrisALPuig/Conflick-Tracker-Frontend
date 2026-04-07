<script setup>
import ConflictCard from "./ConflictCard.vue"

const props = defineProps({
  conflicts: Array
})

const emit = defineEmits(["delete"])
</script>

<template>
  <div>

    <p v-if="conflicts.length === 0">
      No conflicts found
    </p>

    <ConflictCard
      v-for="conflict in conflicts"
      :key="conflict.id"
      :conflict="conflict"
      @delete="emit('delete', conflict.id)"
    />

  </div>
</template>