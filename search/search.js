angular.module('searchModule',['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('search', {
            url: '/search',
            templateUrl: 'modules/search/search.html',
            controller:'searchCtrl',
            css:'modules/search/search.css'
        })
})
.controller('searchCtrl',['$scope','$http',function($scope,$http){
    $scope.name = '麻溜';
}])