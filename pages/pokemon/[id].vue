<script setup>
let pokemon = ref(null)
let route = useRoute()
let id = computed(() => route.params.id)

watch(id, async (newId) => { // Watch for changes in id
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
  <div v-if="pokemon">
    <h1>{{pokemon.name}}</h1>
    <img :src="pokemon.sprite"/>
    <p>Type(s): {{ pokemon.types.join(',') }}</p>
  </div>
  <div v-else>
    Loading...
  </div>
</template>
