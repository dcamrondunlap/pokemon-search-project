<script setup>
const berries = ref([]);

onMounted(async () => {
  const response = await fetch("https://pokeapi.co/api/v2/berry/?limit=64");
  const { results } = await response.json();

  for (let i = 0; i < results.length; i++) {
    const berryResponse = await fetch(results[i].url);
    const berryData = await berryResponse.json();

    const firmnessResponse = await fetch(`https://pokeapi.co/api/v2/berry-firmness/${berryData.firmness.name}`);
    const firmnessData = await firmnessResponse.json();

    const flavorResponse = await fetch(`https://pokeapi.co/api/v2/berry-flavor/${berryData.flavors[0].flavor.name}`)
    const flavorData = await flavorResponse.json();


    berryData.firmnessData = firmnessData;
    berryData.flavorData = flavorData;

    results[i].data = berryData;
  }

  berries.value = results;
});
</script>

<template>
  <div class="grid grid-cols-4">
    <div v-for="(berry, i) in berries" :key="i" class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
      <div class="p-6">
        <h5 class="block font-sans mb-2 text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 uppercase">
          {{ berry.data.name }}
        </h5>
        <p class="block font-sans text-base antialiased leading-relaxed text-inherit">
          Firmness:  <br>{{ berry.data.firmnessData.name }} <br>
          Flavor: <br>{{ berry.data.flavorData.name }}<br/>
        </p>
      </div>
    </div>
  </div>
</template>
