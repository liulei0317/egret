module game {
	export class ClubFindOtherMemeberLucky extends EDialog {
		private editSearch: eui.EditableText
		private btnClose: EButton
		private btnIDFind: EButton
		private clubData: game.ClubData
		public constructor(clubData) {
			super(null, false);
			this.skinName = "resource/skins/club/luckyScore/ClubFindOtherMemeberLucky.exml";
			this.clubData = clubData
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose, () => {
				this.close();
			})
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_blesschangerecord), this.blessChangeCallBack, this);

			this.addTapEvent(this.btnIDFind, () => {
				let key: string = this.editSearch.text
				if (key.length == 0) {
					DialogManager.getInstance().popUp1("请输入玩家的ID")
					return
				}
				var element: any = { clubId: this.clubData.clubId, memberId: key };
				var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_blesschangerecord, element);
				SocketManager.getInstance().send(requestDomain);
			})
		}
		private blessChangeCallBack(event: egret.Event) {
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				this.close();
				EAppFacade.getInstance().sendNotification(game.GameCmd.CLUB_REFRESH_BLESS_LIST, msgDomain.data)
			}
			else if (msgDomain.errorCode == MsgConstant.ERROR_club_bless_isnot_member) {
				DialogManager.getInstance().popUp1("请输入正确的俱乐部成员ID")
			}
		}
		public clean() {
			super.clean();
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_blesschangerecord), this.blessChangeCallBack, this);
		}
	}
}