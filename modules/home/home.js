angular.module('homeModule',['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'modules/home/home.html',
            controller:'homeCtrl',
            css:'modules/home/home.css',
        })
})
    //引入json数据
    .service('getData',['$http',function ($http) {
        this.get=function () {
            return $http.get('data/home.json');
        }
    }])
    .service('swiper',['$timeout',function ($timeout) {
        this.swiper=function () {
            $timeout(function () {
                var mySwiper = new Swiper ('.swiper-container', {
                    autoplay:1000,
                    autoplayDisableOnInteraction:true,
                    loop: true,
                    // 如果需要分页器
                    pagination: '.swiper-pagination',
                })
            })
        }
    }])

    .controller('homeCtrl',['$scope','getData','swiper',function($scope,getData,swiper){

        getData.get().then(function (res) {

       swiper.swiper();
       $scope.intrData=res.data.data.activity_list[0].tab_list;
       $scope.seckillImg = res.data.data.activity_list[2];
       $scope.startshow =res.data.data.activity_list[4];
       $scope.startshows = res.data.data.activity_list[5];
       $scope.object1=res.data.data.tag_list;
   })

}]);
var myDate = new Date();
var current = myDate.toLocaleDateString();
var starttime = new Date(current +" 10:00:00");

setInterval(function () {
    var nowtime=new Date();
    if(nowtime.getHours()<10){
    	var time = starttime-nowtime;
    }else{
    	var time = starttime-nowtime+86400000;
    }
    
    //取整
    var hour=parseInt(time/1000/60/60%24);
    var minute = parseInt(time/1000/60%60);
    var seconds=parseInt(time/1000%60);
    if(hour<10){
        $("#sp1").html("0"+hour);
    }else{
        $("#sp1").html(hour);
    }
    if(minute<10){
        $("#sp2").html("0"+minute);
    }else{
        $("#sp2").html(minute);
    }
    if(seconds<10){
        $("#sp3").html("0"+seconds);
    }else{
        $("#sp3").html(seconds);
    }
},1000);