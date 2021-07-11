import { ref } from 'vue';
import { useQuasar } from 'quasar';

// Hook for toggled dark mode
export default function useDarkMode() {
  const $q = useQuasar();

  // initialize dark mode value and local storage
  const darkMode = ref(localStorage.getItem('darkMode') === 'true' ? true : false);
  if (darkMode.value === true) {
    $q.dark.set(true);
  } else {
    $q.dark.set(false);
  }

  // this function is used q-toggle's @click
  const toggleDarkMode = () => {
    $q.dark.toggle();
    if (darkMode.value === true) {
      localStorage.setItem('darkMode', 'true');
    } else {
      localStorage.setItem('darkMode', 'false');
    }
  };

  return { darkMode, toggleDarkMode };
}