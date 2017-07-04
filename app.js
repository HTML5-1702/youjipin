angular.module('ujipin',['ui.router','angularCSS','homeModule','searchModule','mineModule','cartModule','detailModule','commentModule','shoppingCarModule'])
.config(function ($stateProvider, $urlRouterProvider) {
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
}