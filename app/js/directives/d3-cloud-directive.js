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
					console.log("gotintocloud");
					var fill = d3.scale.category20();

          count++;
          var wordCloud = args;
          console.log("inside on");
          console.log(wordCloud);

          cloud().size([300, 300])
            .words(wordCloud)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
						.font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

          function draw(words) {
            d3.select(el[0]).append("svg")
              .attr("width", 300)
              .attr("height", 300)
              .attr("class", "wordcloud")
            .append("g")
              // without the transform, words words would get cutoff to the left and top, they would
              // appear outside of the SVG area
              .attr("transform", "translate(150, 150)")
            .selectAll("text")
              .data(words)
            .enter().append("text")
              .style("font-size", function(d) { return d.size + "px"; })
							.style("font-family", "Impact")
              .style("fill", function(d, i) { return fill(i); })
							.attr("text-anchor", "middle")
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
        address:'@',
				reviewer:'@'
      },
      restrict: 'E',
      controller: 'CloudDataController'
    };

  });
};
