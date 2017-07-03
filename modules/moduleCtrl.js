angular.module("moduleCtrl",[])
//品牌联动
.controller('brandSkip',['$scope','$http',function($scope,$http){
	$scope.brandSkip = function(tagId){
		localStorage.tagId = tagId;
	}
}])
//商品联动
.controller('goodCtrl',['$scope','$http',function($scope,$http){
	$scope.goodCtrl = function(searchText){
		localStorage.searchText = searchText;
	}
}])