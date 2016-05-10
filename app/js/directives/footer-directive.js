module.exports = function(app) {
  app.directive('footerDirective', () => {
    return {
      restrict: 'AC',
      templateUrl: '../templates/footer_directive_template.html'
    }
  });
};
