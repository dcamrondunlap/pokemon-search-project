<script setup>
const searchQuery = ref('');
const allData = ref([]); // Combined list of Pokémon, moves, berries, and items
const filteredResults = ref([]);
const router = useRouter();

const fetchAllData = async () => {
  // Fetch Pokémon
  const pokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const pokemonData = await pokemonResponse.json();
  const pokemonList = pokemonData.results.map((item, index) => ({ ...item, id: index + 1 }));

  // Fetch Moves
  const movesResponse = await fetch('https://pokeapi.co/api/v2/move?limit=150');
  const movesData = await movesResponse.json();
  const movesList = movesData.results.map((item, index) => ({ ...item, id: index + 1 }));

  // Fetch Berries
  const berriesResponse = await fetch('https://pokeapi.co/api/v2/berry?limit=150');
  const berriesData = await berriesResponse.json();
  const berriesList = berriesData.results.map((item, index) => ({ ...item, id: index + 1 }));

  // Fetch Items
  const itemsResponse = await fetch('https://pokeapi.co/api/v2/item?limit=150');
  const itemsData = await itemsResponse.json();
  const itemsList = itemsData.results.map((item, index) => ({ ...item, id: index + 1 }));

  // Combine all lists
  allData.value = [...pokemonList, ...movesList, ...berriesList, ...itemsList];
};

const filterResults = () => {
  const query = searchQuery.value.toLowerCase();
  filteredResults.value = allData.value.filter(item =>
    item.name.toLowerCase().includes(query)
  );
};

const navigateToItem = (item) => {
  console.log('Navigating to:', item);
  if (item.url.includes('pokemon')) {
    router.push(`/pokemon/${item.id}`).catch(err => {
      console.error('Navigation error:', err);
    });
  } else if (item.url.includes('item')) {
    // Handle item navigation
    router.push(`/items/${item.id}`).catch(err => {
      console.error('Navigation error:', err);
    });
  } else if (item.url.includes('berry')) {
    // Handle berry navigation
    router.push(`/berries/${item.id}`).catch(err => {
      console.error('Navigation error:', err);
    });
  } else if (item.url.includes('move')) {
    // Handle move navigation
    router.push(`/moves/${item.id}`).catch(err => {
      console.error('Navigation error:', err);
    });
  } else {
    console.error('Unknown item type:', item);
  }
};

const handleKeyPress = () => {
  if (filteredResults.value.length > 0) {
    navigateToItem(filteredResults.value[0]);
  }
};

onMounted(fetchAllData);
</script>

<template>
  <div class="flex justify-center items-center mt-5">
    <div class="max-w-md w-full">
      <div class="relative">
        <img src="@/assets/file.png"/>
        <input
        v-model="searchQuery"
        @input="filterResults"
        @keydown.enter="handleKeyPress"
        placeholder="Search..."
        class="block w-full p-4 ps-10 text-sm border border-zinc-300 shadow-lg rounded-lg bg-zinc-200 focus:outline-none focus:ring focus:ring-[#F040CC]"
      />
      <button
        @click="handleKeyPress"
        class="text-zinc-100 absolute end-2.5 bottom-2.5 bg-[#BC40F0] focus:ring-4 focus:outline-none focus:ring-[#F040CC] font-medium rounded-lg text-sm px-4 py-2"
      >
      Search</button>
      </div>
      <div v-for="item in filteredResults" :key="item.name" @click="navigateToItem(item)" class="block max-w-md bg-zinc-200 border border-zinc-300 shadow cursor-pointer">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
