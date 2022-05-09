// 0表示红方走 未选中
// 1表示红方选中
// 2表示黑方走 未选中
// 3表示黑方选中

var ju = document.getElementById("ju");
var ma = document.getElementById("ma");
var xiang = document.getElementById("xiang");
var shi = document.getElementById("shi");
var jiang = document.getElementById("jiang");
var bing = document.getElementById("bing");
var pao = document.getElementById("pao");

var r_ju = document.getElementById("r_ju");
var r_ma = document.getElementById("r_ma");
var r_xiang = document.getElementById("r_xiang");
var r_shi = document.getElementById("r_shi");
var r_jiang = document.getElementById("r_jiang");
var r_bing = document.getElementById("r_bing");
var r_pao = document.getElementById("r_pao");
    

var states=0;
var tempChess=0; //用于存储选中的棋子
var selected=[-1,-1];
document.body.style.zoom=0.67;
var a = [];
// 0表示空 正数表示红方 负数表示黑方
// 1表示小兵 2表示炮 
// 3表示车 4表示马 5表示相 6表示士 7表示将
for (var i = 0; i < 10; i ++) {  //10行
    var b = [];  //辅助数组
    for (var j = 0; j < 9; j ++) {  //8列
        switch(i){
            case 3: if(j%2==0)b[j]=-1;
            else b[j] = 0; break;
            case 6: if(j%2==0)b[j]=1;
            else b[j] = 0; break;
            default:b[j] = 0; 
        }
    }
    a[i] = b;  //把数组b赋值给数组a
}
a[2][1]=-2;a[2][7]=-2;
a[0][0]=-3;a[0][8]=-3;
a[0][1]=-4;a[0][7]=-4;
a[0][2]=-5;a[0][6]=-5;
a[0][3]=-6;a[0][5]=-6;
a[0][4]=-7;
a[7][1]=2;a[7][7]=2;
a[9][0]=3;a[9][8]=3;
a[9][1]=4;a[9][7]=4;
a[9][2]=5;a[9][6]=5;
a[9][3]=6;a[9][5]=6;
a[9][4]=7;
console.log(a); 
var object = {
    //初始化
    init: function() {
        //棋盘外框
        var canvas1 = document.getElementById("canvas1");
        this.ctx = canvas1.getContext("2d");
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "brown";
        this.ctx.strokeRect(100, 100, 800, 900);

        this.row();
        this.cols();
        this.drawFont();
        //将棋子图像绘制到画布上
        for (var i = 0; i < 9; i ++) { 
            for (var j = 0; j < 10; j ++) {
                if((states==1||states==3)&&j==selected[0]&&i==selected[1]){
                    object.ctx.globalAlpha = 0.5;
                }else object.ctx.globalAlpha = 1;
                switch(a[j][i]){
                    case -1: object.ctx.drawImage(bing, 50+100*i, 50+100*j, 100, 100);break;
                    case -2: object.ctx.drawImage(pao, 50+100*i, 50+100*j, 100, 100);break;
                    case -3: object.ctx.drawImage(ju, 50+100*i, 50+100*j, 100, 100);break;
                    case -4: object.ctx.drawImage(ma, 50+100*i, 50+100*j, 100, 100);break;
                    case -5: object.ctx.drawImage(xiang, 50+100*i, 50+100*j, 100, 100);break;
                    case -6: object.ctx.drawImage(shi, 50+100*i, 50+100*j, 100, 100);break;
                    case -7: object.ctx.drawImage(jiang, 50+100*i, 50+100*j, 100, 100);break;
                    case 1: object.ctx.drawImage(r_bing, 50+100*i, 50+100*j, 100, 100);break;
                    case 2: object.ctx.drawImage(r_pao, 50+100*i, 50+100*j, 100, 100);break;
                    case 3: object.ctx.drawImage(r_ju, 50+100*i, 50+100*j, 100, 100);break;
                    case 4: object.ctx.drawImage(r_ma, 50+100*i, 50+100*j, 100, 100);break;
                    case 5: object.ctx.drawImage(r_xiang, 50+100*i, 50+100*j, 100, 100);break;
                    case 6: object.ctx.drawImage(r_shi, 50+100*i, 50+100*j, 100, 100);break;
                    case 7: object.ctx.drawImage(r_jiang, 50+100*i, 50+100*j, 100, 100);break;
                }
            }
        }
    },
    //此方法用来画棋盘线
    LineDrawing: function(mx, my, lx, ly) {
        this.ctx.beginPath();
        this.ctx.moveTo(mx, my);
        this.ctx.lineTo(lx, ly);
        this.ctx.stroke();
    },
    //棋盘行
    row: function() {
        for(var i = 200; i <= 900; i += 100) {
            this.ctx.beginPath();
            this.ctx.moveTo(105, i);
            this.ctx.lineTo(900, i);
            this.ctx.stroke();
        }
    },
    //棋盘列
    cols: function() {
        for(var i = 200; i <= 800; i += 100) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 105);
            this.ctx.lineTo(i, 1000);
            this.ctx.stroke();
        }
        //清除指定的矩形区域
        //this.ctx.clearRect(5, 402,795, 95);
        this.ctx.clearRect(102.5, 502, 795, 95);
        //斜线
        this.LineDrawing(400, 105, 600, 300);
        this.LineDrawing(400, 805, 600, 1000);
        //反斜线
        this.LineDrawing(600, 105, 400, 300);
        this.LineDrawing(600, 805, 400, 1000);
    },
    //坐标的中心点
    center: function(x, y) {
        this.ctx.lineWidth = 5;
        //中心点一（100,200）
        //左上
        this.LineDrawing(x - 10, y - 30, x - 10, y - 10);
        this.LineDrawing(x - 10, y - 10, x - 30, y - 10);
        //右上
        this.LineDrawing(x + 10, y - 30, x + 10, y - 10);
        this.LineDrawing(x + 10, y - 10, x + 30, y - 10);
        //左下
        this.LineDrawing(x - 10, y + 30, x - 10, y + 10);
        this.LineDrawing(x - 10, y + 10, x - 30, y + 10);
        //右下
        this.LineDrawing(x + 10, y + 30, x + 10, y + 10);
        this.LineDrawing(x + 10, y + 10, x + 30, y + 10);
    },
    drawFont: function() {
        this.ctx.lineWidth = 1;
        var canvas1 = document.getElementById("canvas1");
        //绘制文字
        this.ctx.font = "60px microsoft yahei";
        this.ctx.save(); //保存点
        //将坐标中心作为起启点
        this.ctx.translate(canvas1.width / 2, canvas1.height / 2);
        var radian = Math.PI / 2; // 弧度制 Math.PI=π
        this.ctx.rotate(radian); // 旋转画布绘制刻度
        //填充
        this.ctx.fillText("楚", -30, -270);
        this.ctx.fillText("河", -30, -150);
        this.ctx.restore(); //恢复到保存点
        this.ctx.save();
        //将坐标中心作为起点
        this.ctx.translate(canvas1.width / 2, canvas1.height / 2);
        var radian = Math.PI / -2;
        this.ctx.rotate(radian);
        this.ctx.fillText("汉", -30, -270);
        this.ctx.fillText("界", -30, -150);
        this.ctx.restore();
    }
};
object.init();

var canvas1 = document.getElementById("canvas1");
//对事件进行监听
canvas1.addEventListener('click', function(e){
    px=e.offsetX;
    py=e.offsetY;
    i=Math.trunc((px-33.5)/67) ;
    j=Math.trunc((py-33.5)/67) ;
    console.log(i,j);
    if(states==0){
        switch(a[j][i]){
            case 1: 
            case 2: 
            case 3: 
            case 4: 
            case 5: 
            case 6: 
            case 7: 
            tempChess=a[j][i];
            selected=[j,i];
            states++;
        }
    }
    else if(states==1){
        switch(a[j][i]){
            case 1: 
            case 2: 
            case 3: 
            case 4: 
            case 5: 
            case 6: 
            case 7: 
            break;
            default:
            a[j][i]=tempChess;
            a[selected[0]][selected[1]]=0;
            states++;
        }
    }
    else if(states==2){
        switch(a[j][i]){
            case -1: 
            case -2: 
            case -3: 
            case -4: 
            case -5: 
            case -6: 
            case -7: 
            tempChess=a[j][i];
            selected=[j,i];
            states++;
        }
    }
    else if(states==3){
        switch(a[j][i]){
            case -1: 
            case -2: 
            case -3: 
            case -4: 
            case -5: 
            case -6: 
            case -7: 
            break;
            default:
            a[j][i]=tempChess;
            a[selected[0]][selected[1]]=0;
            states=0;
        }
    }
    var w = canvas1.width;
    var h = canvas1.height;
    canvas1.width = w;
    canvas1.height = h;
    object.init();
}, false);
  
