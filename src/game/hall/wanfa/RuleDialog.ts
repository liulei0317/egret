module game {
	export class RuleDialog extends EDialog{
		private btnClose:EButton;
		private tab1:eui.ToggleButton;
		private tab2:eui.ToggleButton;

		private ruleLabel:eui.Label;

        private labelTab1:eui.Label;
        private labelTab2:eui.Label;

        private selectTabIndex:number = 1;

		public constructor() {
			super(Constants.UI_PANEL_DATA_SET.rulesBox.index);
			this.skinName = "resource/skins/hall/wanfa/ruleDescSkin.exml";
		}

		public onCreateViewComplete():void{
            super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);
			this.addTapEvent(this.tab1,this.showJYZ);
			this.addTapEvent(this.tab2,this.showCKT);
			
			// this.initRuleData();
			this.showJYZ();
            this.updateUI();
		}

		private initRuleData1(){

    var textStr = "一．简介\n" 
    +"进园子是“门一跑一”和“两家干”的游戏规则，增加“花砸2”和“接庄比”两种玩法。\n\n"
    +"二．基本规则\n"
    +"1．“花砸2”：硬花、软花的总数*2。\n"
    +"2．门一跑一：成牌后门清，加10个花，俗称“门一”；在成牌后加底花10个花，俗称“跑一”。\n"
    +"3．两家干：当有两家积分为0时，游戏立即结束。\n"
    +"4．胡牌结算规则：\n"
    +"A．南京麻将成牌后，输赢额度由成牌花的多少来决定。\n"
    +"B．牌型花数：混一色：20个花；对对胡：20个花；压绝：20个花；无花果20个花；清一色：加30个花；全球独钓：加30个花。普通七对：加30个花。双七对：加80个花。豪华双七对：加120个花。超豪华双七对：成牌后算做160个花。\n"
    +"C．杠后开花：小杠开花：加10个花。大杠开花：加20个花。\n"
    +"D．天胡：庄家摸到牌后直接成牌，另外三家直接干。\n"
    +"E．地胡：天听后不碰不杠直接成牌，另加30个花。\n"
    +"F．海底捞月：最后2墩（小于等于4张）时自摸胡牌，加20个花。\n"
    +"5．比下胡规则：胡牌的总花数*2。\n"

    +"比下胡条件：\n"
    +"庄家连庄，接庄比，流局，包牌，大胡（清一色，混一色，对对胡，全球独钓，七对，杠后开花，天胡，地胡、压绝、无花果）、花杠、罚分、一炮多响。\n\n"


    +"三．进园子包牌规则\n"
    +"1．大杠开花和抢杠算自摸\n"
    +"2．外包规则：a.全球独钓，b.三打四包，c.清一色外包。\n\n"

    +"四．其他规则\n"
    +"南京麻将现场汇：分别是“杠”和“罚分”。\n"
    +"超时托管：勾选此规则后，每个玩家整局牌局中总共拥有300秒超时时间。该时间用完后，该局游戏内，玩家再次超时未操作，将进行系统托管。托管将由系统自动摸牌打牌，有操作提示时自动选择“过”。\n\n"

    +"五．结算\n"
    +"结算页面显示的输赢=玩家携带积分-100。";

	this.ruleLabel.text = textStr;
	
   
	}

	private initRuleData2(){
		var textStr = "一．简介\n"
    + "南京麻将敞开头沿用了现实“门一跑一”的游戏规则。\n\n"
    + "二．基本规则\n"
    + "1．“花砸2”：硬花、软花的总数乘2。\n"
    + "2．门一跑一：成牌后门清，加10个花，俗称“门一”；在成牌后加底花10个花，俗称“跑一”。\n"
    + "3．胡牌结算规则：\n"
    + "A．南京麻将成牌后，输赢额度由成牌花的多少来决定。\n"
    + "B．牌型花数：混一色：20个花；对对胡：20个花；压绝：20个花；无花果20个花；清一色：加30个花；全球独钓：加30个花。七对：加30个花。双七对：加80个花。豪华双七对：加120个花。超豪华双七对：成牌后算做160个花。\n"
    + "C．杠后开花：小杠开花：加10个花。大杠开花：加20个花。\n"
    + "D．天胡：加200个花。地胡：天听后不碰不杠直接成牌，加30个花。海底捞月：最后2墩（小于等于4张）时自摸胡牌，加20个花。\n"
    + "4. 比下胡规则：胡牌的总花数*2。\n"
    + "比下胡条件：\n"
    + "庄家连庄，接庄比，流局，包牌，大胡（清一色，混一色，对对胡，全球独钓，七对，杠后开花，天胡，地胡、压绝、无花果）、花杠、罚分、一炮多响。\n\n"
    + "三．敞开头包牌规则\n"
    + "1．大杠开花和抢杠算自摸。2.三打四包。3.清一色包牌。\n\n"
    + "四．其他规则\n"
    + "南京麻将现场汇：“杠”和“罚分”。\n"
    + "超时托管：勾选此规则后，每个玩家整局牌局中总共拥有300秒超时时间。该时间用完后，该局游戏内，玩家再次超时未操作，将进行系统托管。托管将由系统自动摸牌打牌，有操作提示时自动选择“过”。"

	this.ruleLabel.text = textStr;
	}

       
        protected updateUI_(){
			this.tab1.selected = false;
			this.tab2.selected = false;       
            this.labelTab1.textColor = 0x874208;
            this.labelTab2.textColor = 0x874208;   
            this.labelTab1.stroke = 0;
            this.labelTab2.stroke = 0;
            if(this.selectTabIndex == 1){
                this.labelTab1.textColor = 0xFFFFFF;
                this.tab1.selected = true;
                this.labelTab1.stroke = 2;
            }else if(this.selectTabIndex == 2){
                this.labelTab2.textColor = 0xFFFFFF;
                this.tab2.selected = true;
                this.labelTab2.stroke = 2;
            }

            // this.labeltab1.

            // if(this.clubData.selected){
            //     this.labelClubName.textColor = 0xFFFFFF;
            //     this.labelClubMemberNum.textColor = 0xFFFFFF;
            // }else{
            //     this.labelClubName.textColor = 0x855F3C;
            //     this.labelClubMemberNum.textColor = 0x855F3C;
            // }            
        }

		private showJYZ(){
			// this.tab1.selected = true;
			// this.tab2.selected = false;
            this.selectTabIndex = 1;
			this.initRuleData1();
            this.updateUI();
		}

		private showCKT(){
			// this.tab1.selected = false;
			// this.tab2.selected = true;
            this.selectTabIndex = 2;
			this.initRuleData2();
            this.updateUI();
		}	


        public clean(){
            super.clean();
        }
		
	}
}