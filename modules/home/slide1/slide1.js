/**
 * Created by YZTC on 2017/7/3.
 */
angular.module('slide1Module',['ui.router'])
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('slide1',{
                url:'/slide1',
                templateUrl:'modules/home/slide1/slide1.html',
                controller:'slide1Ctrl',
                css:['modules/home/slide1/slide1.css','modules/home/home.css']
            })
    })
    // .service('getData',['$http',function ($http) {
    //     return $http.get('data/home.json');
    // }])
.controller('slide1Ctrl',['$scope','$stateParams','$http',function ($scope,$stateParams,$http){
    $http.get('data/home.json').then(function (res) {
        $scope.intrData=res.data.data.activity_list[0].tab_list;
        $scope.seckillImg = res.data.data.activity_list[2];
        $scope.startshow =res.data.data.activity_list[4];
        $scope.startshows = res.data.data.activity_list[5];
        $scope.object1=res.data.data.tag_list;
    })
}])