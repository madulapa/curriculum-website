(function () {
    'user strict';
    angular.module('ValueCalculator', [])
    .controller('ValueCalculatorController', function($scope) {
        $scope.name = "";
        $scope.totalCarbonEmissions = 0;
        $scope.communityRating = 50;
        $scope.energyCost = 0;
        $scope.transporationCost = 0;
        $scope.wasteCost = 0;
        $scope.calculateCarbonEmissions = function () {
            $scope.totalValue = calculateNumeric($scope.name);
        };
        $scope.calculateCommunityRating = function (int, string) {
            var totalRating = 0; 
            var ratingVals = new Map(); 
            ratingVals.set('coalPlant', -2);
            ratingVals.set('oilPlant', -1);
            ratingVals.set('naturalGasPlant', -2);
            ratingVals.set('nuclearPlant', -1);
            ratingVals.set('solarFarm', 4);
            ratingVals.set('windTurbine', 4);
            ratingVals.set('geothermalEnergyPlant', 2);
            ratingVals.set('hydropowerPlant', 5);
            ratingVals.set('solarPanel', 3);
            
           

        };
        $scope.calculateCosts = function () {

        };
    });
})();