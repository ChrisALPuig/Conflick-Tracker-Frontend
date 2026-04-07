<script setup>
const props = defineProps({
  conflict: Object
})

const emit = defineEmits(["delete"])
</script>

<template>

<div class="card">

  <h3>{{ conflict.name }}</h3>

  <p>{{ conflict.countryCode }}</p>

  <img :src="`https://flagsapi.com/${conflict.countryCode}/flat/32.png`">

  <span
    :class="conflict.status === 'ACTIVE' ? 'active' : 'ended'"
  >
    {{ conflict.status }}
  </span>

  <router-link :to="`/conflicts/${conflict.id}`">
    Details
  </router-link>

  <button @click="emit('delete')">
    Delete
  </button>

</div>

</template>