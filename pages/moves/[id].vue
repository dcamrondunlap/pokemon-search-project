<script setup>
const move = ref(null)
const route = useRoute()
const { fetchMoveById } = fetchMoves()

const englishFlavorTextEntries = computed(() => {
  if (move.value) {
    return move.value.flavor_text_entries.filter(entry => entry.language.name === 'en')
  } else {
    return []
  }
})

watch(() => route.params.id, async (newId) => {
  if (newId) {
    const data = await fetchMoveById(newId)
    console.log('Data fetched:', data)
    move.value = data
  }
}, { immediate: true })


;
</script>

<template>
  <div v-if="move">
    <h2>
      {{ move.name }}
    </h2>
    <p>Power:{{ move.power }}</p>
    <p>Power Points:{{ move.pp }}</p>
    <div v-if="englishFlavorTextEntries.length > 0">
      <p>
        {{ englishFlavorTextEntries[0].flavor_text }}
      </p>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>
