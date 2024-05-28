<script setup>
let pokemon = ref(null)
let route = useRoute()
let id = computed(() => route.params.id)
let activeTab = ref('name')

const englishFlavorTextEntries = computed(() => {
  return pokemon.value.flavor_text_entries.filter(entry => entry.language.name === 'en')

})

watch(id, async (newId) => {
  console.log('New ID:', newId)
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${newId}`)
  const data = await response.json()

  // Fetch the species data for this Pokémon
  const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${newId}`);
  const speciesData = await speciesResponse.json();

  pokemon.value = {
    name: data.name,
    sprite: data.sprites,
    types: data.types.map(type => type.type.name),
    flavor_text_entries: speciesData.flavor_text_entries,
    generation: speciesData.generation.name
  }
}, { immediate: true })



;
</script>

<template>
  <div class="mt-10">
    <div v-if="pokemon" class="bg-[#BC40F0] mx-auto max-w-sm rounded-lg shadow-xl shadow-zinc-400 border border-[#F040CC] text-zinc-100 font-medium sm:max-w-xl">
      <ul class="flex space-x-4 justify-center">
        <li class="mt-2">
          <button v-bind:class="{ active: activeTab === 'name' }" v-on:click="activeTab = 'name'">Name</button>
        </li>
        <li class="mt-2">
          <button v-bind:class="{ active: activeTab === 'types' }" v-on:click="activeTab = 'types'">Types</button>
        </li>
        <li class="mt-2">
          <button v-bind:class="{ active: activeTab === 'descriptions' }" v-on:click="activeTab = 'descriptions'">Descriptions</button>
        </li>
      </ul>
      <hr class="mt-2">
      <div>
        <div v-show="activeTab === 'name'" class="flex flex-col mt-5 items-center">
          <h5 class="text-center">{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</h5>
          <div class="flex flex-wrap justify-center">
            <img :src="pokemon.sprite.front_default" class="object-cover w-1/2 rounded-t-lg h-auto  md:w-48 md:rounded-none md:rounded-s-lg"/>
          <img :src="pokemon.sprite.front_shiny" class="object-cover w-1/2 rounded-t-lg h-auto  md:w-48 md:rounded-none md:rounded-s-lg"/>
          <img :src="pokemon.sprite.front_female" class="object-cover w-1/2 rounded-t-lg h-auto  md:w-48 md:rounded-none md:rounded-s-lg"/>
          <img :src="pokemon.sprite.front_shiny_female" class="object-cover w-1/2 rounded-t-lg h-auto  md:w-48 md:rounded-none md:rounded-s-lg"/>
          <img :src="pokemon.sprite.back_default" class="object-cover w-1/2 rounded-t-lg h-auto  md:w-48 md:rounded-none md:rounded-s-lg"/>
          <img :src="pokemon.sprite.back_shiny" class="object-cover w-1/2 rounded-t-lg h-auto  md:w-48 md:rounded-none md:rounded-s-lg"/>
          <img :src="pokemon.sprite.back_female" class="object-cover w-1/2 rounded-t-lg h-auto  md:w-48 md:rounded-none md:rounded-s-lg"/>
          <img :src="pokemon.sprite.back_shiny_female" class="object-cover w-1/2 rounded-t-lg h-auto  md:w-48 md:rounded-none md:rounded-s-lg"/>
          </div>
        </div>

        <div v-show="activeTab === 'types'" class="flex justify-center mt-3">
          <div class="">
            <p class="mb-2 font-normal text-zinc-100 hover:text-[#F040CC] uppercase">Types</p>
            <hr>
            <div class="p-2">
              <p v-for="(type, index) in pokemon.types" :key="index" class="mb-3 font-normal text-zinc-100 hover:text-[#F040CC]">{{ type.charAt(0).toUpperCase() + type.slice(1) }}</p>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'descriptions'">
          <div>
            <div class="grid lg:grid-rows-2 p-4">
              <p v-if="englishFlavorTextEntries.length > 0" class="mb-3 font-normal text-zinc-100 hover:text-[#F040CC]">
                {{ pokemon.generation }}
                {{ englishFlavorTextEntries[0].flavor_text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Loading />
  </div>
  </div>
</template>
