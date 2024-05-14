import { ref, onMounted } from "vue";

export default function fetchItems() {
  const items = ref([]);


onMounted(async () => {
  const response = await fetch('https://pokeapi.co/api/v2/item/?limit=2110');
  const data = await response.json();
  items.value = data.results.map(item => ({
    ...item,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`
  }));
});

return {
  items,
}
}
