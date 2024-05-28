<script setup>
const {currentPage, itemsPerPage, nextPage, prevPage} = usePagination({itemsPerPage: 170});

const {items} = fetchItems();
console.log('items:', items.value)

const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage.value));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return items.value.slice(start, end);
});

console.log('item.id:', items.value.id)

;

</script>

<template>
  <div>
    <div v-if="isLoading" class="text-center my-4">
      <Loading />
    </div>
    <div v-else>
      <div class="grid grid-cols-2 justify-items-center mt-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-10">
        <div v-for="item in paginatedItems" :key="item.id" class="relative flex flex-col justify-center mt-2 text-gray-700 bg-white bg-clip-border rounded-xl w-32 shadow-sm shadow-[#EC13BF] hover:bg-[#F040CC] p-4">
          <NuxtLink :to="'/items/' + item.id">
            <h2 class="text-center">{{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}</h2>
            <img :src="item.sprite" class="mx-auto"/>
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
