import { ref, onMounted } from "vue";

export default function fetchMoves() {
  const moves = ref([]);
  const isLoading = ref(true)


  const fetchMoveById = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${id}`);
    const data = await response.json();

    return {
      name: data.name,
      id: data.id,
      accuracy: data.accuracy,
      effect_chance: data.effect_chance,
      pp: data.pp,
      power: data.power,
      flavor_text_entries: data.flavor_text_entries,
    };
  };

  onMounted(async () => {
    const response = await fetch('https://pokeapi.co/api/v2/move/?limit=937');
    const data = await response.json();

    for (const move of data.results) {
      const moveData = await fetchMoveById(move.url.split('/')[6]);

      moves.value.push(moveData);
    }

    isLoading.value = false;
  });

  return {
    moves,
    isLoading,
    fetchMoveById,
  };
}
