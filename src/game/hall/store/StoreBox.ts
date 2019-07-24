module game {
	export class StoreBox extends EDialog{

		private dmdNum:eui.Label;
		private goldNum:eui.Label;

		private btnBack:EButton;

		private tab1:eui.ToggleButton;
		private tab2:eui.ToggleButton;

		private tabTitle1:eui.ToggleButton;
		private tabTitle2:eui.ToggleButton;



        private diamondItemGrp:eui.DataGroup;
		private dmdItem0:DiamondItem;
		private dmdItem1:DiamondItem;
		private dmdItem2:DiamondItem;
		private dmdItem3:DiamondItem;
		private dmdItem4:DiamondItem;
		private dmdItem5:DiamondItem;

		private goldItemGrp:eui.DataGroup;
		private goldItem0:GoldItem;
		private goldItem1:GoldItem;
		private goldItem2:GoldItem;
		private goldItem3:GoldItem;
		private goldItem4:GoldItem;
		

		private diaMondItemData:any;
		private goldItemData:any;

		public static STORE_TAB = 
		{
			GOLD : 1,
			DIAMOND : 2,
		}
		private curTabIndex:number = StoreBox.STORE_TAB.DIAMOND
		public constructor(params:any) {
			super(Constants.UI_PANEL_DATA_SET.shop.index);
			if (params != null && params.tabIndex)
			{
				this.curTabIndex = params.tabIndex
			}
			this.skinName = "resource/skins/hall/store/storeMainSkin.exml";
		}


		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.addTapEvent(this.btnBack,this.clickBack);
			this.addTapEvent(this.tab1,this.tabToDimamond);
			this.addTapEvent(this.tab2,this.tabToGold);
			this.addTapEvent(this.tabTitle1,this.tabToDimamond);
			this.addTapEvent(this.tabTitle2,this.tabToGold);

			
			this.getStoreList();

            this.updateDiamondNum()
			this.updateGoldNum();
			this.diamondItemGrp.visible = true;
			this.goldItemGrp.visible = false;
			this.tab1.selected = true;

			EAppFacade.getInstance().registerCommand(GameCmd.DIAMOND_NUMBER_CHANGE,this.updateDiamondNum,this);
            EAppFacade.getInstance().registerCommand(GameCmd.GOLD_NUMBER_CHANGE,this.updateGoldNum,this);

			if(this.curTabIndex == StoreBox.STORE_TAB.DIAMOND)
			{
				this.tabToDimamond()
			}else if(this.curTabIndex == StoreBox.STORE_TAB.GOLD)
			{
				this.tabToGold()
			}

	    } 

		private updateDiamondNum()
        {
            this.dmdNum.text = GlobalData.userData.getDiamondNum() +"";
        }

        private updateGoldNum()
        {
            this.goldNum.text = GlobalData.userData.getGoldNum() +"";
        }


        private clickBack(){
			this.close()
		}

		private tabToDimamond(){
			this.diamondItemGrp.visible = true;
			this.goldItemGrp.visible = false;
			this.tab1.selected = true;
			this.tab2.selected = false;
		}

		private tabToGold(){
			this.diamondItemGrp.visible = false;
			this.goldItemGrp.visible = true;
			this.tab1.selected = false;
			this.tab2.selected = true;
		}

		private getStoreList(){
			StoreService.getInstance().getStoreList(this.getStoreListBack.bind(this));
		}

		 private getStoreListBack(event:egret.Event){
			 var data:any = event;
            var msgDomain:MsgDomain = data;
            if(msgDomain.code == CmdResultType.SUCCESS){
                var jsonData = msgDomain.data;
				this.diaMondItemData = jsonData.diamonds;
				this.goldItemData = jsonData.golds;
				                
                var dmdItems = [this.dmdItem0,this.dmdItem1,this.dmdItem2,this.dmdItem3, this.dmdItem4,this.dmdItem5];
				var goldItems = [this.goldItem0,this.goldItem1,this.goldItem2,this.goldItem3,this.goldItem4];

				var len = this.diaMondItemData.length;
				for(var i = 0;i<len;i++){
					var diamondData = null;
					if(i<len){
						diamondData = this.diaMondItemData[i];
					}
					dmdItems[i].setData(diamondData);
				}

				var len_ = this.goldItemData.length;
				for(var i = 0;i<len_;i++){
					var goldData = null;
					if(i<len){
						goldData = this.goldItemData[i];
					}
					goldItems[i].setData(goldData);
				}
                console.log("======>>>>>"+goldData);
				
			}
		}

		public clean()
        {
            EAppFacade.getInstance().removeCommand(GameCmd.DIAMOND_NUMBER_CHANGE,this.updateDiamondNum,this);
            EAppFacade.getInstance().removeCommand(GameCmd.GOLD_NUMBER_CHANGE,this.updateGoldNum,this);
            super.clean();
        }


	}

		
}