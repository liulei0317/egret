module game {
	export class ClubApplyJoinItem extends EComponent {
		// private imgHead:eui.Image;
		private labelMemberName: eui.Label;
		private labelMemberID: eui.Label;
		private labelApplyInfo: eui.Label;
		private btnReject: EButton;
		private btnAgree: EButton;


		private clubData: ClubData;
		private clubApplyJoinData: ClubApplyJoinData;
		public constructor(clubData, clubApplyJoinData) {
			super();
			this.clubData = clubData;
			this.clubApplyJoinData = clubApplyJoinData;
			this.skinName = "resource/skins/club/applyJoin/clubApplyJoinItemSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnAgree, this.clickAgree);
			this.addTapEvent(this.btnReject, this.clickReject);
			this.updateUI();
		}

		public setData(clubData, data: any) {
			this.clubData = clubData;
			this.clubApplyJoinData = data;
			this.updateUI();
		}

		protected updateUI_() {
			if (this.clubApplyJoinData != null) {
				var self = this;
				// ResManager.loadWebImage(this.clubApplyJoinData.headImgUrl, function (texture: any) {
				// 	self.imgHead.texture = texture;
				// 	self.imgHead.addEventListener(eui.UIEvent.COMPLETE,()=>{
				// 		self.imgHead.texture = texture;
				// 	},this)
				// }, this)

				this.labelMemberName.text = this.clubApplyJoinData.memberName;
				this.labelMemberID.text = "ID:" + this.clubApplyJoinData.memberId;
				this.labelApplyInfo.text = this.clubApplyJoinData.applyInfo;
			}
		}
		private clickAgree() {
			ClubService.getInstance().checkMemberJoin(this.clubData.clubId, this.clubApplyJoinData.memberId, ClubConst.MemberCheckStatus.PASSED);
		}

		private clickReject() {
			ClubService.getInstance().checkMemberJoin(this.clubData.clubId, this.clubApplyJoinData.memberId, ClubConst.MemberCheckStatus.UNPASS);
		}
	}
}