angular.module('nCONECT-admin', ['ui.bootstrap', 'ui.grid', 'ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/instances', {
            templateUrl: 'template/instances.html',
            controller: 'instanceController'
        }).
        when('/config', {
            templateUrl: 'template/config.html',
            controller: 'configController'
        }).
        otherwise({
            redirectTo: '/instances'
        });
    }
])

.controller('mainController', function($scope, $http) {
    $scope.panels = [{
        id: 'instances',
        displayName: 'Cell Class Instances'
    }, {
        id: 'config',
        displayName: 'Configuration'
    }];

    $scope.alerts = [{
        type: 'success',
        msg: 'Welcome !',
        timeout: "10000"
    }];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };


    $scope.$on('alert', function(e, type, message) {
        $scope.alerts.push({
            type: type,
            msg: message,
            timeout: "10000"
        });
    });
})



.controller('instanceController', function($scope, $http, uiGridConstants) {
    $scope.message = 'This is instanceController screen';

    $scope.$scope = $scope;
    $scope.gridOptions = {
        enableFiltering: true,
        enableColumnResizing: true,
        columnDefs: [{
            field: 'name',
            filter: {
                condition: uiGridConstants.filter.CONTAINS
            }
        }, {
            field: 'endPoint',
            filter: {
                condition: uiGridConstants.filter.CONTAINS
            }
        }, {
            field: 'status',
            cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                var value = grid.getCellValue(row, col)
                if (value === 'UP') {
                    return 'bg-success';
                } else if (value === 'DOWN') {
                    return 'bg-danger';
                } else {
                    return 'bg-warning';
                }
            }
        }]
    }


    $scope.refresh = function() {
        $http.get('/admin/instances').
        success(function(data, status, headers, config) {
            $scope.gridOptions.data = data;
        }).
        error(function(data, status, headers, config) {
            $scope.$emit('alert', 'danger', 'Failed to load data');
        })
    }

    $scope.refresh();
})

.controller('configController', function($scope, $http) {
    $scope.message = 'This is configController screen';
})