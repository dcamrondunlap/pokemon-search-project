<script setup>
let berries = ref(null)
let loading = ref(true)
let route = useRoute()
let id = computed(() => route.params.id)
console.log(id.value)

watch(id, async (newId) => {
    loading.value = true
    const response = await fetch(`https://pokeapi.co/api/v2/berry/${newId}`)
    const data = await response.json()
    console.log('Fetched Data: ', data) // check the fetched data

    berries.value = {
      name: data.name,
      firmness: data.firmness.name,
      flavors: data.flavors.map(flavor => flavor.flavor.name),
      growth_time: data.growth_time,
      size: data.size,
      smoothness: data.smoothness,
      soil_dryness: data.soil_dryness,
    }
    loading.value = false
})

;
</script>

<template>
  <div v-if="!loading && berries">
    <h1>
      {{ berries.name }}
    </h1>
  </div>
  <div v-else>
    loading...
  </div>
</template>
