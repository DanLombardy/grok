"use strict";
const d3 = require('d3');
const cloud = require('d3-cloud');

module.exports = function(app){
  app.directive('d3Cloud',function(){

    function link (scope, el, attr){
      var count = 0;
      console.log("cool");
      scope.$on('cloudData', function(event, args){
        console.log(count);
        console.log(args);


        if(count === 0){
          count++;
          var wordCloud = args;
          console.log("inside on");
          console.log(wordCloud);

          cloud().size([1000, 400])
                  .words(wordCloud)
                  .rotate(0)
                  .fontSize(function(d) { return d.size; })
                  .on("end", draw)
                  .start();

          function draw(words) {
            d3.select(el[0]).append("svg")
                    .attr("width", "100%")
                    .attr("display", "block")
                    .attr("border", "2px dashed")
                    .attr("height", 350)
                    .attr("class", "wordcloud")
                    .append("g")
                    // without the transform, words words would get cutoff to the left and top, they would
                    // appear outside of the SVG area
                    .attr("transform", "translate(320,200)")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function(d) { return d.size + "px"; })
                    // TO DO: figure out color randomization
                    // .style("fill", function(d, i) { return d.color + ""; })
                    .style('opacity', function(d, i) {
                      let opacity = Math.random();
                      return opacity < .1? opacity + .2: opacity;
                    })
                    .attr("transform", function(d) {
                      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function(d) { return d.text; });
          }
        }
      });
    }
    return {
      link: link,
      scope: {
        data:'=data'
      },
      restrict: 'E',
      templateUrl: "views/cloud-data.html",
      controller: 'CloudDataController'
    };

  });
};
