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
  <div>
    <div v-if="isLoading" class="text-center my-4">
      <LoadingSpinner />
    </div>
    <div v-else>
      <div class="grid grid-cols-3 lg:grid-cols-10 p-6">
        <div v-for="pokemon in paginatedItems" :key="pokemon.id" class="flex justify-center">
          <NuxtLink :to="'/pokemon/' + pokemon.id">
            <h2 class="text-center">{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</h2>
            <img :src="pokemon.sprite" />
          </NuxtLink>
        </div>
      </div>
      <div class="flex justify-center space-x-6 mt-5">
        <button @click="prevPage" :disabled="currentPage === 1" class="text-zinc-100 bg-[#BC40F0] hover:bg-[#F040CC] text-base font-medium rounded-xl px-5 py-2.5 text-center">&lt;</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="text-zinc-100 bg-[#BC40F0] hover:bg-[#F040CC] text-base font-medium rounded-xl px-5 py-2.5 text-center">></button>
      </div>
    </div>
  </div>
</template>
