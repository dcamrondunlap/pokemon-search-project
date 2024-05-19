<script setup>
const {currentPage, itemsPerPage, nextPage, prevPage} = usePagination(100);

const {pokemon} = fetchPokemon()

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return pokemon.value.slice(start, end);
})

;
</script>

<template>
  <div class="grid grid-cols-3 lg:grid-cols-10">
    <div v-for="pokemon in paginatedItems" :key="pokemon.id">
      <NuxtLink :to="'/pokemon/' + pokemon.id">
        <h2>{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</h2>
      <img :src="pokemon.sprite" />
      </NuxtLink>
    </div>
    <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
    <button @click="nextPage" :disabled="currentPage === totalPages">></button>
  </div>
</template>
