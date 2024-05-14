<script setup>
const {currentPage, itemsPerPage, nextPage, prevPage} = usePagination();

const {items} = fetchItems();

const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage.value));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return items.value.slice(start, end);
});



</script>

<template>
  <div class="grid grid-cols-12 min-[360px]:grid-cols-2 min-[360px]:ml-8 max-[600px]:grid-cols-2 max-[600px]::ml-8">
    <div v-for="item in paginatedItems" :key="item.id" class="relative flex flex-col mt-2 text-gray-700 bg-white  bg-clip-border rounded-xl w-32 shadow-sm shadow-[#EC13BF] hover:bg-[#F040CC]">
      <h2>{{ item.name }}</h2>
      <img :src="item.sprite"  />
    </div>
    <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
    <button @click="nextPage" :disabled="currentPage === totalPages">></button>
  </div>
</template>
