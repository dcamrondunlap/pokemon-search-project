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
  <div class="grid grid-cols-2 justify-items-center sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-10 ">
    <div v-for="item in paginatedItems" :key="item.id" class="relative flex flex-col mt-2  text-gray-700 bg-white  bg-clip-border rounded-xl w-32 shadow-sm shadow-[#EC13BF] hover:bg-[#F040CC]">
      <h2>{{ item.name }}</h2>
      <img :src="item.sprite"  />
    </div>
    <button @click="prevPage" :disabled="currentPage === 1" class="text-zinc-100 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 mt-5">&lt;</button>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2  dark:focus:ring-yellow-900 my-5 mx-24">></button>
  </div>
</template>
