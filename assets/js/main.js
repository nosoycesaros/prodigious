var app = angular.module('WidgetsTest', ['ngResource']);

/**
 * The service that loads the contents resource
 */
app.factory('content', ['$resource', function($resource) {

    return $resource("./assets/content.json", {}, {
        getData: {
            method: 'GET',
            isArray: true
        }
    });

}]);

/**
 * Main Controller for widgets
 */
app.controller('WidgetsController', function($scope, content, $filter) {

    content.getData(function(data) {
        $scope.menuWidget = data[0].data;
        $scope.profileWidget = data[1].data;
        $scope.statsWidget = data[2].data;
        $scope.profileMenuWidget = data[3].data;

        loadLineChart($scope.statsWidget.chart, $scope.statsWidget.chartLabels);
        loadBarsChart($scope.statsWidget.resume, $scope.statsWidget.resumeLabels);
    });

});

/**
 * Creates a line chart inside the chart widget
 * 
 * @param  {[type]} data   [description]
 * @param  {[type]} labels [description]
 * @return {[type]}        [description]
 */
function loadLineChart(data, labels) {

    var data = {
        labels: labels,
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(255,255,255,1)",
            strokeColor: "rgba(255,255,255,1)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: data
        }]
    };

    var ctx = document.getElementById("myChart").getContext("2d");

    var myLineChart = new Chart(ctx).Line(data, {
        showScale: false,
        showTooltips: true,
        datasetStrokeWidth: 5,
        datasetFill: false,
        bezierCurve: false,
        pointDot: false,

    });
}

/**
 * Creates the resume bar chart inside the cart widget
 * 
 * @param  {[type]} data   [description]
 * @param  {[type]} labels [description]
 * @return {[type]}        [description]
 */
function loadBarsChart(data, labels) {
    var data = {
        labels: labels,
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(229,95,59,1)",
            strokeColor: "rgba(220,220,220,0)",
            highlightFill: "rgba(77,175,123,1)",
            highlightStroke: "rgba(220,220,220,0)",
            data: data
        }]
    };

    var ctx = document.getElementById("miniChart").getContext("2d");
    var myBarChart = new Chart(ctx).Bar(data, {
        showScale: false,
        barValueSpacing: 1,
    });
}
