// import { useQuasar } from 'quasar';
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n';

// Hook for i18n
export default function i18n() {

  const { locale } = useI18n({ useScope: 'global' });

  const localeOptions = [
    { value: 'en-US', label: 'EN' },
    { value: 'cn-ZH', label: 'CN' }
  ]

  if (ref(localStorage.getItem('lang'))) {
    locale.value = localStorage.getItem('lang') || 'en-US';
  };

  const updateLocale = () => {
    localStorage.setItem('lang', locale.value);
  }

  watch(locale, updateLocale);

  return { locale, localeOptions };
}