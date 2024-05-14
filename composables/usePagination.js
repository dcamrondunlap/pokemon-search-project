import { ref, computed } from "vue";

export default function usePagination() {
  const currentPage = ref(1);
  const itemsPerPage = ref(100);

  const nextPage = () => {
    currentPage.value++
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  };

  return {
    currentPage,
    itemsPerPage,
    nextPage,
    prevPage,
  }
};
