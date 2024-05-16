<script setup>
const {currentPage, itemsPerPage, nextPage, prevPage} = usePagination();

const {moves} = fetchMoves()

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return moves.value.slice(start, end);
})

;
</script>

<template>
  <div class="grid grid-cols-3 lg:grid-cols-10">
    <div v-for="moves in paginatedItems" :key="moves.id">
      <h2 class="font-bold hover:text-blue-800 text-white">{{ moves.name.charAt(0).toUpperCase() + moves.name.slice(1) }}</h2>
    </div>
    <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
    <button @click="nextPage" :disabled="currentPage === totalPages">></button>
  </div>
</template>
