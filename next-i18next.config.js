export default {
    i18n: {
      defaultLocale: 'fr',
      locales: ['en', 'fr'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  };