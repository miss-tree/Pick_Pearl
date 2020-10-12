/**
 * createMap() 创建地图
 * 
 * */

class drawMap{
	BDmap=null;//地图
	mapPoints=[];//后端传过来的数据
	polyPoints=[];//Point对象坐标的点数组,用于画连接线
	constructor(options) {
	    if(arguments.lenth==0){
			throw new SyntaxError('请输入参数')
		}
		if(!options.id){
			throw new SyntaxError('请选择地图画布')
		}
		// if(!options.poper){
		// 	throw new SyntaxError('请选择地图信息弹窗')
		// }
		this.mapId=options.id
		this.createMap()
	}
	// 创建地图
	createMap(){
		this.BDmap = new BMap.Map(this.mapId, {}); // 创建Map实例
		var point = new BMap.Point(113.382029, 23.312903);
		// 设置地图中心位置 默认设置广州地区 后面根据getViewport()方法设置中心点和缩放级别
		this.BDmap.centerAndZoom(point, 12);
		// map.panBy(250, -30)将地图在水平位置上移动x像素，垂直位置上移动y像素。
		// 相当于在地图设置好中心坐标后再次移动中心位置
		this.BDmap.panBy(250, -30);
		// 设置缩放
		// this.BDmap.enableScrollWheelZoom(false);
	}

	
/** 创建多个标注
 *  mapPoints 每个点的信息数组 async  await 
 *  同时获取每个坐标点信息polyPoints,通过polyPoints重新设置中心坐标和zoom
 */	
	mapMarkers(mapPoints){
		this.mapPoints=mapPoints
		for (var i = 0; i < mapPoints.length; i++) {
			var points = new BMap.Point(mapPoints[i].y, mapPoints[i].x); //创建坐标点
			this.polyPoints.push(points)
			var opts = {
				width: 250, //弹窗宽度
				height: 100, //弹窗高度
				title: mapPoints[i].title //弹窗标题
			};
			// mapPoints[i].con 为弹窗信息内容
			var label = new BMap.Label(mapPoints[i].con, {
				offset: new BMap.Size(20, 5) //位置偏移数据
			});
			// 设置样式
			/**label.setStyle({
						 color : "red",
						 fontSize : "12px",
						 height : "20px",
						 lineHeight : "20px",
						 fontFamily:"微软雅黑"
					 });**/
			var infoWindows = new BMap.InfoWindow(mapPoints[i].branch, opts);
			this.addMarkers(points, label, infoWindows);
		}
		// 当遍历完数组后 重新设置中心坐标和zoom
		if(mapPoints.length==this.polyPoints.length){
			var view = this.BDmap.getViewport(this.polyPoints);// 获取所有坐标中心点以及缩放比例
			this.BDmap.setCenter(view.center);// 设置中心点
			this.BDmap.setZoom(view.zoom );// 设置缩放比例
			this.BDmap.panBy(0, -10);//设置好中心后,不合适要再次偏移位置
		}
	}
	
/** 创建标注
 * points	坐标点数组
 * label	每个坐标绑定的文字
 * infoWindows 点击每个点弹出的信息
 * */
	addMarkers(points, label, infoWindows) {
		var markers = new BMap.Marker(points);
		this.BDmap.addOverlay(markers);
		markers.setLabel(label);
		let that=this
		markers.addEventListener("click", function(event) {
			//参数：窗口、点  根据点击的点出现对应的窗口
			that.BDmap.openInfoWindow(infoWindows, points); 
		});
	}
	/*
/** 增加折线
 * {Arrary} polyArr 折线的点
 * 
 * */
	addPolyLine(){
		// if(!arguments){
		// 	throw new SyntaxError('请选择polyPoints数组')
		// 	return false
		// }
		// else if(this.polyPoints.length!=0){
		// 	polyArr=this.polyPoints
		// }
		// for (var i = 0; i < polyArr.length; i++) {
		// 	var points = new BMap.Point(polyArr[i].y, polyArr[i].x); //创建坐标点对象
		// 	this.polyPoints.push(points)//放到变量中
		// }
		var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
			scale: 0.5, //图标缩放大小
			rotation : '360deg', //图标旋转角度
			strokeColor: '#fff', //设置矢量图标的线填充颜色
			strokeWeight: '2', //设置线宽
		});
		var icons = new BMap.IconSequence(sy, '10', '30');
		// 创建polyline对象
		var polyline = new BMap.Polyline(this.polyPoints, {
			enableEditing: false, //是否启用线编辑，默认为false
			enableClicking: true, //是否响应点击事件，默认为true
			icons: [icons],
			strokeWeight: '8', //折线的宽度，以像素为单位
			strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
			strokeColor: "#18a45b" //折线颜色
		});
		// this.addArrow(polyline,10,Math.PI/7)
		this.BDmap.addOverlay(polyline); //增加折线
	}
/**添加箭头
 * @param {Object} polyline 折线
 * @param {Object} length  箭头长度
 * @param {Object} angleValue 箭头和主线的夹角
 */	
	addArrow(polyline,length,angleValue){ //绘制箭头的函数
		var linePoint=polyline.getPath();//线的坐标串
		var arrowCount=linePoint.length;
		for(var i =1;i<arrowCount;i++){ //在拐点处绘制箭头
		var pixelStart=this.BDmap.pointToPixel(linePoint[i-1]);
		var pixelEnd=this.BDmap.pointToPixel(linePoint[i]);
		var angle=angleValue;//箭头和主线的夹角
		var r=length; // r/Math.sin(angle)代表箭头长度
		var delta=0; //主线斜率，垂直时无斜率
		var param=0; //代码简洁考虑
		var pixelTemX,pixelTemY;//临时点坐标
		var pixelX,pixelY,pixelX1,pixelY1;//箭头两个点
		if(pixelEnd.x-pixelStart.x==0){ //斜率不存在是时
			pixelTemX=pixelEnd.x;
			if(pixelEnd.y>pixelStart.y){
				pixelTemY=pixelEnd.y-r;
			}else{
				pixelTemY=pixelEnd.y+r;
			}	
			//已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法
			pixelX=pixelTemX-r*Math.tan(angle); 
			pixelX1=pixelTemX+r*Math.tan(angle);
			pixelY=pixelY1=pixelTemY;
		}else { //斜率存在时
			delta=(pixelEnd.y-pixelStart.y)/(pixelEnd.x-pixelStart.x);
			param=Math.sqrt(delta*delta+1);
		 
			if((pixelEnd.x-pixelStart.x)<0) {//第二、三象限
				pixelTemX=pixelEnd.x+ r/param;
				pixelTemY=pixelEnd.y+delta*r/param;
			}else{//第一、四象限
				pixelTemX=pixelEnd.x- r/param;
				pixelTemY=pixelEnd.y-delta*r/param;
			}
			//已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法
			pixelX=pixelTemX+ Math.tan(angle)*r*delta/param;
			pixelY=pixelTemY-Math.tan(angle)*r/param;
		 
			pixelX1=pixelTemX- Math.tan(angle)*r*delta/param;
			pixelY1=pixelTemY+Math.tan(angle)*r/param;
		}
		 
		var pointArrow=this.BDmap.pixelToPoint(new BMap.Pixel(pixelX,pixelY));
		var pointArrow1=this.BDmap.pixelToPoint(new BMap.Pixel(pixelX1,pixelY1));
		var Arrow = new BMap.Polyline([
			pointArrow,
		 linePoint[i],
			pointArrow1
		], {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5});
		this.BDmap.addOverlay(Arrow);
		}
	}
/**
 * 加起点和终点
 * 前提是polyPoints已经设置好,前提就是先执行mapMarkers方法
 */	
	setStartEnd(){
		if(this.polyPoints.length==0){
			throw new SyntaxError('请先执行mapMarkers方法获取polyPoints数组')
			return false
		}
		let lastEle=this.polyPoints.length-1
		var Point1 = new BMap.Point(this.polyPoints[0].lng, this.polyPoints[0].lat);
		var markFisrt = new BMap.Marker(Point1)
		this.BDmap.addOverlay(markFisrt)
		var IconFisrt = new BMap.Icon("./images/begin-1.png", 
		new BMap.Size(25, 25),{anchor: new BMap.Size(10, 20)});
		IconFisrt.setImageSize(new BMap.Size(25, 25))//重新设置图片大小
		markFisrt.setIcon(IconFisrt);
		
		var Point2 = new BMap.Point(this.polyPoints[lastEle].lng, this.polyPoints[lastEle].lat);
		var markLast = new BMap.Marker(Point2)
		this.BDmap.addOverlay(markLast)
		var IconLast = new BMap.Icon("./images/end-2.png", //图片位置
					new BMap.Size(25, 25) //尺寸大小
					,{anchor: new BMap.Size(10, 20)});// 设置位置偏移:{anchor: new BMap.Size(-20, 30)};
		IconLast.setImageSize(new BMap.Size(25, 25))
		markLast.setIcon(IconLast);
	}
/**
 * 创建工具
 * 
 */	
	addControl(){
		var top_left_control = new BMap.ScaleControl({
			anchor: BMAP_ANCHOR_TOP_LEFT
		}); // 左上角，添加比例尺
		var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
		/*缩放控件type有四种类型:
			BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；
			BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；
			BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
		//添加控件和比例尺
		this.BDmap.addControl(top_left_control);
		this.BDmap.addControl(top_left_navigation);
	}
}


 
     