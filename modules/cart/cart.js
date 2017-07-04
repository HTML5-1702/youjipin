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
    .factory('myFactory', function () {
	    //定义factory返回对象
	    var myServices = {};    
	    //定义参数对象
	    var myObject = {};
	    var _set = function (data) {
	       myObject = data;     
	    };
	    var _get = function () {
	        return myObject;
	    };
	
	    myServices.set = _set;
	    myServices.get = _get;
	
	    return myServices;
	})
.controller('cartCtrl',['$scope','$http','$timeout','$state','myFactory','$location',function($scope,$http,$timeout,$state,myFactory,$location){
	if(Object.keys( JSON.parse(localStorage.getItem('shopcar6'))).length >0){
		$location.path('/shoppingCar');
	}

	
	
	$scope.random=function(min,max){
		return parseInt(Math.random()*(max-min)+min);
	};
    $.getJSON('data/home.json').then(function(res){
    	$scope.mydata=res.data.tag_list;
    	$scope.newData=$scope.mydata[$scope.random(0,$scope.mydata.length)].goods_list;
    	$timeout(function(){
    		 var swiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        slidesPerView: 3,
		        paginationClickable: true,
		        spaceBetween: 30,
		        freeMode: true,
		            observer:true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents:true,//修改swiper的父元素时，自动初始化swiper
		    }); 
    	},100)
		console.log("第一次获取数据");	
		console.log($scope.newData);
    });
    
    //根据factory传参
      $scope.toProducer = function (producerId) {
	        $state.go('detail', {producerId: producerId});
//	        myFactory.set('我是从home传来的一个变量');
console.log('第一次传参开始');
console.log(producerId)
	  };
     
}])