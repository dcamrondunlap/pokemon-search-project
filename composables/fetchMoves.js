import { ref, onMounted } from "vue";

export default function fetchMoves() {
  const moves = ref([]);


onMounted(async () => {
  const response = await fetch('https://pokeapi.co/api/v2/move/?limit=937');
  const data = await response.json();
  moves.value = data.results.map(move => ({
    ...move,
  }));
});

return {
  moves,
}
}
