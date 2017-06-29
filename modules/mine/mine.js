angular.module('mineModule',['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('mine', {
            url: '/mine',
            templateUrl: 'modules/mine/mine.html',
            controller:'mineCtrl',
            css:'modules/mine/mine.css'
        })
})
.controller('mineCtrl',['$scope','$http',function($scope,$http){
    $scope.name = '王五';
}])