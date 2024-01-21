// Fichier de configuration Karma, consultez le lien suivant pour plus d'informations
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '', // Le chemin de base du projet
    frameworks: ['jasmine', '@angular-devkit/build-angular'], // Les frameworks utilisés pour les tests

    // Plugins Karma requis pour l'exécution des tests
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    client: {
      clearContext: false // Laisser la sortie du Jasmine Spec Runner visible dans le navigateur
    },

    // Configuration du rapport de couverture Istanbul
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/frontend'), // Répertoire de sortie des rapports de couverture
      reports: ['html', 'lcovonly', 'text-summary'], // Types de rapports générés
      fixWebpackSourcePaths: true // Correction des chemins sources Webpack
    },

    reporters: ['progress', 'kjhtml'], // Rapports de test à afficher
    port: 9876, // Port sur lequel le serveur Karma s'exécute
    colors: true, // Activation de la coloration de la sortie
    logLevel: config.LOG_INFO, // Niveau de journalisation des informations
    autoWatch: true, // Mode de surveillance automatique des fichiers
    browsers: ['Chrome'], // Navigateur utilisé pour les tests (dans ce cas, Chrome)
    singleRun: false, // Exécution unique ou continue des tests
    restartOnFileChange: true // Redémarrage du serveur Karma en cas de modification des fichiers de configuration
  });
};
