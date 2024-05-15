<script setup>
let items = ref(null)
let route = useRoute()
let id = computed(() => route.params.id)
console.log(id.value)

const englishFlavorTextEntries = computed(() => {
  return items.value.flavor_text_entries.filter(entry => entry.language.name === 'en')
})

watch(id, async (newId) => {
  const response = await fetch(`https://pokeapi.co/api/v2/item/${newId}`)
  const data = await response.json()

  items.value = {
    name: data.name,
    cost: data.cost,
    attributes: data.attributes,
    category: data.category,
    flavor_text_entries: data.flavor_text_entries,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${data.name}.png`,
  }
}, {immediate: true})


;
</script>

<template>
  <div v-if="items">
    <img :src="items.sprite" />
    <div>
      <h5>{{ items.name }}</h5>
      <p>
        {{ items.cost }}
      </p>
      <p v-for="(attribute, index) in items.attributes" :key="index">
        {{ attribute.name }}
      </p>
      <p v-if="items.category">
        {{ items.category.name }}
      </p>
      <div>
        <p v-for="(entry, index) in englishFlavorTextEntries" :key="index">
          {{ entry.version_group.name }}- <br/>
          {{ entry.text }}
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>
