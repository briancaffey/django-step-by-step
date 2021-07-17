import { ref, computed, WritableComputedRef } from 'vue';


export default function usePagination() {
  const limit = ref(3);
  const offset = ref(0);

  // const currentPage = computed(() => { return offset.value + 1; });

  const currentPage: WritableComputedRef<number> = computed({
    get() {
      return offset.value + 1;
    },
    set(value: number): void {
      offset.value = value - 1;
    },
  });

  return { offset, limit, currentPage };
}