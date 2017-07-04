angular.module('commentModule',['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('comment', {
            url: '/comment:producerId',
            templateUrl: 'modules/cart/detail/comment/comment.html',
            controller:'commentCtrl',
            css:'modules/cart/detail/comment/comment.css'
        })
})
.controller('commentCtrl',['$scope','$http','$state','$stateParams',function($scope,$http,$state,$stateParams){
	$(".box").height($(window).height()-$('#tab').height())
	$scope.producerId = $stateParams.producerId;
	$http.get('http://m.ujipin.com/api/v4/goods/'+$scope.producerId+'/comments?offset=0&count=20').then(function(res){
				$scope.Data=res.data.data;
			});
}])