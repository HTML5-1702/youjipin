angular.module('brandModule',['ui.router','moduleCtrl'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('brandAll', {
            url: '/brandAll',
            templateUrl: 'modules/brand/brandAll.html',
            controller:'brandAllCtrl',
            css:'modules/brand/brand.css'
        })
        .state('brand', {
            url: '/brandAll.brand',
            templateUrl: 'modules/brand/brand.html',
            controller:'brandCtrl',
            css:'modules/brand/brand.css'
        })
})
.controller('brandAllCtrl',['$scope','$http',function($scope,$http){
	$http.get("data/brandAll.json").then(function(reg){
		$scope.data = reg.data.data;
		$scope.skip = function(groupId){
			var num1 = $("#tab").height(),num2,
				num3 = $(".brandAll-list").offset().top;
			
			if(groupId=="#"){
				num2 = $($(".brandAll-list")[0]).offset().top;
			}else{
				num2 = $("#"+groupId).offset().top;
			}
			$(".brandAll-list").offset({top:num3-num2+num1})
		}
	})
}])
.controller('brandCtrl',['$scope','$http',function($scope,$http){
	$http.get('http://m.ujipin.com/api/v4/tags/'+localStorage.tagId+'?page=1').then(function(reg){
		$scope.data = reg.data.data;
	})
}])