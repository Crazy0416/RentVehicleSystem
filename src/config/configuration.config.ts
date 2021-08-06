export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
});
