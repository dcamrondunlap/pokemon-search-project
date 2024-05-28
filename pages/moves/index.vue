<script setup>
const {currentPage, itemsPerPage, nextPage, prevPage} = usePagination({itemsPerPage: 230});

const {moves, isLoading} = fetchMoves()

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
  <div>
    <div v-if="isLoading" class="text-center my-4">
      <Loading />
    </div>
    <div v-else class="grid grid-cols-3 lg:grid-cols-10">
      <div v-for="move in paginatedItems" :key="move.id">
        <NuxtLink :to="'/moves/' + move.id">
          <h2 class="font-bold my-2 mx-2 relative flex flex-col text-gray-700 bg-white bg-clip-border rounded-xl shadow-sm shadow-[#EC13BF] hover:bg-[#F040CC] ">
            {{ move.name.charAt(0).toUpperCase() + move.name.slice(1) }}
          </h2>
        </NuxtLink>
      </div>
    </div>
    <div class="flex justify-center space-x-6 mt-5">
      <button @click="prevPage" :disabled="currentPage === 1" class="text-zinc-100 bg-[#BC40F0] hover:bg-[#F040CC] text-base font-medium rounded-xl px-5 py-2.5 text-center">&lt;</button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="text-zinc-100 bg-[#BC40F0] hover:bg-[#F040CC] text-base font-medium rounded-xl px-5 py-2.5 text-center">&gt;</button>
    </div>
  </div>
</template>
