// JavaScript Document
// loopShow的jQuery插件
/**
 * 定义一个全局对象来存放可能需要动态配置的项
 * @type {{
  * loopShowId: ,string-轮播插件的id值,已经加了#号的字符串，方便于$()取
  * itemDivCount: number,--轮播插件中的div轮播item项数，即子项目
  * loopDelay: number, --轮播间隔的时间
  * leftBtnId: string, --上一章的按钮的id,也加上了#号
  * rightBtnId: string,--下一章的按钮的id，也加上了#号
  * itemClsPrefix: string,--自定义轮播item的class的前缀，默认是.ls_item,加上ls_的前缀，
  *                          是避免css的class与其他的重复
  * itemIdPrefix: string,--自定义轮播item的id的前缀，默认是#ls_item
  * numNavId: string,--轮播插件中的数字导航div的id,也加上了#号
  * numNavAlign: string--轮播插件数字导航的对齐方式，提供了topRight,和bottomRight,默认是topRight
  * startItemIndex : number --默认显示第1张
  * numNavLiBgColor : String --数字导航li的背景色
  * }}
 */
var mgang ={
	loopShowId : 0,
	itemDivCount : 0,
	loopDelay : 0,
	leftBtnId : 0,
	rightBtnId : 0,
	itemClsPrefix : 0,
	itemIdPrefix : 0,
	numNavId : 0,
    numNavAlign : 0,
    startItemIndex : 0,
    numNavLiBgColor : 0
}
//jQuery 的loopShow插件，全局带参数函数
//自定义函数
function flowRight(){
	//先选中显示的ls_item div
    //得到正在显示的ls_item的id
	var visId = $(mgang.loopShowId + " " + mgang.itemClsPrefix + "[show='true']").attr("id");
	//隐藏正在显示的项
    $(mgang.loopShowId + " " + mgang.itemClsPrefix + "[show='true']").css("visibility","hidden").attr("show","false");
	console.info(visId);
	//alert(visId.charAt(7));
    //通过id号加1,在加上ls_item的前缀，来得到下一项的id
	visId = parseInt(visId.charAt(7));
	if(visId == mgang.itemDivCount){
		visId = 1;
		console.info("右->左");
	}else{
		visId = visId + 1;
	}
	console.info(visId);
    //显示下一章
	$(mgang.itemIdPrefix + visId).css("visibility","visible").attr("show","true");
    //发射nextflow事件
   console.info("nextflow触发事件");
   $(mgang.loopShowId).trigger("nextflow");

}
//jQuery对象函数，只要是jQuery对象就可以调用
jQuery.fn.extend({
    //loopShow是loopShow插件的最重要的函数，$("#myLoopShowId").loopShow({})这样就可以初始化轮播插件
    loopShow : function(options){
        var defaults = {
            loopShowId : $(this).attr("id"), //默认的loopId，这里是自动获取，在调用时无需设置
            loopDelay : 3000, //默认3秒后轮播
            leftBtnId : "leftLink",//左按钮的id,默认是leftLink,可以自定义
            rightBtnId : "rightLink",//右按钮的id，默认是rightLink，可以自定义
            itemClsPrefix : "ls_item",//轮播插件的item的class前缀
            itemIdPrefix : "ls_item",//轮播插件的item的id前缀
            numNavId : "numNav",//轮播插件的数字导航div的id,默认是numNav
            numNavAlign : "topRight",//数字导航的位置，默认在左上
            startItemIndex : 1, //默认显示第一张
            numNavLiBgColor : "green"
        };
        var option = $.extend(defaults, options);
        //将轮播插件的数据初始化到全局的mgang对象中，方便于其他函数中使用
        mgang.loopDelay = option.loopDelay ;
        mgang.loopShowId = "#" + option.loopShowId;
        mgang.leftBtnId = "#" + option.leftBtnId;
        mgang.rightBtnId = "#" + option.rightBtnId;
        mgang.itemClsPrefix = "." + option.itemClsPrefix;
        mgang.itemIdPrefix = "#" + option.itemIdPrefix;
        mgang.numNavId = "#" + option.numNavId;
        mgang.numNavAlign = option.numNavAlign;
        mgang.startItemIndex = option.startItemIndex;
        mgang.numNavLiBgColor = option.numNavLiBgColor;
        mgang.itemDivCount = $(mgang.loopShowId + " " + mgang.itemClsPrefix).size();

        console.info(mgang);

        //初始化轮播组件，显示轮播插件的第一个章（默认）
        $(mgang.itemIdPrefix + mgang.startItemIndex).css("visibility","visible").attr("show","true");
        //隐藏左右按钮
        $(mgang.leftBtnId).hide();
        $(mgang.rightBtnId).hide();

        //返回轮播插件对象，方便于chain调用
        return $(this);
    },
    //轮播插件功能1，初始化左右按钮并绑定click事件
	initLeftRightLink : function(){
		$(mgang.leftBtnId).css({
			"margin-top" : parseInt($(mgang.loopShowId).css("height"))/2 - 10,
			"left" : "20px"
		}).show().on("click",function(){
            console.info("left");
            //先选中显示的item div
            var visId = $(mgang.loopShowId + " " + mgang.itemClsPrefix + "[show='true']").attr("id");
            $(mgang.loopShowId + " " + mgang.itemClsPrefix + "[show='true']").css("visibility","hidden").attr("show","false");
            console.info(visId);
            //alert(visId.charAt(7));
            visId = parseInt(visId.charAt(7));
            if(visId == 1){
                visId = mgang.itemDivCount;
                console.info("左->右");
            }else{
                visId = visId - 1;
            }
            console.info(visId);
            $(mgang.itemIdPrefix + visId).css("visibility","visible").attr("show","true");
            //发射nextflow事件
            console.info("nextflow触发事件");
            $(mgang.loopShowId).trigger("nextflow");
        });

		$(mgang.rightBtnId).css({
			"margin-top" : parseInt($(mgang.loopShowId).css("height"))/2 - 10,
			"left" : parseInt($(mgang.loopShowId).css("width")) - 40
		}).show().on("click",function(){
            console.info("right");
            //先选中显示的item div
            var visId = $(mgang.loopShowId + " " + mgang.itemClsPrefix + "[show='true']").attr("id");
            //不显示
            $(mgang.loopShowId + " " + mgang.itemClsPrefix + "[show='true']").css("visibility","hidden").attr("show","false");
            console.info(visId);
            //alert(visId.charAt(7));
            visId = parseInt(visId.charAt(7));
            if(visId == mgang.itemDivCount){
                visId = 1;
                console.info("右->左");
            }else{
                visId = visId + 1;
            }
            console.info(visId);
            $(mgang.itemIdPrefix + visId).css("visibility","visible").attr("show","true");
            //发射nextflow事件
            console.info("nextflow触发事件");
            $(mgang.loopShowId).trigger("nextflow");
        });
		return $(this);	
	},
    //轮播插件功能2，加入数字导航
	initNumNav : function(numNavAlign){
        var align = "";
        if(numNavAlign){
            align = numNavAlign;
        }else{
            align = mgang.numNavAlign;
        }
        if(align == "bottomRight"){
            for(var i = 1;i <= mgang.itemDivCount; i++){
                //<li>i<li>
                $("<li>" + i +"</li>").on("click",function(){
                    var shouldShow = $(this).html();
                    console.info("item"+$(this).html()+"应该显示");
                    //显示第i张，其他的隐藏
                    $(mgang.loopShowId + " " + mgang.itemClsPrefix).css("visibility","hidden").attr("show","false");
                    console.info("全部隐藏");
                    $(mgang.itemIdPrefix + shouldShow).attr("show","true").css("visibility","visible");
                    $(mgang.loopShowId).trigger("nextflow");
                }).prependTo($(mgang.numNavId)).css({
                        "margin-top" : parseInt($(mgang.loopShowId).css("height")) - 40
                });

            }
        }else{
            //在左上,或者是填错，没设置，都用默认的
            //初始化数字导航
            for(var i = 1;i <= mgang.itemDivCount; i++){
                //<li>i<li>
                $("<li>" + i +"</li>").bind("click",function(){
                    var shouldShow = $(this).html();
                    console.info("item"+$(this).html()+"应该显示");
                    //显示第i张，其他的隐藏
                    $(mgang.loopShowId + " " + mgang.itemClsPrefix).css("visibility","hidden").attr("show","false");
                    console.info("全部隐藏");
                    $(mgang.itemIdPrefix + shouldShow).attr("show","true").css("visibility","visible");

                    $(mgang.loopShowId).trigger("nextflow");
                }).prependTo($(mgang.numNavId));
            }
        }
        //初始化红色背景li
        console.info("start index " + mgang.startItemIndex);
        $(mgang.numNavId +" li").eq(-mgang.startItemIndex).css("background-color",mgang.numNavLiBgColor);

        //捕捉事件nextFlow
        $(mgang.loopShowId).on("nextflow",function(){
            console.info("nextflow处理事件");
            //找到当前显示的item,显示数字导航的当前数字北京味红色
            $(mgang.numNavId + " li").each(function(index,domObj){
                console.info($(this));
                var id = parseInt($(mgang.loopShowId +" " + mgang.itemClsPrefix + "[show='true']").attr("id").charAt(7));
                console.info(id);
                var liText = parseInt($(domObj).text());
                console.info("li text" + liText);
                if(liText == id){
                    $(domObj).css("background-color",mgang.numNavLiBgColor);
                }else{
                    $(domObj).css("background-color","gray");
                }
            });
        });

		return $(this);	
	},
    //轮播插件功能3，开始循环播放
	startLoopShow : function(){
		var loopHandler;
		//实现轮播
		$(mgang.loopShowId).on("mouseover",function(){
			console.info("clear");
			console.info($(this).attr("id"));
			clearInterval(loopHandler);
		}).on("mouseout",function(){
			console.info("set");
			console.info($(this).attr("id"));
			loopHandler = setInterval(flowRight,mgang.loopDelay);
		});
		//自动向右滚动
		loopHandler = setInterval(flowRight,mgang.loopDelay);
		return $(this);		
	}
});