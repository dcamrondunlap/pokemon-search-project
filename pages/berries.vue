<script setup>
const berries = ref([]);

(async () => {
  const response = await fetch("https://pokeapi.co/api/v2/berry/?limit=64");
  const { results } = await response.json();
  berries.value = results;
})();
</script>

<template>
  <div>
    <div v-for="(berry, i) in berries" :key="i">
      {{ berry.name }}
    </div>
  </div>
</template>
