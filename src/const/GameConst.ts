module GameConst {
    export var operateTime = 10
    //出牌类型
    export var CLICK_CARD_TYPE =
        {
            click: 1,
            doubleClick: 2
        }
    export var maxPlayerNum = 4;
    export var perPlayerTotalCardNum = 14;
    /**
     * 
     */
    export var PLAY_DIR =
        {
            down: 0,
            right: 1,
            up: 2,
            left: 3,
        }

    export var PLAYER_STATUS =
        {
            OFFLINE: 0,
            LEAVE: 2,
            SIT: 4,
            PLAYING: 5,
            STAND: 6,
            NULL: 7
        }

    export var ME_DIR = GameConst.PLAY_DIR.down

    export var CARD_SIZE =
        {
            HAND_CARD: [
                {
                    width: 86,
                    height: 118,
                    width_playBack: 86,
                    height_playBack: 118
                },
                {
                    width: 36,
                    height: 68,
                    width_playBack: 60,
                    height_playBack: 53
                },
                {
                    width: 45,
                    height: 59,
                    width_playBack: 47,
                    height_playBack: 62
                },
                {
                    width: 36,
                    height: 68,
                    width_playBack: 60,
                    height_playBack: 53
                }

            ]
        }

    export var CARD_DATA =
        {
            HAND_CARD: [
                {
                    path: "card/DownHandCardSkin.exml",
                    offx: 85,
                    offy: 0,
                    playBackOffx: 85,
                    playBackOffy: 0,
                    gapLastX: 22,
                    gapLastY: 0,
                    gapPlayBackLastX: 22,
                    gapPlayBackLastY: 0
                },
                {
                    path: "card/RightHandCardSkin.exml",
                    offx: 0,
                    offy: -30,
                    playBackOffx: 0,
                    playBackOffy: -32,
                    gapLastX: 0,
                    gapLastY: -20,
                    gapPlayBackLastX: 0,
                    gapPlayBackLastY: -20
                },
                {
                    path: "card/TopHandCardSkin.exml",
                    offx: -42,
                    offy: 0,
                    playBackOffx: -42,
                    playBackOffy: 0,
                    gapLastX: -20,
                    gapLastY: 0,
                    gapPlayBackLastX: -20,
                    gapPlayBackLastY: 0
                },
                {
                    path: "card/LeftHandCardSkin.exml",
                    offx: 0,
                    offy: 30,
                    playBackOffx: 0,
                    playBackOffy: 32,
                    gapLastX: 0,
                    gapLastY: 20,
                    gapPlayBackLastX: 0,
                    gapPlayBackLastY: 20
                }
            ],
            HUA_CARD: [
                {
                    path: "card/DownHuaCardSkin.exml",
                    offx: 42,
                    offy: 0
                },
                {
                    path: "card/RightHuaCardSkin.exml",
                    offx: 0,
                    offy: -36
                },
                {
                    path: "card/TopHuaCardSkin.exml",
                    offx: -42,
                    offy: 0
                },
                {
                    path: "card/LeftHuaCardSkin.exml",
                    offx: 0,
                    offy: 36
                }
            ],
            OUT_CARD: [
                {
                    path: "card/DownOutCardSkin.exml",
                    offx: 42,
                    offy: 0,
                    secondLineXOff: 0,
                    secondLineYOff: -48,
                    multiLineXOff: 0,
                    multiLineYOff: -10,
                    perlineNum: 10,
                    maxLine: 2,
                },
                {
                    path: "card/RightOutCardSkin.exml",
                    offx: 0,
                    offy: -36,
                    secondLineXOff: -52,
                    secondLineYOff: 0,
                    multiLineXOff: 0,
                    multiLineYOff: -15,
                    perlineNum: 10,
                    maxLine: 2,
                },
                {
                    path: "card/TopOutCardSkin.exml",
                    offx: -42,
                    offy: 0,
                    secondLineXOff: 0,
                    secondLineYOff: 48,
                    multiLineXOff: 0,
                    multiLineYOff: 10,
                    perlineNum: 10,
                    maxLine: 2,
                },
                {
                    path: "card/LeftOutCardSkin.exml",
                    offx: 0,
                    offy: 36,
                    secondLineXOff: 52,
                    secondLineYOff: 0,
                    multiLineXOff: 0,
                    multiLineYOff: -15,
                    perlineNum: 10,
                    maxLine: 2,
                }
            ],
            EFFECT_OUT_CARD:
            [
                {
                    x: GameConfig.ScreenW / 2,
                    y: 230
                },
                {
                    x: 1020,
                    y: 380
                },
                {
                    x: GameConfig.ScreenW / 2,
                    y: 560
                },
                {
                    x: 260,
                    y: 380
                }
            ],
            PONG_KONG_CARD:
            [
                {
                    path: "card/DownPongKongNodeSkin.exml",
                    offx: 240,
                    offy: 0,
                    dirOffx: 0,
                    dirOffy: 0
                },
                {
                    path: "card/RightPongKongNodeSkin.exml",
                    offx: 0,
                    offy: -114,
                    dirOffx: 0,
                    dirOffy: 3

                },
                {
                    path: "card/TopPongKongNodeSkin.exml",
                    offx: -134,
                    offy: 0,
                    dirOffx: -5,
                    dirOffy: 0

                },
                {
                    path: "card/LeftPongKongNodeSkin.exml",
                    offx: 0,
                    offy: 114,
                    dirOffx: 0,
                    dirOffy: -3

                }
            ]
        }



    export var CARD_3D_DATA =
        {
            HAND_CARD: [
                {
                    path: "3dCard/DownHandCard_3dSkin.exml",
                    offx: 87,
                    offy: 0,
                    offScaleOffy: 0,
                    offScaleOffx: 0,
                    offScale: 0,
                    playBackPath: "3dCard/DownHandCard_3dSkin.exml",
                    playBackOffx: 87,
                    playBackOffy: 0,
                    gapLastX: 22,
                    gapLastY: 0,
                    offPlayBackScaleOffy: 0,
                    offPlayBackScaleOffx: 0,
                    gapPlayBackLastX: 22,
                    gapPlayBackLastY: 0,
                    offPlayBackScale: 1
                },
                {
                    path: "3dCard/RightHandCard_3dSkin.exml",
                    offx: -9.6,
                    offy: -32,
                    offScaleOffy: 0.5,
                    offScaleOffx: 0.1,
                    offScale: -0.0177,
                    playBackPath: "3dCard/RightPongKongCardNode_3dSkin.exml",
                    playBackOffx: -9.6,
                    playBackOffy: -34,
                    gapLastX: -3,
                    gapLastY: -10,
                    offPlayBackScaleOffy: 0.5,
                    offPlayBackScaleOffx: 0.12,
                    gapPlayBackLastX: -5,
                    gapPlayBackLastY: -20,
                    offPlayBackScale: -0.0177
                },
                {
                    path: "3dCard/TopHandCard_3dSkin.exml",
                    offx: -42,
                    offy: 0,
                    offScaleOffy: 0,
                    offScaleOffx: 0,
                    offScale: 0,
                    playBackPath: "3dCard/TopHuaCard_3dSkin.exml",
                    playBackOffx: -42,
                    playBackOffy: 0,
                    gapLastX: -20,
                    gapLastY: 0,
                    offPlayBackScaleOffy: 0,
                    offPlayBackScaleOffx: 0,
                    gapPlayBackLastX: -20,
                    gapPlayBackLastY: 0,
                    offPlayBackScale: -0.23
                },
                {
                    path: "3dCard/LeftHandCard_3dSkin.exml",
                    offx: -7.6,
                    offy: 32,
                    offScaleOffy: 0.5,
                    offScaleOffx: -0.1,
                    offScale: -0.0177,
                    playBackPath: "3dCard/LeftPongKongCardNode_3dSkin.exml",
                    playBackOffx: -7.70,
                    playBackOffy: 34,
                    gapLastX: -5,
                    gapLastY: 20,
                    offPlayBackScaleOffy: 0.5,
                    offPlayBackScaleOffx: -0.25,
                    gapPlayBackLastX: -6,
                    gapPlayBackLastY: 20,
                    offPlayBackScale: -0.0177
                }
            ],
            HUA_CARD: [
                {
                    path: "3dCard/DownHuaCard_3dSkin.exml",
                    offx: 54,
                    offy: 0,
                    offScaleOffy: 0,
                    offScaleOffx: 0,
                    offScale: 0,
                },
                {
                    path: "3dCard/RightHuaCard_3dSkin.exml",
                    offx: -8.5,
                    offy: -33,
                    offScaleOffy: 0.7,
                    offScaleOffx: 0.15,
                    offScale: -0.02,
                },
                {
                    path: "3dCard/TopHuaCard_3dSkin.exml",
                    offx: -54 * 0.7,
                    offy: 0,
                    offScaleOffy: 0,
                    offScaleOffx: 0,
                    offScale: 0.7,
                },
                {
                    path: "3dCard/LeftHuaCard_3dSkin.exml",
                    offx: -7.2,
                    offy: 27,
                    offScaleOffy: 0.8,
                    offScaleOffx: -0.15,
                    offScale: -0.02,
                }
            ],
            OUT_CARD: [
                {
                    path: "3dCard/DownHuaCard_3dSkin.exml",
                    offx: 52,
                    offy: 0,
                    multiLineXOff: 0,
                    multiLineYOff: -26,
                    secondLineXOff: 4,
                    secondLineYOff: -43,
                    secondLineXOff_2_PLAYER: 12,
                    secondLineYOff_2_PLAYER: -43,
                    offScaleOffy: 0,
                    offScaleOffx: 0,
                    offScale: [0.98, 0.964],
                    offScale_2_PLAYER: [0.98, 0.956],
                    perlineNum: 10,
                    maxLine: 2,
                },
                {
                    path: "3dCard/RightHuaCard_3dSkin.exml",
                    offx: -6.8,
                    offy: -33,
                    multiLineXOff: 2,
                    multiLineYOff: -20,
                    secondLinePerCardXOff: -5.5,
                    secondLineXOff: -63,
                    secondLineYOff: 0,
                    secondLineXOff_2_PLAYER: 0,
                    secondLineYOff_2_PLAYER: 0,
                    offScaleOffy: 0.8,
                    offScaleOffx: 0.2,
                    secondOffScaleOffx: 0.18,
                    offScale: [-0.02],
                    offScale_2_PLAYER: [],
                    perlineNum: 10,
                    maxLine: 2,
                },
                {
                    path: "3dCard/TopHuaCard_3dSkin.exml",
                    offx: -52,
                    offy: 0,
                    multiLineXOff: 0,
                    multiLineYOff: -20,
                    secondLineXOff: 4,
                    secondLineYOff: 36,
                    secondLineXOff_2_PLAYER: 10,
                    secondLineYOff_2_PLAYER: 36,
                    offScaleOffy: 0,
                    offScaleOffx: 0,
                    offScale: [0.8, 0.815],
                    offScale_2_PLAYER: [0.8, 0.82],
                    perlineNum: 10,
                    maxLine: 2,
                },
                {
                    path: "3dCard/LeftHuaCard_3dSkin.exml",
                    offx: -5.8,
                    offy: 27,
                    multiLineXOff: -5,
                    multiLineYOff: -20,
                    secondLinePerCardXOff: -5,
                    secondLineXOff: 52,
                    secondLineYOff: 0,
                    secondLineXOff_2_PLAYER: 0,
                    secondLineYOff_2_PLAYER: 0,
                    offScaleOffy: 0.8,
                    offScaleOffx: -0.20,
                    secondOffScaleOffx: -0.12,
                    offScale: [-0.02],
                    offScale_2_PLAYER: [],
                    perlineNum: 10,
                    maxLine: 2,
                }
            ],
            EFFECT_OUT_CARD:
            [
                {
                    x: GameConfig.ScreenW / 2,
                    y: 230
                },
                {
                    x: 1020,
                    y: 380
                },
                {
                    x: GameConfig.ScreenW / 2,
                    y: 560
                },
                {
                    x: 260,
                    y: 380
                }
            ],
            PONG_KONG_CARD:
            [
                {
                    path: "3dCard/DownPongKongCard_{0}_3dSkin.exml",
                    offx: 260,
                    offy: 0,
                    offScaleOffy: 0,
                    offScaleOffx: 0,
                    dirOffx: 10,
                    dirOffy: 0,
                    offScale: 0
                },
                {
                    path: "3dCard/RightPongKongCard_3dSkin.exml",
                    offx: -30,
                    offy: -112,
                    offScaleOffy: 6,
                    offScaleOffx: -1,
                    dirOffx: 0,
                    dirOffy: 1,
                    offScale: -0.04
                },
                {
                    path: "3dCard/TopPongKongCard_{0}_3dSkin.exml",
                    offx: -134,
                    offy: 0,
                    offScaleOffy: 0,
                    offScaleOffx: 0,
                    dirOffx: -5,
                    dirOffy: 0,
                    offScale: 0.504
                },
                {
                    path: "3dCard/LeftPongKongCard_3dSkin.exml",
                    offx: -28,
                    offy: 88,
                    offScaleOffy: 4,
                    offScaleOffx: -1,
                    dirOffx: 0,
                    dirOffy: 1,
                    offScale: -0.04
                }
            ]
        }

    export var GAME_ALL_CARD_NODE_POSITION =
        {
            HAND_CARD:
            [
                {
                    x: 86,
                    y: 655,
                    playBackx: 86,
                    playBacky: 655
                },
                {
                    x: 1120,
                    y: 480,
                    playBackx: 1110,
                    playBacky: 545
                },
                {
                    x: 876,
                    y: 30,
                    playBackx: 876,
                    playBacky: 35
                },
                {
                    x: 160,
                    y: 140,
                    playBackx: 170,
                    playBacky: 70
                }
            ],
            HUA_CARD:
            [
                {
                    x: 454,
                    y: 540
                },
                {
                    x: 1037,
                    y: 482
                },
                {
                    x: 834,
                    y: 100
                },
                {
                    x: 243,
                    y: 160
                }
            ],
            OUT_CARD:
            [
                {
                    x: 454,
                    y: 475
                },
                {
                    x: 943,
                    y: 482
                },
                {
                    x: 834,
                    y: 166
                },
                {
                    x: 337,
                    y: 160
                }
            ],
            OUT_CARD_2PLAYERS :
            [
                {
                    x : 238,
                    y : 475
                },
                {
                    x : 943,
                    y : 482
                },
                {
                    x : 1038,
                    y : 166
                },
                {
                    x : 337,
                    y : 160
                }
            ],
            PONG_KONG_NODE:
            [
                {
                    x: 170,
                    y: 665
                },
                {
                    x: 1110,
                    y: 540
                },
                {
                    x: 875,
                    y: 35
                },
                {
                    x: 170,
                    y: 80
                }
            ]
        }



    export var GAME_ALL_CARD_NODE_POSITION_3D =
        {
            HAND_CARD:
            [
                {
                    x: 66,
                    y: 655,
                    playBackx: 66,
                    playBacky: 655
                },
                {
                    x: 1190,
                    y: 480,
                    playBackx: 1210,
                    playBacky: 505
                },
                {
                    x: 876,
                    y: 60,
                    playBackx: 876,
                    playBacky: 55
                },
                {
                    x: 190,
                    y: 100,
                    playBackx: 185,
                    playBacky: 70
                },
            ],
            HUA_CARD:
            [
                {
                    x: 400,
                    y: 555
                },
                {
                    x: 1110,
                    y: 462
                },
                {
                    x: 830,
                    y: 130
                },
                {
                    x: 245,
                    y: 190
                }
            ],
            OUT_CARD:
            [
                {
                    x: 404,
                    y: 477
                },
                {
                    x: 1033,
                    y: 462
                },
                {
                    x: 834,
                    y: 182
                },
                {
                    x: 308,
                    y: 190
                }
            ],
            OUT_CARD_2PLAYERS:
            [
                {
                    x: 155,
                    y: 477
                },
                {
                    x: 1033,
                    y: 462
                },
                {
                    x: 1036,
                    y: 174
                },
                {
                    x: 308,
                    y: 190
                }
            ],
            PONG_KONG_NODE:
            [
                {
                    x: 150,
                    y: 655
                },
                {
                    x: 1212,
                    y: 507
                },
                {
                    x: 940,
                    y: 80
                },
                {
                    x: 190,
                    y: 80
                }
            ]
        }


    export var HAND_CARD_ACTION_TYPE =
        {
            MOVE_HORIZONTAL: 1,
            INSERT_DRAW_CARD: 2,
            DRAW_CARD_ME: 3,
            DRAW_CARD_OTHER: 4
        }

    export var GAME_STATUS_TYPE =
        {
            ready: 1,
            playing: 2,
            over: 3,
            allOver: 4,
            before_playing: 5,
            waiting: 6,//等待下局开始
        }

    export var GAIN_TYPE =
        {
            CHOW: 1,
            PONG: 2,
            PongKong: 3,
            Exposed: 4,
            ConcealedKong: 5// 暗杠
        }

    export var OPERATE_TYPE =
        {
            pong: 1,
            kong: 2,
            win: 3,
            ready: 4,
            pass: 5,
            chow: 6
        }


    export var FaFenType = {
        KONG: 1,               //明扛
        CONCEALED_KONG: 2,     //暗扛
        FLOWER_KONG: 3,        //花扛
        DNXB: 4,               //东南西北
        DISCARD_4: 5,          //出4张一样的
        DISCARD_SAME: 6        //同时跟打4张一样的
    }


    export var DIRECT_DESC =
        {
            [1]: "东", [2]: "南", [3]: "西", [4]: "北"
        }



    export var ACTION_DATA =
        {
            OPERATE:
            {
                KONG:
                {
                    index: 1,
                    data: {
                        name: "gang",
                        dragonbonesData: "gang_ske_json",
                        textureData: "gang_tex_json",
                        texture: "gang_tex_png"
                    }
                },
                WIN:
                {
                    index: 2,
                    data: {
                        name: "hupai",
                        dragonbonesData: "hupai_ske_json",
                        textureData: "hupai_tex_json",
                        texture: "hupai_tex_png"
                    }
                },
                PONG:
                {
                    index: 3,
                    data: {
                        name: "peng",
                        dragonbonesData: "peng_ske_json",
                        textureData: "peng_tex_json",
                        texture: "peng_tex_png"
                    }
                },
                HUA_KONG:
                {
                    index: 4,
                    data: {
                        name: "huagang",
                        dragonbonesData: "huagang_ske_json",
                        textureData: "huagang_tex_json",
                        texture: "huagang_tex_png"
                    }
                },
                BUHUA:
                {
                    index: 5,
                    data: {
                        name: "buhua",
                        dragonbonesData: "buhua_ske_json",
                        textureData: "buhua_tex_json",
                        texture: "buhua_tex_png"
                    }
                },
                SIFENG:
                {
                    index: 6,
                    data: {
                        name: "sifeng",
                        dragonbonesData: "sifeng_ske_json",
                        textureData: "sifeng_tex_json",
                        texture: "sifeng_tex_png"
                    }
                },
                PASS:
                {
                    index: 7,
                    data: {
                        name: "pass",
                        dragonbonesData: "pass_ske_json",
                        textureData: "pass_tex_json",
                        texture: "pass_tex_png"
                    }
                }
            },
            FIREWORKS:
            {
                index: 7,
                data: {
                    name: "yanhua",
                    dragonbonesData: "yanhua_ske_json",
                    textureData: "yanhua_tex_json",
                    texture: "yanhua_tex_png"
                }
            },
            ARROW:
            {
                index: 8,
                data: {
                    name: "mark",
                    dragonbonesData: "mark_ske_json",
                    textureData: "mark_tex_json",
                    texture: "mark_tex_png"
                }
            },
            SHAIZI:
            {
                index: 9,
                data: {
                    dragonbonesData: "",
                    textureData: "",
                    texture: ""
                }
            },
            CARDEFFECT:
            {
                index: 10,
                data: {
                    dragonbonesData: "",
                    textureData: "",
                    texture: ""
                }
            },
            FENGXIANG:
            {
                index: 11,
                data:
                {
                    name: "fengxiang",
                    dragonbonesData: "fengxiang_ske_json",
                    textureData: "fengxiang_tex_json",
                    texture: "fengxiang_tex_png"
                }
            },
            FENGXIANG_3D:
            {
                index: 12,
                data:
                {
                    name: "3d_feng",
                    dragonbonesData: "3d_feng_ske_json",
                    textureData: "3d_feng_tex_json",
                    texture: "3d_feng_tex_png"
                }
            }


        }

    export var ACTION_POSITION =
        {
            OPERATE:
            [
                {
                    x: 641,
                    y: 570
                },
                {
                    x: 955,
                    y: 292
                },
                {
                    x: 627,
                    y: 127
                },
                {
                    x: 302,
                    y: 303
                }
            ],
            FA_FEN:
            [
                {
                    x: 145,
                    y: 492
                },
                {
                    x: 1134,
                    y: 292
                },
                {
                    x: 906,
                    y: 155
                },
                {
                    x: 145,
                    y: 292
                }
            ],
            CHAT_MSG:
            {
                EMOTION:
                [
                    {
                        x: 245,
                        y: 492
                    },
                    {
                        x: 1034,
                        y: 292
                    },
                    {
                        x: 806,
                        y: 155
                    },
                    {
                        x: 245,
                        y: 292
                    }
                ],
                TEXT:
                [
                    {
                        x: 345,
                        y: 492
                    },
                    {
                        x: 934,
                        y: 292
                    },
                    {
                        x: 706,
                        y: 155
                    },
                    {
                        x: 345,
                        y: 292
                    }
                ]

            },
            VOICE:
            [
                {
                    x: 145,
                    y: 472
                },
                {
                    x: 1134,
                    y: 272
                },
                {
                    x: 856,
                    y: 35
                },
                {
                    x: 145,
                    y: 272
                }
            ]
        }


    export var ACTION_DIR_ARROW_DATA =
        [
            {
                actindex: 0,
                offx: 78,
                offy: 101
            },
            {
                actindex: 1,
                offx: 126,
                offy: 63
            },
            {
                actindex: 2,
                offx: 78,
                offy: 25
            },
            {
                actindex: 3,
                offx: 30,
                offy: 63
            }
        ]


    export var ACTION_DIR_ARROW_DATA_3D =
        [
            {
                actindex : 0,
                offx : 80,
                offy : 102
            },
            {
                actindex : 1,
                offx : 148,
                offy : 60
            },
            {
                actindex : 2,
                offx : 80,
                offy : 17
            },
            {
                actindex : 3,
                offx : 10,
                offy : 59
            }
        ]


    export var ACTION_WIN_ACTINDEX =
        {
            hu: "hu",
            zimo: "zimo",
            dihu: "dihu",
            tianhu: "tianhu",
            gangkai: "gangkai"
        }

    export var POINT_EMOTION_NAME =
        [
            "meigui",
            "feiwen",
            "ganbei",
            "dushen",
            "jidan",
            "zhuantou",
            "caidao",
            "zhadan"
        ]

    export var CHAT_EMOTION_NAME =
        [
            "daxiao",
            "hongyun",
            "ku",
            "koubi",
            "shaoxiang",
            "tuosai",
            "tuxue",
            "wenhao",
            "zaijian",
            "zan",
            "zhuakuang",
            "shanzi",
        ]
    export var CARD_MODE =
        {
            mode_2d: 1,
            mode_3d: 2
        }

    export var PLAYER_HEAD_POSITION_DATA =
    {
        [CARD_MODE.mode_2d] :
        [
            {x : 48,y : 492},
            {x : 1232,y : 282},
            {x : 976,y : 82},
            {x : 48,y : 282}
        ],
        [CARD_MODE.mode_3d] :
        [
            {x : 48,y : 512},
            {x : 1232,y : 262},
            {x : 976,y : 82},
            {x : 48,y : 262}
        ]
    }

    export var PLAYER_HEAD_POSITION = PLAYER_HEAD_POSITION_DATA[CARD_MODE.mode_2d]

    //  export var JIA_PAI_NODE_POS =
    //     {
    //         [GameConst.CARD_MODE.mode_2d] :
    //         [
    //             {x : 114,y : 480},
    //             {x : 1168,y : 278},
    //             {x : 1039,y : 40},
    //             {x : 114,y : 278},
    //         ],
    //         [GameConst.CARD_MODE.mode_3d] :
    //         [
    //             {x : 114,y : 480},
    //             {x : 1168,y : 228},
    //             {x : 1039,y : 40},
    //             {x : 114,y : 228},
    //         ]
    //     }



    export var CHAT_MSG_TYPE =
        {
            EMOTION: 1,//表情
            TEXT: 2,//文字
            VOICE: 3 // 语音
        }

    export var DissolveRoomType = {
        MASTER: 1,     //房主解散
        DAIKAI: 2,     //代开解散
        TIMEOUT: 3     //超时解散
    }

    export var POINT_EMOTION_PRICE = [88, 88, 58, 58, 188, 188, 188, 188];

    //status 0 未选择 1- 申请  2- 同意  3 - 拒绝
    export var APPLY_QUIT_STATUS =
        {
            unchosen: 0,
            apply: 1,
            agree: 2,
            reject: 3
        }

    //status 0 未选择 1- 申请  2- 同意  3 - 拒绝
    export var CHANGE_PALYER_NUM_STATUS =
        {
            unchosen: 0,
            apply: 1,
            agree: 2,
            reject: 3
        }

    export var specialHuType = {
        NONE: 0,
        GODHU: 1, // 天胡
        SUPRICHSEVDUI: 2,  // 超级豪华七对
        RICHSEVDUI: 3,  // 豪华七对
        PAIRSSEVDUI: 4,  // 双七对
        SECONDHU: 5, // 地胡
        SEAFISHMONTH: 6, // 海底捞月
        BIGSTICKBLOOM: 7, // 大杠开花
        STICKBLOOM: 8, // 小杠开花
        SEVENDUI: 9,  // 七对
        ALLINONE: 10,  // 清一色
        PRESSJUE: 11,  // 压绝
        ONLYFISHING: 12,  // 全球独钓
        HUNYICE: 13,  // 混一色
        PAIRSHU: 14,  // 对对胡
        FIGHU: 15, // 无花果
    }

    export var SOUND_TYPE_ENUM =
        {
            nanjing: 0,
            standard: 1
        }

    export var card_back_index = 0
    export var card_face_index = 0
    export var game_bg_index = 0
    export var card_mode_index = CARD_MODE.mode_2d
    export var sound_type = SOUND_TYPE_ENUM.nanjing
    export var forbid_emotion = false
    export var forbid_voice = false



    export var REPLAY_TYPE =
        {
            DISCARD: 1,
            DRAW: 2,
            PONG: 3,
            KONG: 4,
            FAFEN: 5,
            JIAPAI: 6,
            CANCELJIPAI: 7,
            TING: 8,
            PASS: 10,
            PLAY_STATUS: 11,
            AUTO_HOST: 12,
            OPERATE: 14,
            OPERATE_CLICK: 15,
        }

        export var top_pongKong_face_rotation = [180,180,180,180,90,-90]

        export var pongKong_back_img_data =
        {

            [GameConst.PLAY_DIR.down]: {
                [0]:
                {
                    [0]: { [0]: "3d_me_pair_2{0}_png", [1]: "3d_me_pair_reverseside_2{0}_png" },
                    [1]: { [0]: "3d_me_pair_1{0}_png", [1]: "3d_me_pair_reverseside_1{0}_png" },
                    [2]: { [0]: "3d_me_pair_3{0}_png", [1]: "3d_me_pair_reverseside_3{0}_png" },
                    [3]: { [0]: "3d_me_pair_2{0}_png", [1]: "3d_me_pair_reverseside_2{0}_png" },
                    [4]: { [0]: "3d_me_pair_1_dao{0}_png" },
                    [5]: { [0]: "3d_me_pair_3_dao{0}_png" },
                },
                [1]:
                {
                    [0]: { [0]: "3d_me_pair_5{0}_png", [1]: "3d_me_pair_reverseside_5{0}_png" },
                    [1]: { [0]: "3d_me_pair_4{0}_png", [1]: "3d_me_pair_reverseside_4{0}_png" },
                    [2]: { [0]: "3d_me_pair_6{0}_png", [1]: "3d_me_pair_reverseside_6{0}_png" },
                    [3]: { [0]: "3d_me_pair_5{0}_png", [1]: "3d_me_pair_reverseside_5{0}_png" },
                    [4]: { [0]: "3d_me_pair_4_dao{0}_png" },
                    [5]: { [0]: "3d_me_pair_6_dao{0}_png" },
                },
                [2]:
                {
                    [0]: { [0]: "3d_me_pair_7{0}_png", [1]: "3d_me_pair_reverseside_7{0}_png" },
                    [1]: { [0]: "3d_me_pair_7{0}_png", [1]: "3d_me_pair_reverseside_7{0}_png" },
                    [2]: { [0]: "3d_me_pair_6{0}_png", [1]: "3d_me_pair_reverseside_6{0}_png" },
                    [3]: { [0]: "3d_me_pair_7{0}_png", [1]: "3d_me_pair_reverseside_7{0}_png" },
                    [4]: { [0]: "3d_me_pair_7_dao{0}_png" },
                    [5]: { [0]: "3d_me_pair_6_dao{0}_png" },
                },
                [3]:
                {
                    [0]: { [0]: "3d_me_pair_5{0}_png", [1]: "3d_me_pair_reverseside_5{0}_png" },
                    [1]: { [0]: "3d_me_pair_6{0}_png", [1]: "3d_me_pair_reverseside_6{0}_png" },
                    [2]: { [0]: "3d_me_pair_4{0}_png", [1]: "3d_me_pair_reverseside_3{0}_png" },
                    [3]: { [0]: "3d_me_pair_5{0}_png", [1]: "3d_me_pair_reverseside_5{0}_png" },
                    [4]: { [0]: "3d_me_pair_6_dao{0}_png" },
                    [5]: { [0]: "3d_me_pair_4_dao{0}_png" },
                }
            },
            [GameConst.PLAY_DIR.up]:
            {
                [0]:
                {
                    [0]: { [0]: "3d_me_pair_5{0}_png", [1]: "3d_me_pair_reverseside_5{0}_png" },
                    [1]: { [0]: "3d_me_pair_4{0}_png", [1]: "3d_me_pair_reverseside_3{0}_png" },
                    [2]: { [0]: "3d_me_pair_6{0}_png", [1]: "3d_me_pair_reverseside_6{0}_png" },
                    [3]: { [0]: "3d_me_pair_5{0}_png", [1]: "3d_me_pair_reverseside_5{0}_png" },
                    [4]: { [0]: "3d_me_pair_4_dao{0}_png" },
                    [5]: { [0]: "3d_me_pair_6_dao{0}_png" },
                },
                [1]:
                {
                    [0]: { [0]: "3d_me_pair_7{0}_png", [1]: "3d_me_pair_reverseside_7{0}_png" },
                    [1]: { [0]: "3d_me_pair_6{0}_png", [1]: "3d_me_pair_reverseside_6{0}_png" },
                    [2]: { [0]: "3d_me_pair_7{0}_png", [1]: "3d_me_pair_reverseside_7{0}_png" },
                    [3]: { [0]: "3d_me_pair_7{0}_png", [1]: "3d_me_pair_reverseside_7{0}_png" },
                    [4]: { [0]: "3d_me_pair_6_dao{0}_png" },
                    [5]: { [0]: "3d_me_pair_7_dao{0}_png" },
                },
                [2]:
                {
                    [0]: { [0]: "3d_me_pair_5{0}_png", [1]: "3d_me_pair_reverseside_5{0}_png" },
                    [1]: { [0]: "3d_me_pair_6{0}_png", [1]: "3d_me_pair_reverseside_6{0}_png" },
                    [2]: { [0]: "3d_me_pair_4{0}_png", [1]: "3d_me_pair_reverseside_4{0}_png" },
                    [3]: { [0]: "3d_me_pair_5{0}_png", [1]: "3d_me_pair_reverseside_5{0}_png" },
                    [4]: { [0]: "3d_me_pair_6_dao{0}_png" },
                    [5]: { [0]: "3d_me_pair_4_dao{0}_png" },
                },
                [3]:
                {
                    [0]: { [0]: "3d_me_pair_2{0}_png", [1]: "3d_me_pair_reverseside_2{0}_png" },
                    [1]: { [0]: "3d_me_pair_3{0}_png", [1]: "3d_me_pair_reverseside_3{0}_png" },
                    [2]: { [0]: "3d_me_pair_1{0}_png", [1]: "3d_me_pair_reverseside_1{0}_png" },
                    [3]: { [0]: "3d_me_pair_2{0}_png", [1]: "3d_me_pair_reverseside_2{0}_png" },
                    [4]: { [0]: "3d_me_pair_3_dao{0}_png" },
                    [5]: { [0]: "3d_me_pair_1_dao{0}_png" },
                }
            },
        }

        export var card_face_data_3d_up_down =
        [
            17,
            16,
            13,
            10,
            7,
            5,
            4,
            3,
            2,
            1,
            0,
            -2,
            -2,
            -4,
            -5,
            -7,
            -10,
            -13,
            -16,
            -17,
        ]
}