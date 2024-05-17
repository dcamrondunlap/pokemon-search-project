import { ref, onMounted } from "vue";

export default function fetchBerries() {
  const berries = ref([]);

onMounted(async () => {
  const response = await fetch('https://pokeapi.co/api/v2/berry/?limit=64');
  const data = await response.json();

  for (const berry of data.results) {
    const berryResponse = await fetch(berry.url);
    const berryData = await berryResponse.json();
    berries.value.push({
      name: berry.name,
      id: berry.url.split('/')[6],
      firmness: berryData.firmness.name,
      flavors: berryData.flavors.map(flavor => flavor.flavor.name)
    });
  }
});

return {
  berries,
}
}
