import { computed } from 'vue';
import { useQuasar } from 'quasar';

// WIP this is currently broken
export default function useDarkMode() {
  const $q = useQuasar();
  const darkMode = computed({
    get() {
      if (localStorage.getItem('darkMode') === 'true') {
        return true;
      } else if (localStorage.getItem('darkMode') === 'false') {
        return false
      } else {
        return false
      }
    },
    set(value) {
      if (value === true || $q.dark.isActive) {
        $q.dark.set(false)
        localStorage.setItem('darkMode', 'false');
      } else {
        $q.dark.set(true)
        localStorage.setItem('darkMode', 'true');
      }

      if ($q.dark.isActive) {
        $q.dark.set(false);
        localStorage.setItem('darkMode', 'false');
      } else {
        $q.dark.set(true);
        localStorage.setItem('darkMode', 'true');
      }
    }
  });

  return { darkMode };
}