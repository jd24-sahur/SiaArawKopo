export default {
  config: {
    locales: ['en'],
    head: {
      title: 'My Custom Admin',
    },
    theme: {
      colors: {
        primary100: '#f6ecfc',
        primary600: '#7b3fe4',
      },
    },
  },
  bootstrap(app) {
    console.log(app);
  },
};