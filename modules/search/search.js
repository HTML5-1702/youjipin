angular.module('searchModule',['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('search', {
            url: '/search',
            templateUrl: 'modules/search/search.html',
            controller:'searchCtrl',
            css:'modules/search/search.css'
        })
        .state('searchlist', {
            url: '/search.searchlist',
            templateUrl: 'modules/search/searchlist.html',
            controller:'searchlistCtrl',
            css:'modules/search/search.css'
        })
})
.controller('searchCtrl',['$scope','$http',function($scope,$http){
    $http.get('http://m.ujipin.com/api/v4/search/hotwords').then(function(reg){
    	$scope.data = reg.data.data.content;
    })
    $scope.textC = function(){
    	$scope.searchtext = $('.searchtext').val();
    	if($scope.searchtext==""){
    		$('.sub-search-layer').hide();
    		$('.clear-search-layer').show();
    	}else{
    		$('.sub-search-layer').show();
    		$('.clear-search-layer').hide();
    	}
    }
}])
.controller('searchlistCtrl',['$scope','$http',function($scope,$http){
	$scope.searchText = localStorage.searchText;
	$scope.data = [];
	$scope.page = 1;
	//获取商品数据
	$scope.getGoods = function(page,searchText){
		$http.get('http://m.ujipin.com/api/v4/search/goods?page='+page+'&q='+searchText).then(function(reg){
			$scope.dataClone = [];
			Array.prototype.push.apply($scope.data,reg.data.data.goods_list);
			$scope.dataClone = $scope.data.slice();
			$scope.goodSort($scope.data);
		})
	}
	//点击人气排序
	$("#hotSort").click(function(){
		$scope.data = [];
		$scope.page = 1;
		$('.goods-sort>div').removeClass('act');
		$("#hotSort").addClass('act');
		$("#hotSort>span").css({
			'background':'url(img/icon11.png) no-repeat center',
			'backgroundSize':'.07rem .04rem'
		})
		$("#priceSort>span").css({
			'background':'url(img/icon39.png) no-repeat center',
			'backgroundSize':'.07rem .1rem'
		})
		$("#hotSort").val(1);
		$scope.getGoods($scope.page,$scope.searchText);
	})
	//点击价格排序
	$("#priceSort").click(function(){
		$scope.data = [];
		$scope.page = 1;
		$('.goods-sort>div').removeClass('act');
		$("#priceSort").addClass('act');
		$("#hotSort>span").css({
			'background':'url(img/icon10.png) no-repeat center',
			'backgroundSize':'.07rem .04rem'
		})
		$("#hotSort").val(0);
		if($("#priceSort").val()==0){
			$("#priceSort").val(1);
			$("#priceSort>span").css({
			'background':'url(img/icon38.png) no-repeat center',
			'backgroundSize':'.07rem .1rem'
		})
		}else if($("#priceSort").val()==1){
			$("#priceSort").val(2);
			$("#priceSort>span").css({
			'background':'url(img/icon37.png) no-repeat center',
			'backgroundSize':'.07rem .1rem'
		})
			
		}else if($("#priceSort").val()==2){
			$("#priceSort").val(1);
			$("#priceSort>span").css({
			'background':'url(img/icon38.png) no-repeat center',
			'backgroundSize':'.07rem .1rem'
		})
		}
		$scope.getGoods($scope.page,$scope.searchText);
	})
	//商品排序
	$("#hotSort").val(1);
	$("#priceSort").val(0);
	$scope.goodSort = function(){
		var arr = $scope.data,str;
		if($("#hotSort").val()==1){
			arr = $scope.dataClone.slice();
		}else{
			if($("#priceSort").val()==1){
				for(var i=0;i<arr.length-1;i++){
					for(var j=i+1;j<arr.length;j++){
						if(parseFloat(arr[i].goods_price)>parseFloat(arr[j].goods_price)){
							str = arr[i];
							arr[i] = arr[j];
							arr[j] = str;
						}
					}
				}
			}else if($("#priceSort").val()==2){
				for(var i=0;i<arr.length-1;i++){
					for(var j=i+1;j<arr.length;j++){
						if(parseFloat(arr[i].goods_price)<parseFloat(arr[j].goods_price)){
							str = arr[i];
							arr[i] = arr[j];
							arr[j] = str;
						}
					}
				}
			}
		}
	}
	//进入页面时加载
	$scope.getGoods($scope.page,$scope.searchText);
	
	//滚动条到底时添加数据
	$(".search-box-3").scroll(function(){
		if($(".loding").offset().top>=500&&$(".loding").offset().top<=505){
			$scope.page++;
			$scope.getGoods($scope.page,$scope.searchText);
		}
	})
}])