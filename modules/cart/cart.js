angular.module('cartModule',['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('cart', {
            url: '/cart',
            templateUrl: 'modules/cart/cart.html',
            controller:'cartCtrl',
            css:'modules/cart/cart.css'
        })
})
.controller('cartCtrl',['$scope','$http',function($scope,$http){
    $scope.name = '李四';
}])