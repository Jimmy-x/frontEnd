
// 设定每个位置是否为奖杯 null表示空 1表示奖杯 2表示玩家
const initCell = (sizeOfMap, numOfTrophy) => {
    let flag = new Array(sizeOfMap[0]);
    for (let index = 0; index < flag.length; index++) {
        flag[index]=new Array(sizeOfMap[1]).fill(0);
    }
    //设定玩家位置
    let trophyRow = Math.floor(Math.random() * sizeOfMap[0]);
    let trophyCol = Math.floor(Math.random() * sizeOfMap[1]);
    flag[trophyRow][trophyCol] = 2;
    //设定奖杯位置
    while (numOfTrophy > 0) {
        trophyRow = Math.floor(Math.random() * sizeOfMap[0]);
        trophyCol = Math.floor(Math.random() * sizeOfMap[1]);
        if (flag[trophyRow][trophyCol] == 0) {
            flag[trophyRow][trophyCol] = 1;
            numOfTrophy--;
        }
    }
    return flag;
}


// 初始化地图 (地图大小, 奖杯数量, 每个奖杯的分数)
const initMap = (sizeOfMap, numOfTrophy) => {
    const flag = initCell(sizeOfMap, numOfTrophy);
    let myMap = document.getElementById("map");
    for (let i = 0; i < sizeOfMap[0]; i++) {
        let rowElement = document.createElement("div");
        rowElement.className = "row";
        for (let j = 0; j < sizeOfMap[1]; j++) {
            const mapBox = document.createElement("div");
            mapBox.className = "mapBax";
            switch (flag[i][j]) {
                case 0:
                    mapBox.innerHTML = '<img src="image/prize.svg">';
                    break;
                case 1:
                    mapBox.innerHTML = '<img src="image/prize.svg">';
                    break;
                case 2:
                    mapBox.innerHTML = '<img src="image/robot.svg">';
                    break;
                default:
                    break;
            }
            rowElement.appendChild(mapBox);
        }
        myMap.appendChild(rowElement);
    }
}

const main = () => {
    let totalScore = 0;
    const sizeOfMap = [8, 8];
    const numOfTrophy = 10;
    const scoreOfTrophy = 10;
    initMap(sizeOfMap, numOfTrophy);
}

main();
