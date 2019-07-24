module SoundCost {
    export var soundType =
        {
            young: 1,
            old: 2
        }
    //预加载CardCost
    export var preload_cardCost = CardCost.Bamboo;
    export var soundData = {}
    soundData[1] = [] //男
    soundData[2] = {} //女
    soundData[1][soundType.young] = {}   //男 青年
    soundData[1][soundType.old] = {}   //男 中年
    soundData[2][soundType.young] = {}   //女 青年
    soundData[2][soundType.old] = {}   //女 中年

    //男青年万
    soundData[1][1][CardCost.Character[1]] = 2
    soundData[1][1][CardCost.Character[2]] = 4
    soundData[1][1][CardCost.Character[3]] = 1
    soundData[1][1][CardCost.Character[4]] = 1
    soundData[1][1][CardCost.Character[5]] = 1
    soundData[1][1][CardCost.Character[6]] = 2
    soundData[1][1][CardCost.Character[7]] = 1
    soundData[1][1][CardCost.Character[8]] = 3
    soundData[1][1][CardCost.Character[9]] = 1

    //男中年万
    soundData[1][2][CardCost.Character[1]] = 2
    soundData[1][2][CardCost.Character[2]] = 3
    soundData[1][2][CardCost.Character[3]] = 1
    soundData[1][2][CardCost.Character[4]] = 1
    soundData[1][2][CardCost.Character[5]] = 1
    soundData[1][2][CardCost.Character[6]] = 2
    soundData[1][2][CardCost.Character[7]] = 1
    soundData[1][2][CardCost.Character[8]] = 3
    soundData[1][2][CardCost.Character[9]] = 1

    //女青年万
    soundData[2][1][CardCost.Character[1]] = 2
    soundData[2][1][CardCost.Character[2]] = 3
    soundData[2][1][CardCost.Character[3]] = 1
    soundData[2][1][CardCost.Character[4]] = 1
    soundData[2][1][CardCost.Character[5]] = 1
    soundData[2][1][CardCost.Character[6]] = 2
    soundData[2][1][CardCost.Character[7]] = 1
    soundData[2][1][CardCost.Character[8]] = 3
    soundData[2][1][CardCost.Character[9]] = 1

    //女中年万
    soundData[2][2][CardCost.Character[1]] = 2
    soundData[2][2][CardCost.Character[2]] = 3
    soundData[2][2][CardCost.Character[3]] = 1
    soundData[2][2][CardCost.Character[4]] = 1
    soundData[2][2][CardCost.Character[5]] = 1
    soundData[2][2][CardCost.Character[6]] = 2
    soundData[2][2][CardCost.Character[7]] = 1
    soundData[2][2][CardCost.Character[8]] = 3
    soundData[2][2][CardCost.Character[9]] = 1

    //男青年条
    soundData[1][1][CardCost.Bamboo[1]] = 3
    soundData[1][1][CardCost.Bamboo[2]] = 2
    soundData[1][1][CardCost.Bamboo[3]] = 2
    soundData[1][1][CardCost.Bamboo[4]] = 2
    soundData[1][1][CardCost.Bamboo[5]] = 3
    soundData[1][1][CardCost.Bamboo[6]] = 2
    soundData[1][1][CardCost.Bamboo[7]] = 2
    soundData[1][1][CardCost.Bamboo[8]] = 2
    soundData[1][1][CardCost.Bamboo[9]] = 1

    //男中年条
    soundData[1][2][CardCost.Bamboo[1]] = 3
    soundData[1][2][CardCost.Bamboo[2]] = 2
    soundData[1][2][CardCost.Bamboo[3]] = 2
    soundData[1][2][CardCost.Bamboo[4]] = 2
    soundData[1][2][CardCost.Bamboo[5]] = 3
    soundData[1][2][CardCost.Bamboo[6]] = 2
    soundData[1][2][CardCost.Bamboo[7]] = 2
    soundData[1][2][CardCost.Bamboo[8]] = 2
    soundData[1][2][CardCost.Bamboo[9]] = 1

    //女青年条
    soundData[2][1][CardCost.Bamboo[1]] = 3
    soundData[2][1][CardCost.Bamboo[2]] = 2
    soundData[2][1][CardCost.Bamboo[3]] = 2
    soundData[2][1][CardCost.Bamboo[4]] = 2
    soundData[2][1][CardCost.Bamboo[5]] = 3
    soundData[2][1][CardCost.Bamboo[6]] = 2
    soundData[2][1][CardCost.Bamboo[7]] = 2
    soundData[2][1][CardCost.Bamboo[8]] = 2
    soundData[2][1][CardCost.Bamboo[9]] = 1

    //女中年条
    soundData[2][2][CardCost.Bamboo[1]] = 3
    soundData[2][2][CardCost.Bamboo[2]] = 2
    soundData[2][2][CardCost.Bamboo[3]] = 2
    soundData[2][2][CardCost.Bamboo[4]] = 2
    soundData[2][2][CardCost.Bamboo[5]] = 3
    soundData[2][2][CardCost.Bamboo[6]] = 2
    soundData[2][2][CardCost.Bamboo[7]] = 2
    soundData[2][2][CardCost.Bamboo[8]] = 2
    soundData[2][2][CardCost.Bamboo[9]] = 1



    //男青年饼
    soundData[1][1][CardCost.Dot[1]] = 2
    soundData[1][1][CardCost.Dot[2]] = 3
    soundData[1][1][CardCost.Dot[3]] = 2
    soundData[1][1][CardCost.Dot[4]] = 3
    soundData[1][1][CardCost.Dot[5]] = 2
    soundData[1][1][CardCost.Dot[6]] = 1
    soundData[1][1][CardCost.Dot[7]] = 2
    soundData[1][1][CardCost.Dot[8]] = 4
    soundData[1][1][CardCost.Dot[9]] = 2

    //男中年饼
    soundData[1][2][CardCost.Dot[1]] = 2
    soundData[1][2][CardCost.Dot[2]] = 3
    soundData[1][2][CardCost.Dot[3]] = 2
    soundData[1][2][CardCost.Dot[4]] = 3
    soundData[1][2][CardCost.Dot[5]] = 2
    soundData[1][2][CardCost.Dot[6]] = 1
    soundData[1][2][CardCost.Dot[7]] = 2
    soundData[1][2][CardCost.Dot[8]] = 4
    soundData[1][2][CardCost.Dot[9]] = 2

    //女青年饼
    soundData[2][1][CardCost.Dot[1]] = 2
    soundData[2][1][CardCost.Dot[2]] = 3
    soundData[2][1][CardCost.Dot[3]] = 2
    soundData[2][1][CardCost.Dot[4]] = 3
    soundData[2][1][CardCost.Dot[5]] = 2
    soundData[2][1][CardCost.Dot[6]] = 1
    soundData[2][1][CardCost.Dot[7]] = 2
    soundData[2][1][CardCost.Dot[8]] = 4
    soundData[2][1][CardCost.Dot[9]] = 2

    //女中年饼
    soundData[2][2][CardCost.Dot[1]] = 2
    soundData[2][2][CardCost.Dot[2]] = 3
    soundData[2][2][CardCost.Dot[3]] = 2
    soundData[2][2][CardCost.Dot[4]] = 3
    soundData[2][2][CardCost.Dot[5]] = 2
    soundData[2][2][CardCost.Dot[6]] = 1
    soundData[2][2][CardCost.Dot[7]] = 2
    soundData[2][2][CardCost.Dot[8]] = 4
    soundData[2][2][CardCost.Dot[9]] = 2

    //男青年 东南西北
    soundData[1][1][CardCost.Wind.east] = 2
    soundData[1][1][CardCost.Wind.south] = 3
    soundData[1][1][CardCost.Wind.west] = 4
    soundData[1][1][CardCost.Wind.north] = 2

    //女青年 东南西北
    soundData[2][1][CardCost.Wind.east] = 3
    soundData[2][1][CardCost.Wind.south] = 3
    soundData[2][1][CardCost.Wind.west] = 4
    soundData[2][1][CardCost.Wind.north] = 2

    //男中年 东南西北
    soundData[1][2][CardCost.Wind.east] = 2
    soundData[1][2][CardCost.Wind.south] = 3
    soundData[1][2][CardCost.Wind.west] = 3
    soundData[1][2][CardCost.Wind.north] = 2

    //女中年 东南西北
    soundData[2][2][CardCost.Wind.east] = 2
    soundData[2][2][CardCost.Wind.south] = 3
    soundData[2][2][CardCost.Wind.west] = 4
    soundData[2][2][CardCost.Wind.north] = 2



    //补花 101 碰(102)，杠(103），胡（104）， 杠开（105）， 天胡（106）， 地胡（107），自摸（108）
    //男青年 其他
    soundData[1][1][CardCost.other.buHua] = 4
    soundData[1][1][CardCost.other.pong] = 4
    soundData[1][1][CardCost.other.kong] = 1
    soundData[1][1][CardCost.other.win] = 1
    soundData[1][1][CardCost.other.kongWin] = 1
    soundData[1][1][CardCost.other.tianHu] = 1
    soundData[1][1][CardCost.other.diHu] = 1
    soundData[1][1][CardCost.other.ziMo] = 1

    //女青年 其他
    soundData[2][1][CardCost.other.buHua] = 4
    soundData[2][1][CardCost.other.pong] = 3
    soundData[2][1][CardCost.other.kong] = 1
    soundData[2][1][CardCost.other.win] = 1
    soundData[2][1][CardCost.other.kongWin] = 1
    soundData[2][1][CardCost.other.tianHu] = 1
    soundData[2][1][CardCost.other.diHu] = 1
    soundData[2][1][CardCost.other.ziMo] = 1

    //男中年 其他
    soundData[1][2][CardCost.other.buHua] = 4
    soundData[1][2][CardCost.other.pong] = 3
    soundData[1][2][CardCost.other.kong] = 1
    soundData[1][2][CardCost.other.win] = 1
    soundData[1][2][CardCost.other.kongWin] = 1
    soundData[1][2][CardCost.other.tianHu] = 1
    soundData[1][2][CardCost.other.diHu] = 1
    soundData[1][2][CardCost.other.ziMo] = 1

    //女中年 其他
    soundData[2][2][CardCost.other.buHua] = 4
    soundData[2][2][CardCost.other.pong] = 3
    soundData[2][2][CardCost.other.kong] = 1
    soundData[2][2][CardCost.other.win] = 1
    soundData[2][2][CardCost.other.kongWin] = 1
    soundData[2][2][CardCost.other.tianHu] = 1
    soundData[2][2][CardCost.other.diHu] = 1
    soundData[2][2][CardCost.other.ziMo] = 1
}