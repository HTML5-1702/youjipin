/**
 * Created by YZTC on 2017/7/2.
 */
angular.module('passModule',['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('u-PASS',{
            url:'/u-PASS',
            templateUrl:'modules/home/u-PASS/pass.html',
            controller:'passCtrl',
            css:['modules/home/u-PASS/pass.css','modules/home/home.css']
        })
})
    .service('getData',['$http',function ($http) {
        this.get=function () {
            return $http.get('data/home.json');
        }
    }])
    .controller('passCtrl',['$scope','$stateParams','getData',function ($scope,$stateParams,getData) {
        getData.get().then(function(res){
            console.log(res);
        })
    }])