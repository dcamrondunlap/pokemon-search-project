import { ref, onMounted } from "vue";

export default function fetchPokemon() {
  const pokemon = ref([])

  onMounted(async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1302');
    const data = await response.json();

    pokemon.value = data.results.map(pokemon => {
      const id = pokemon.url.split('/')[6];

      return {
        ...pokemon,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      }
    });
  });

  return {
    pokemon,
  }
}
