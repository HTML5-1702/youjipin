angular.module('homeModule',['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'modules/home/home.html',
            controller:'homeCtrl',
            css:'modules/home/home.css'
        })
})
.controller('homeCtrl',['$scope','$http',function($scope,$http){
    $scope.name = '张三';
}])