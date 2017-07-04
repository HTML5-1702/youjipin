angular.module('detailModule',['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('detail', {
            url: '/detail/:producerId',
            templateUrl: 'modules/cart/detail/detail.html',
            controller:'detailCtrl',
            css:'modules/cart/detail/detail.css'
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


.controller('detailCtrl',['$scope','$http','$timeout','$state','$stateParams','myFactory',function($scope,$http,$timeout,$state,$stateParams,$myFactory){
			$('.box').css('height',$(window).height()-$('#tab').height());
			$('.box').css('padding-bottom','.5rem');
			console.log($(window).height(),$('#tab').height(),$('.buyBtn').height())
    		$scope.producerId = $stateParams.producerId;
    		$scope.no2producerId=$scope.producerId;
			$http.get('http://m.ujipin.com/api/v4/goods/'+$scope.producerId).then(function (res) 		{
			$scope.mydata=res.data.data;
			console.log('详情页面获取数据'+$scope.producerId);
			console.log($scope.mydata);
			$timeout(function(){
				  var mySwiper = new Swiper ('.swiper-container', {
				    loop: true,
				    autoplay:2000,
				    //点击按钮或者分页器后不能自动播放的问题
					autoplayDisableOnInteraction : false,
					//给分页器添加点击事件
					paginationClickable:true,
				    // 如果需要分页器
				    pagination: '.swiper-pagination',
				   
				  })  
			},2000)
        })
			$http.get('http://m.ujipin.com/api/v4/goods/'+$scope.producerId+'/comments?offset=0&count=20').then(function(res){
				$scope.Data=res.data.data;
				console.log('详细页面数据');
				console.log($scope.producerId);
				console.log($scope.Data);
				if($scope.Data == ""){
					$('.more').css('display','none');
					$('.user').html("对不起主人,暂时没有评论");
					$('.user>ul>li').eq(3).css('display','none');
				}
			});
		//为了方便传值将其设为1;
		$scope.initNum = 1;
		//给商品具体类别添加单击事件,并且改变样式
		$('.count button').attr('disabled',true);
		$('.count button').css({'border':"#F8F8F8",'color':'#F8F8F8'});
		$scope.choose=function(num,x){
			$scope.list=$scope.mydata.products.list[num].stock;
			$scope.color = x;
			if($scope.mydata.products.list[num].stock>0){
				$scope.isActive=true;
				$('label').eq(num).css({'background':'red','color':'#fff'});
				$('label').eq(num).siblings().css({'background':'#fff','color':'#4F494B'});
				$('.addBtn').attr('disabled',false);
				$('.addBtn').css({'border':'#4F494B;','color':'#4F494B'});
				$('input').val(1);
				$scope.add=function(){
					$scope.initNum=parseInt($('input').val());
					if($scope.initNum == $scope.mydata.products.list[num].stock){
						alert("主人库存只有这么多啦")
						$('.addBtn').attr('disabled',true);
						$scope.initNum=$scope.mydata.products.list[num].stock;
					}else{
						$('.reduceBtn').attr('disabled',false);
						$('.reduceBtn').css({'border':'#4F494B;','color':'#4F494B'});
						$scope.initNum++;
						
					}
					console.log($scope.mydata.products.list[num].stock);
					$('input').val($scope.initNum);
				};
				$scope.reduce=function(){
					$scope.initNum=parseInt($('input').val());
					if($scope.initNum == 1){
						$('.reduceBtn').attr('disabled',true);
						$scope.initNum=1;
					}else{
						$('.reduceBtn').attr('disabled',false);
						$('.reduceBtn').css({'border':'#4F494B;','color':'#4F494B'});
						$scope.initNum--;
					}
					$('input').val($scope.initNum);
				}
			}
		}
		
		//添加购物车
		$scope.addTo=function(){
//			localStorage.setItem('shopcar',JSON.stringify($scope.mydata));
			var obj = JSON.parse(localStorage.getItem('shopcar6'));
			if(obj){
				if(obj[$scope.producerId]){
					obj[$scope.producerId].num += $scope.initNum;
				}else{
					obj[$scope.producerId] = $scope.mydata;
					obj[$scope.producerId].num = $scope.initNum;
				}
			}else{
				obj= {};
				obj[$scope.producerId] = $scope.mydata;
				obj[$scope.producerId].num = $scope.initNum;
			}
			obj[$scope.producerId].color = $scope.color;
			obj[$scope.producerId].list=$scope.list;
			localStorage.setItem('shopcar6',JSON.stringify(obj));
		}
      //根据factory传参
      $scope.toProducer = function (producerId) {
	        $state.go('comment', {producerId: producerId});
	        console.log(producerId);
	  };
	  
	  //订单页面
	  $(function(){
	  	$('.close').on('click',function(){
	  		$('.order').css('display','none')
	  	});
	  	$('.buyBtn').on('click',function(){
	  		$('.order').css('display','block')
	  	})
	  })
}])