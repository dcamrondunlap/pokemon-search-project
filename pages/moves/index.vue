<script setup>
const {currentPage, itemsPerPage, nextPage, prevPage} = usePagination({itemsPerPage: 400});

const {moves} = fetchMoves()

const sortedMoves = computed(() => {
  return moves.value.sort((a, b) => a.name.localeCompare(b.name))
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedMoves.value.slice(start, end);
})



;
</script>

<template>
  <div class="grid grid-cols-3 lg:grid-cols-10">
    <div v-for="moves in paginatedItems" :key="moves.id">
      <h2 class="font-bold my-2 mx-2 relative flex flex-col text-gray-700 bg-white  bg-clip-border rounded-xl shadow-sm shadow-[#EC13BF] hover:bg-[#F040CC] ">{{ moves.name.charAt(0).toUpperCase() + moves.name.slice(1) }}</h2>
    </div>
    <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
    <button @click="nextPage" :disabled="currentPage === totalPages">></button>
  </div>
</template>
