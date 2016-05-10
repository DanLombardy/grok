module.exports = function(app) {
  app.directive('headerDirective', () => {
    return {
      restrict: 'AC',
      templateUrl: '../templates/header_directive_template.html'
    }
  });
};
