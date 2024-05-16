<script setup>
let pokemon = ref(null)
let route = useRoute()
let id = computed(() => route.params.id)

watch(id, async (newId) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${newId}`)
  const data = await response.json()

  pokemon.value = {
    name: data.name,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newId}.png`,
    types: data.types.map(type => type.type.name),
  }
}, { immediate: true })

;
</script>

<template>
  <div class="flex justify-center items-center lg:h-96 bg-zinc-100">
    <div v-if="pokemon" class="flex flex-col justify-center items-center bg-[#BC40F0] rounded-lg shadow md:flex-row md:max-w-xl ">
      <img :src="pokemon.sprite" class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"/>
      <div class="flex flex-col justify-between p-4 leading-normal ">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-zinc-100 hover:text-[#F040CC]">{{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}}</h5>
        <p class="mb-3 font-normal text-zinc-100 hover:text-[#F040CC]">Type(s): {{ pokemon.types.join(',') }}</p>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<!-- <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt="">
  <div class="flex flex-col justify-between p-4 leading-normal">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
  </div>
</a> -->
