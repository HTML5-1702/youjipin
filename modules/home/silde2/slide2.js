/**
 * Created by YZTC on 2017/7/3.
 */
angular.module('slide2Module',['ui.router'])
.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('slide2',{
            url:'/slide2',
            templateUrl:'modules/home/silde2/slide2.html',
            controller:'slide2Ctrl',
            css:['modules/home/silde2/slide2.css','modules/home/home.css']
        })
})
.controller('slide2Ctrl',['$scope','$stateParams','$http',function ($scope,$stateParams,$http) {
    $http.get('data/home.json').then(function(res){
        $scope.intrData=res.data.data.activity_list[0].tab_list;
        $scope.seckillImg = res.data.data.activity_list[2];
        $scope.startshow =res.data.data.activity_list[4];
        $scope.startshows = res.data.data.activity_list[5];
        $scope.object1=res.data.data.tag_list;
    })
}]);