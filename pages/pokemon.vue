<script setup>
const {currentPage, itemsPerPage, nextPage, prevPage} = usePagination();

const {pokemon} = fetchPokemon()

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return pokemon.value.slice(start, end);
})

;
</script>

<template>
  <div>
    <div v-for="pokemon in paginatedItems" :key="pokemon.id">
      <h2>{{ pokemon.name }}</h2>
      <img :src="pokemon.sprite" />
    </div>
  </div>
</template>
