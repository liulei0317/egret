module game {

	export class ZhanJiDialog extends EDialog{
		private btnClose:EButton;
        private zhanjiUI:ZhanJiUI;
		private btnViewOtherReplay:EButton;
        private combatDataList:game.CombatData[];
		private labelNoRecord:eui.Label;

		public constructor() {
			super(Constants.UI_PANEL_DATA_SET.zhanjiBox.index);
			this.skinName = "resource/skins/hall/zhanji/zhanJiSkin.exml";
		}

		public onCreateViewComplete():void{
            super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);
			this.addTapEvent(this.btnViewOtherReplay,this.viewReplay);

			game.EAppFacade.getInstance().registerCommand(game.GameCmd.ZHANJI_HAS,this.hasZhanJi,this);	

            this.zhanjiUI.getCombatList();
		}	

		private viewReplay(){
			var dialog = new ViewReplayDialog();
			DialogManager.getInstance().show(dialog);
		}

		private hasZhanJi(event: egret.Event) {
        	var hasZhanji = event.data;
			this.labelNoRecord.visible = !hasZhanji;
    	}


        public clean(){
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.ZHANJI_HAS,this.hasZhanJi,this);	
            super.clean();
        }
	}
}