<script setup>
let items = ref(null)
let route = useRoute()
let id = computed(() => route.params.id)
let activeTab = ref('name')
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
<div class="mt-10">
  <div v-if="items" class="bg-[#BC40F0] mx-auto max-w-sm rounded-lg shadow-xl shadow-zinc-400 border border-[#F040CC] text-zinc-100 font-medium sm:max-w-xl">
    <ul class="flex space-x-4 justify-center">
      <li class="mt-2 hover:text-[#F040CC]">
        <button
      v-bind:class="{ active: activeTab === 'name' }"
      v-on:click="activeTab = 'name'"
    >
      Name
    </button>
      </li>
      <li class="mt-2 hover:text-[#F040CC]">
        <button
      v-bind:class="{ active: activeTab === 'category' }"
      v-on:click="activeTab = 'category'"
    >
      Category
    </button>
      </li>
      <li class="mt-2 hover:text-[#F040CC]">
        <button
      v-bind:class="{ active: activeTab === 'description' }"
      v-on:click="activeTab = 'description'"
    >
      Description
    </button>
      </li>
    </ul>
    <hr class="mt-2">
    <div>
      <div v-show="activeTab === 'name'" class="flex justify-center mt-5 ">
        <h5 class="text-center hover:text-[#F040CC]">
          {{ items.name.charAt(0).toUpperCase() + items.name.slice(1) }}
        </h5>
        <img :src="items.sprite" class="object-cover w-1/2 rounded-t-lg h-auto  md:w-48 md:rounded-none md:rounded-s-lg"/>
        <p class="hover:text-[#F040CC]">
          {{ items.cost }} Pokedollar(s)
        </p>
      </div>

      <div v-show="activeTab === 'category'" class="flex justify-center mt-3">
        <div class="">
          <p class="mb-2 font-normal text-zinc-100 hover:text-[#F040CC] uppercase">
            Attributes
          </p>
          <hr>
          <div class="border-">
            <p v-for="(attribute, index) in items.attributes" :key="index" class="mb-3 font-normal text-zinc-100 hover:text-[#F040CC]">
              {{ attribute.name.charAt(0).toUpperCase() + attribute.name.slice(1) }}
            </p>
          </div>
        </div>
        <div class="ml-8">
          <p>
            Category
          </p>
          <hr class="mt-2">
          <div>
            <p v-if="items.category" class="mb-3 font-normal text-zinc-100 hover:text-[#F040CC] ">
              {{ items.category.name.charAt(0).toUpperCase() + items.category.name.slice(1) }}
            </p>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'description'">
        <div>
          <div class="grid lg:grid-rows-2 mt-3">
            <p v-for="(entry, index) in englishFlavorTextEntries" :key="index" class="mb-3 font-semibold text-zinc-100 hover:text-[#F040CC]">
              {{ entry.version_group.name.charAt(0).toUpperCase() + entry.version_group.name.slice(1) }} <br/>
              {{ entry.text.charAt(0).toUpperCase() + entry.text.slice(1) }}
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div v-else>
    Loading...
  </div>
</div>
</template>
