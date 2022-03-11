let totalScore = 0;        //当前总得分
let numOfTrophy = 10;   //地图中初始奖杯的数量
const sizeOfMap = [9, 8]; //地图大小 [行数,列数]
const scoreOfTrophy = 10; //每个奖杯的得分
let currentPlace = [0, 0];  //玩家当前的位置
let flag = new Array(sizeOfMap[0]);  //用于标记地图中每个位置是什么
for (let index = 0; index < flag.length; index++) {
    flag[index] = new Array(sizeOfMap[1]).fill(0);
}


// 设定每个位置是否为奖杯 null表示空 1表示奖杯 2表示玩家
const initCell = () => {
    //设定玩家位置
    let trophyRow = Math.floor(Math.random() * sizeOfMap[0]);
    let trophyCol = Math.floor(Math.random() * sizeOfMap[1]);
    flag[trophyRow][trophyCol] = 2;
    currentPlace = [trophyRow, trophyCol];
    //设定奖杯位置
    while (numOfTrophy > 0) {
        trophyRow = Math.floor(Math.random() * sizeOfMap[0]);
        trophyCol = Math.floor(Math.random() * sizeOfMap[1]);
        if (flag[trophyRow][trophyCol] == 0) {
            flag[trophyRow][trophyCol] = 1;
            numOfTrophy--;
        }
    }
}

// 绘制地图
const drawCanvas = () => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //描绘背景
    var gradient = ctx.createLinearGradient(0, 0, 0, 300);
    //createLinearGradient() 方法创建线性的渐变对象。
    gradient.addColorStop(0, "#e0e0e0");
    gradient.addColorStop(1, "#ffffff");
    ctx.fillStyle = gradient;
    ctx.fillRect = (0, 0, canvas.width, canvas.height);
    //描绘边框
    var grid_cols = sizeOfMap[1];
    var grid_rows = sizeOfMap[0];
    var cell_height = canvas.height / grid_rows;
    var cell_width = canvas.width / grid_cols;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#a0a0a0";
    //结束边框描绘
    ctx.beginPath();
    //准备画横线
    for (var col = 0; col <= grid_cols; col++) {
        var x = col * cell_width;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    //准备画竖线
    for (var row = 0; row <= grid_rows; row++) {
        var y = row * cell_height;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    //绘制机器人和奖杯
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    for (let i = 0; i < sizeOfMap[0]; i++) {
        for (let j = 0; j <= sizeOfMap[1]; j++) {
            switch (flag[j][i]) {
                case 1:
                    //相对位置X轴、Y轴、图片宽、图片高, "-4使得图片适当变小", "+2"为了使得图片居中
                    ctx.drawImage(img1, i * cell_width + 2, j * cell_height + 2, cell_width - 4, cell_height - 4);
                    break;
                case 2:
                    ctx.drawImage(img2, i * cell_width + 2, j * cell_height + 2, cell_width - 4, cell_height - 4);
                    break;
                default:
                    break;
            }
        }
    }
    //完成描绘
    ctx.stroke();
}

// 获取键盘输入

const getKey = () => {
    var turn = ""
    //    按键事件
    document.onkeydown = function (evt) {
        // 获取按键
        var e = evt || event;
        var keyCode = e.keyCode || e.which;
        switch (keyCode) {
            case 37: turn = "左";
                if (currentPlace[1] > 0) {
                    flag[currentPlace[0]][currentPlace[1]] = 0;
                    currentPlace[1]--;
                    if (flag[currentPlace[0]][currentPlace[1]]==1) {
                        totalScore+=scoreOfTrophy;
                    }
                    flag[currentPlace[0]][currentPlace[1]] = 2;
                }
                break;
            case 38: turn = "上";
                if (currentPlace[0] > 0) {
                    flag[currentPlace[0]][currentPlace[1]] = 0;
                    currentPlace[0]--;
                    if (flag[currentPlace[0]][currentPlace[1]]==1) {
                        totalScore+=scoreOfTrophy;
                    }
                    flag[currentPlace[0]][currentPlace[1]] = 2;
                }
                break;
            case 39: turn = "右";
                if (currentPlace[1] < sizeOfMap[1]) {
                    flag[currentPlace[0]][currentPlace[1]] = 0;
                    currentPlace[1]++;
                    if (flag[currentPlace[0]][currentPlace[1]]==1) {
                        totalScore+=scoreOfTrophy;
                    }
                    flag[currentPlace[0]][currentPlace[1]] = 2;
                }
                break;

            case 40: turn = "下";
                if (currentPlace[0] < sizeOfMap[0]) {
                    flag[currentPlace[0]][currentPlace[1]] = 0;
                    currentPlace[0]++;
                    if (flag[currentPlace[0]][currentPlace[1]]==1) {
                        totalScore+=scoreOfTrophy;
                    }
                    flag[currentPlace[0]][currentPlace[1]] = 2;
                }
                break;
        }
        drawCanvas();
        document.getElementById("score").value = totalScore;
        // 渲染
        document.getElementById("direction").value = turn;
    }
}


const main = () => {
    initCell();
    drawCanvas();
    getKey();
}

main();
