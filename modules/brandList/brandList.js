angular.module('brandListModule',['ui.router','moduleCtrl'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('brandList', {
            url: '/brandList',
            templateUrl: 'modules/brandList/brandList.html',
            controller:'brandListCtrl',
            css:'modules/brandList/brandList.css'
        })
        .state('list',{
        	url:'/brandList.list',
        	templateUrl: 'modules/brandList/brandList-list.html',
            controller:'ListCtrl',
            css:'modules/brandList/brandList.css'
        })
})
.controller('brandListCtrl',['$scope','$http',function($scope,$http){
    $http.get("data/brands.json").then(function(ren){
    	$scope.data = ren.data.data;
   		$scope.brandListItem = function(listId){
   			localStorage.listId = listId;
   		}
    })
}])
.controller("ListCtrl",['$scope','$http',function($scope,$http){
	$http.get("data/brand-type"+localStorage.listId+".json").then(function(data){
		$scope.data = data.data.data[0].brand_list;
	})
}])

