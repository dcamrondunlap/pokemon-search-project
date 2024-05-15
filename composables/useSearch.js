export default function useSearch() {
  const searchQuery = ref('');
  const isLoading = ref(true)
  const {pokemon} = fetchPokemon()
  const {items} = fetchItems()
  const {berries} = fetchBerries()
  const {moves} = fetchMoves();

  onMounted(async () => {
    await Promise.all([pokemon, items, berries, moves])
    isLoading.value = false
  })

  const filteredItems = computed(() => {
    if (isLoading || !searchQuery.value) {
      return { pokemon, items, moves, berries };
    }

    return {
      pokemon: pokemon.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      ),
      items: items.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      ),
      moves: moves.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      ),
      berries: berries.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }
  })

  return {
    searchQuery,
    filteredItems,
    isLoading,
  }
}
