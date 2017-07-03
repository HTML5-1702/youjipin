angular.module('mineModule',['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('mine', {
            url: '/mine',
            templateUrl: 'modules/mine/mine.html',
            controller:'mineCtrl',
            css:'modules/mine/mine.css'
        })
        .state("mine.login", {
			url:'/login',
            templateUrl: 'modules/mine/login.html',
            controller:'loginCtrl',
            css:'modules/mine/mine.css'
        })
        .state("mine.register", {
			url:'/register',
            templateUrl: 'modules/mine/register.html',
            controller:'registerCtrl',
            css:'modules/mine/mine.css'
        })
        .state("mine.main", {
			url:'/main',
            templateUrl: 'modules/mine/main.html',
            css:'modules/mine/mine.css'
        })
        .state("mine.address",{
        	url:'/address',
            templateUrl: 'modules/mine/address.html',
            css:'modules/mine/mine.css'
        })
})
.controller('mineCtrl',['$scope','$http','$location',function($scope,$http,$location){
	//查看登录状态,没登录跳转到登录页
	$scope.loginState = function(){
		if(JSON.parse(localStorage.getItem('login_state')) != true){
			$location.path("/mine/login");
	    }
	}
	$scope.loginState();
	
	$scope.add_show = true;
	$scope.add2_show = false;
	$scope.isDefault = false;
	$scope.idRegions = false;
	$scope.idProvince = true;
	$scope.idCity = false;
	$scope.idCounty = false;
	
	$scope.add_fn = function(){
		$scope.add_show = false;
		$scope.add2_show = true;
	}
	$scope.add_fn2 = function(){
		$scope.idRegions=true;
		$scope.add2_show=false;
		$scope.idProvince = true;
	}
	
	
	$scope.name_data = JSON.parse(localStorage.getItem('memberData_hr'));
	$scope.add_name = localStorage.login_name;
	$scope.add_data = $scope.name_data[$scope.add_name].add_data;
	console.log($scope.name_data[$scope.add_name].add_data)
	
	
	$http.get('data/regions.json').then(function(res){
		console.log(JSON.parse(localStorage.getItem('memberData_hr')));
		//省份数据
		$scope.province_data = res.data.data;
		//默认省份的市
		$scope.city_data = res.data.data[0].subregions;
		//默认城市的县
		$scope.county_data = res.data.data[0].subregions[0].subregions;
		//点击省获取市
		$scope.province = function(index){
			$scope.idProvince = false;
			$scope.idCity = true;
			$scope.idCounty = false;
			$scope.province_index = index;
			//市数据
			$scope.city_data = res.data.data[index].subregions;
		}
		//点击市获取县
		$scope.city = function(index){
			$scope.idProvince = false;
			$scope.idCity = false;
			$scope.idCounty = true;
			$scope.city_index = index;
			//县数据
			$scope.county_data = res.data.data[$scope.province_index].subregions[$scope.city_index].subregions;
		}
		$scope.county = function(index){
			$scope.idProvince = false;
			$scope.idCity = false;
			$scope.idCounty = false;
			$scope.add2_show = true;
			$scope.add_region = res.data.data[$scope.province_index].name + 
								res.data.data[$scope.province_index].subregions[$scope.city_index].name + 
								res.data.data[$scope.province_index].subregions[$scope.city_index].subregions[index].name;
		}
	})
	
	//添加收货地址
	$scope.add_btn = function(){
		var addObj = JSON.parse(localStorage.getItem('memberData_hr'));
		var add_name = localStorage.login_name;
		//获取收货人姓名,电话及地址
		var add_obj = {
    		add_name : $scope.add_name,
    		add_mobile : $scope.add_mobile,
    		add_ress : $scope.add_region + $scope.add_ress
   		};
		addObj[add_name].add_data[addObj[add_name].add_number] = add_obj;
		//地址数量加1
		addObj[add_name].add_number += 1;
		localStorage.setItem('memberData_hr',JSON.stringify(addObj));
		$scope.add_show = true;
		$scope.add2_show = false;
		$location.path("/mine/main");
	}
	
	//退出登录
	$scope.log_out = function(){
		localStorage.removeItem("login_state");
		alert("已退出登录!");
		$location.path("/home");
	}
    
	$('.login-box').css('height',$(window).height()-$('#tab').height()+'px');
}])
.controller('registerCtrl',['$scope','$http','$location',function($scope,$http,$location){
	//验证码
    var code = 999999; 
    function codes(){
        var ranColor = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);	//随机背景颜色
    	var ranColor2 = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);	//随机文字颜色
    	var ranArr = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    	code = "";
    	for (var i = 0; i < 6; i++) {
     		var ranNum = Math.floor(Math.random() * ranArr.length);
     		code += ranArr[ranNum];
    	}
		$scope.code = code;
        $("#code").html(code);
        $("#code").css('background',ranColor);
        $("#code").css('color',ranColor2);
    }
    //验证码输入-显示提示信息
	$scope.VFcode = function(){
		if(angular.uppercase($scope.vcode) != $scope.code){
			$scope.ts_code = true;
		}else{
			$scope.ts_code = false;
		}
	}
	
	//验证用户名是否存在
	$scope.name_repeat = function(){
		if(JSON.parse(localStorage.getItem("memberData_hr"))){
    		if($scope.user == JSON.parse(localStorage.getItem("memberData_hr")).username){
    			$scope.nameRepeat = true;
    		}else{
    			$scope.nameRepeat = false;
    		}
		}else{
			$scope.nameRepeat = false;
		}
	}
	
    //验证码
    codes();   
    $("#code").on('click',codes);
    //提交注册
    $scope.register = function () {
        //表单正常提交
        if($scope.registerForm.$valid && $scope.password == $scope.password2 && angular.uppercase($scope.vcode) == $scope.code && $scope.nameRepeat == false){
        	//信息储存到localStorage
        	var objR = {
        		username : $scope.user,
        		password : $scope.password,
        		add_data : {},
        		add_number : 0
        	};
			var objZ = JSON.parse(localStorage.getItem('memberData_hr'));
			//判断有没有存过用户信息
			if(objZ){
				objZ[$scope.user] = objR;
			}else{
				//如果没存过 新建一个obj
				objZ = {};
				objZ[$scope.user] = objR;
			}
			localStorage.setItem('memberData_hr',JSON.stringify(objZ));
			console.log(JSON.parse(localStorage.getItem('memberData_hr')));
			alert('注册成功！欢迎您。');
			$location.path("/mine/login");
        }
        else{
//          $scope.submitted = true;
        	alert("注册信息有误！请核对后再提交。");
        }
	};
}])
.controller('loginCtrl',['$scope','$http','$location',function($scope,$http,$location){
	//验证用户名密码是否正确
	$scope.login = function(){
		if(JSON.parse(localStorage.getItem("memberData_hr"))[$scope.login_name]){
			if($scope.login_name == JSON.parse(localStorage.getItem("memberData_hr"))[$scope.login_name].username &&
				$scope.login_paword == JSON.parse(localStorage.getItem("memberData_hr"))[$scope.login_name].password){
//	        	修改登录状态
	        	localStorage.login_state = true;
	        	localStorage.login_name = $scope.login_name;
				$location.path("/mine/main");
				alert('登录成功！欢迎您。');
			}
		}else{
			alert('用户名或密码不正确！');
		}
	}
}])