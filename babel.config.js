module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // o 'module:metro-react-native-babel-preset' se non usi Expo
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      }],
    ],
  };
};