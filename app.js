angular.module('ujipin',['ui.router','angularCSS','homeModule','searchModule',
'mineModule','cartModule','inventoryModule','passModule','welfareModule','slide1Module','slide2Module','slide3Module',"brandListModule","brandModule","moduleCtrl"])
.controller('categotyCtrl',['$scope','$http',function($scope,$http){
	$http.get('data/discovery.json').then(function(res){
		$scope.data = res.data.data;
	})
}])
.config(function ($stateProvider,$urlRouterProvider) {
 	$urlRouterProvider.otherwise('/home');
 	
	$('#content').css('height',$(window).height()-$('#tab').height()+'px');
});
window.onload = function(){
	//REM布局
	var windowW = $(window).width();
	$('html').css('font-size',parseInt(windowW/3.2)+'px');
	window.onresize = function(){
		var windowW = $(window).width();
		$('html').css('font-size',parseInt(windowW/3.2)+'px');
	}
	//搜索栏显示隐藏
	var searchCatl = true;
	$('.search').click(function(){
		if(searchCatl){
			searchCatl = false;
			$('#tab').removeClass('searchHide');
			$('#tab').on('click','a',searchHide);
			$('.input-box input').val('');
		}else{
			searchHide();
		}
	})
	function searchHide(){
		searchCatl = true;
		$('#tab').addClass('searchHide');
		$('#tab').off('click','a',searchHide);
	}
	$('.search-t>div:last-child').click(function(){
		searchCatl = true;
		$('#tab').addClass('searchHide');
	})
	//商品种类列表显示隐藏
	$('.category-list').on('click','.category-item',function(){
		$('.category-item').removeClass('open');
		$(this).addClass('open');
		if($(this).val()==1){
			$(this).removeClass('open');
			$('.category-item').val(0);
		}else{
			$(this).val(1);
		}
	})
	//搜索框取值
	$(".category-list").on('click','li>a',function(){
		$(".input-box input").val($(this).text());
	})
};