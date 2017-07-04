angular.module('shoppingCarModule',['ui.router'])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
        .state('shoppingCar', {
            url: '/shoppingCar',
            templateUrl: 'modules/cart/detail/shoppingCar/shoppingCar.html',
            controller:'shoppingCarCtrl',
            css:'modules/cart/detail/shoppingCar/shoppingCar.css'
        })
	})
	
	.controller('shoppingCarCtrl',['$scope',function($scope){
		$scope.totlePrice=0;
		$('input').val();
		$('.item').css('height',$(window).height()-$('#tab').height()-$('.footer_left').height());
		$scope.data = JSON.parse(localStorage.getItem('shopcar6'));
		var arr=$scope.data;
		for(var str in arr){
			$scope.totlePrice +=arr[str].goods_price * arr[str].num;
			console.log(arr[str]);
			console.log(str);
		}
		console.log(arr[str].list);
		//加减商品
		$scope.add=function(stock,count,str){
			if(stock == count){
				alert("主人,伦家只有这么多库存啦")
			}else{
				var obj = JSON.parse(localStorage.getItem('shopcar6'));
				console.log(obj);
    			obj[str.goods_id].num++;
    			localStorage.setItem('shopcar6',JSON.stringify(obj));
    			$scope.data = JSON.parse(localStorage.getItem('shopcar6'));
    			$scope.totlePrice  = $scope.totlePrice+(parseFloat(obj[str.goods_id].goods_price));
			}
		};
		$scope.reduce=function(stock,count,str){
			if(count == 1){
				alert("主人,不能再少啦");
				$('.reduceBtn').attr('disabled',true);
			}else{
				var obj = JSON.parse(localStorage.getItem('shopcar6'));
    			obj[str.goods_id].num--;
    			localStorage.setItem('shopcar6',JSON.stringify(obj));
    			$scope.data = JSON.parse(localStorage.getItem('shopcar6'));
    			$scope.totlePrice=$scope.totlePrice-(parseFloat(obj[str.goods_id].goods_price));
			}
		};
		
		//购物车删除商品
		$scope.del=function(str){
			var obj = JSON.parse(localStorage.getItem('shopcar6'));
				var singlePrice=parseFloat(obj[str.goods_id].goods_price) * obj[str.goods_id].num;
    			delete obj[str.goods_id];
    			localStorage.setItem('shopcar6',JSON.stringify(obj));
    			$scope.data = JSON.parse(localStorage.getItem('shopcar6'));
				$scope.totlePrice = $scope.totlePrice - singlePrice;
		};
		$scope.delAll=function(){
			var obj = JSON.parse(localStorage.getItem('shopcar6'));
			var arr=$scope.data;
			for(var str in arr){
				var singlePrice=parseFloat(obj[arr[str].goods_id].goods_price) * obj[arr[str].goods_id].num;
				$scope.totlePrice = $scope.totlePrice - singlePrice;
				
				delete obj[arr[str].goods_id];
				localStorage.setItem('shopcar6',JSON.stringify(obj));
    			$scope.data = JSON.parse(localStorage.getItem('shopcar6'));
			}
		}
	}])