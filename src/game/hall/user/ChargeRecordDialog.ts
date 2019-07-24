module game {
	export class ChargeRecordDialog extends EDialog{

		private btnClose:EButton;

		private tab1:EToggleButton;
		private tab2:EToggleButton;

		private labelTab1:eui.Label;
		private labelTab2:eui.Label;

		private scrollerTables:EScroller;

		private labelItemName:eui.Label;

		private selectTabIndex:number = 1;

		private recordDataList:ChargeRecordData[];

		public constructor() {
			super();
			this.skinName = "resource/skins/hall/user/chargeRecordDialogSkin.exml";
		}


		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);
			this.addTapEvent(this.tab1,this.selectTab1);
			this.addTapEvent(this.tab2,this.selectTab2);

			this.initScroller();

			this.selectTab1();	
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
				this.labelItemName.text = "钻石";
            }else if(this.selectTabIndex == 2){
                this.labelTab2.textColor = 0xFFFFFF;
                this.tab2.selected = true;
                this.labelTab2.stroke = 2;	
				this.labelItemName.text = "金币";			
            }   
			if(this.recordDataList){
				this.scrollerTables.setScrollerContent(this.recordDataList, false);
			}      
        }		

		private initScroller() {
			// this.scrollerTables.setScrollerHeight(434);
			this.scrollerTables.setElementViewInfo(58, 8);
			this.scrollerTables.setElementCreateFunction(this.createElement.bind(this));
			this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this));
			this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this));
		}	


		private createElement(data) {
			var item = new game.ChargeRecordItem(data);
			return item;
		}

		private updateElement(item: game.ChargeRecordItem, data: any) {
			item.setData(data);
			// console.info("roomData == "+item.toString());
		}

		private updateElementUI(item: game.ChargeRecordItem) {
			item.updateUI();
		}			

		private getRecordListBack(event: egret.Event) {	
			var data:any = event;
			var msgDomain: game.MsgDomain = data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.recordDataList = msgDomain.data;
				this.updateUI();
			}
		}		

 					

		private  selectTab1(){
			this.selectTabIndex = 1;
			GameHttpManager.getDiamondRecord(GlobalData.userData.getUserId(),this.getRecordListBack.bind(this));
			// this.updateUI();
		}


		private  selectTab2(){
			this.selectTabIndex = 2;
			GameHttpManager.getGoldRecord(GlobalData.userData.getUserId(),this.getRecordListBack.bind(this));
			// this.updateUI();
		}		

		public clean(){
			super.clean();
		}

	}
}