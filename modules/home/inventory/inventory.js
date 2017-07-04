/**
 * Created by YZTC on 2017/7/2.
 */
angular.module('inventoryModule',['ui.router'])
    .config(function($stateProvider,$urlRouterProvider){
       $stateProvider
           .state('inventory',{
               url:'/inventory',
               templateUrl:'modules/home/inventory/inventory.html',
               controller:'inventoryCtrl',
               css:['modules/home/inventory/inventory.css','modules/home/home.css']
           })
    })
    .service('getData',['$http',function ($http) {
        return $http.get('data/home.json');
    }])
    .controller('inventoryCtrl',['$scope','$stateParams','getData',function ($scope,$stateParams,getData) {
        getData.get().then(function (res) {
            $scope.intrData=res.data.data.activity_list[0].tab_list;
            $scope.seckillImg = res.data.data.activity_list[2];
            $scope.startshow =res.data.data.activity_list[4];
            $scope.startshows = res.data.data.activity_list[5];
            $scope.object1=res.data.data.tag_list;
        })
    }]);