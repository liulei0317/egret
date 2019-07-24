module game {

	export class GainListDialog extends EDialog{
		private btnClose:EButton;
		private list:EScroller;

        private gainDataList:game.GainData[];
        
        private roomId:number = 0;
		public constructor(roomId:number) {
			super(Constants.UI_PANEL_DATA_SET.clubRecordDetails.index);
			this.skinName = "resource/skins/hall/zhanji/gainListSkin.exml";
            this.roomId = roomId;
		}

		public onCreateViewComplete():void{
            super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);
			this.initScroller();

            EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_ZHANJI_DES_LIST),this.getGainListBack,this);

            this.getGainList();
		}	

        private getGainList(){
            ZhanjiService.getInstance().getGainList(this.roomId);            
        }

        private getGainListBack(event:egret.Event){
            var msgDomain:MsgDomain = event.data;
            if(msgDomain.code == CmdResultType.SUCCESS){
                this.gainDataList = [];
                var jsonData = msgDomain.data;                
                for(var key in jsonData)
                {
                    var itemData = jsonData[key];
                    var gainData = new GainData();
                    gainData.parse(itemData);
                    this.gainDataList.push(gainData);
                }
                this.updateUI();
            }
            
        }


       private initScroller()
        {
            this.list.setElementViewInfo(120,8);
            this.list.setElementCreateFunction(this.createElement.bind(this));
            this.list.setElementUpdateDataFun(this.updateElement.bind(this));
            this.list.setElementUpdateUIFun(this.updateElementUI.bind(this));
        }		
    
		private createElement(data)
        {
        
            var item = new GainItem(data);
            return item;
        }

        private updateElement(item: GainItem,data:any)
        {
            item.setData(data);
        }

        private updateElementUI(item: GainItem)
        {
            item.updateUI();
        }		

		protected updateUI_(){
            this.list.clearContent();
            this.list.setScrollerContent(this.gainDataList);
		}

        public clean(){
            EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_ZHANJI_DES_LIST),this.getGainListBack,this);
            super.clean();
        }
	}
}