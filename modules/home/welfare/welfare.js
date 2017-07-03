/**
 * Created by YZTC on 2017/7/2.
 */
angular.module('welfareModule',['ui.router'])
.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('welfare',{
            url:'welfare',
            templateUrl:'modules/home/welfare/welfare.html',
            controller:'welfareCtrl',
            css:['modules/home/welfare/welfare.css','modules/home/home.css']
        })
})
    .controller('welfareCtrl',['$scope','$stateParams',function ($scope,$stateParams) {
        //获得canvas的id及属性
        var myCanvas = document.getElementById("myCanvas");
        var ctx = myCanvas.getContext('2d');
        // var str = "images/img";  //图片地址前缀
        // var nums = "0000000000112233445566778";
        // var num = nums.charAt(parseInt(Math.random()*25)); //随机数生成出现的图片数字
        // var jpg = ".jpg"; //图片地址的后缀
        // myCanvas.style.backgroundImage = 'url("'+str+num+jpg+'")';
        ctx.fillStyle = '#ccc';
        ctx.fillRect(0,0,240,150);
        //移动端事件 添加addEventListener
           myCanvas.addEventListener('touchmove', function(event) {
               //如果触屏是一只手
               if(event.changedTouches.length==1){
                   //组织浏览器默认事件
                   event.preventDefault();
                   //event.changedTouches[0]里面是存放 clientX clientY 移动时坐标值
               var x = event.changedTouches[0].clientX-$("#myCanvas").offset().left,
                   y = event.changedTouches[0].clientY-$("#myCanvas").offset().top;
               // console.log(event.changedTouches[0]);//里面是存放 clientX clientY 移动时坐标值

                   ctx.globalCompositeOperation = 'destination-out';
                   ctx.beginPath();
                   ctx.fillStyle = 'red';
                   ctx.arc(x,y,20,0,Math.PI*2,true);
                   ctx.fill();
                   ctx.closePath();
               }
           })
    }]);
