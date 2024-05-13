<script setup>
const items = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(100);

onMounted(async () => {
  const response = await fetch('https://pokeapi.co/api/v2/item/?limit=2110');
  const data = await response.json();
  items.value = data.results.map(item => ({
    ...item,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`
  }));
});

const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage.value));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return items.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};




</script>

<template>
  <div class="grid grid-cols-4">
    <div v-for="item in paginatedItems" :key="item.id" class="relative flex flex-col mt-2 text-gray-700 bg-white  bg-clip-border rounded-xl w-32 shadow-sm shadow-[#EC13BF] hover:bg-[#F040CC]">
      <h2>{{ item.name }}</h2>
      <img :src="item.sprite"  />
    </div>
    <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
    <button @click="nextPage" :disabled="currentPage === totalPages">></button>
  </div>
</template>
