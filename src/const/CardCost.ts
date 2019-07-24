// TypeScript file
module CardCost {

    export var Character = {//万 一万~九万
        [1]: 1,
        [2]: 2,
        [3]: 3,
        [4]: 4,
        [5]: 5,
        [6]: 6,
        [7]: 7,
        [8]: 8,
        [9]: 9
    }
    export var Bamboo = {//条 一条~九条
        [1]: 11,
        [2]: 12,
        [3]: 13,
        [4]: 14,
        [5]: 15,
        [6]: 16,
        [7]: 17,
        [8]: 18,
        [9]: 19

    }
    export var Dot = {//筒 一筒~九筒
        [1]: 21,
        [2]: 22,
        [3]: 23,
        [4]: 24,
        [5]: 25,
        [6]: 26,
        [7]: 27,
        [8]: 28,
        [9]: 29
    }

    export var Flower = {//花色
        spring: 51,//春、夏、秋、冬
        summer: 53,
        autumn: 55,
        winter: 57,
        wintersweet: 61,//梅、兰、竹、菊
        orchid: 63,
        bamboo: 65,
        mum: 67
    }

    export var Wind = {//风牌 东、南、西、北
        east: 31,
        south: 33,
        west: 35,
        north: 37
    }

    export var Dragon = {//箭牌 	中、发、白
        Red: 41,
        Green: 43,
        White: 45
    }

    //碰(102)，杠(103），胡（104）， 杠开（105）， 天胡（106）， 地胡（107），自摸（108）
    export var other =
        {
            buHua: 101,
            pong: 102,
            kong: 103,
            win: 104,
            kongWin: 105,
            tianHu: 106,
            diHu: 107,
            ziMo: 108
        }
}