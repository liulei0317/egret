module game {
	export class ClubItem extends EComponent{
		private labelClubName:eui.Label;
		private labelClubMemberNum:eui.Label;
		private labelGameName:eui.Label;
		private imgSelfClub:eui.Image;
		private toggle:EToggleButton;
		private imgRedTip:eui.Image;

		private clubData:ClubData;
	
		public constructor(clubData) {
			super();
			this.clubData = clubData;
			this.skinName = "resource/skins/club/clubItemSkin.exml";
		}	
		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.addTapEvent(this.toggle,this.clickItem);
			this.updateUI();
		}	

		public setData(data:any){
		
			this.clubData = data;
			this.updateUI();
		}

		private clickItem(){
			EAppFacade.getInstance().sendNotification(GameCmd.CLICK_CLUB_ITEM,this.clubData);
		}

		protected updateUI_(){
			if(this.clubData!=null){
				this.toggle.selected = this.clubData.selected;
				this.labelClubName.text = this.clubData.clubName;
				this.labelClubMemberNum.text = this.clubData.onLineNum+"/"+this.clubData.allNum;
				this.labelGameName.text = "麻将";
				this.imgSelfClub.visible = (this.clubData.memberType == ClubConst.MemberType.MONITOR);
				this.imgRedTip.visible = this.clubData.hasShowRedTip;

				if(this.clubData.selected){
					this.labelClubName.textColor = 0xFFFFFF;
					this.labelClubMemberNum.textColor = 0xFFFFFF;
				}else{
					this.labelClubName.textColor = 0x855F3C;
					this.labelClubMemberNum.textColor = 0x855F3C;
				}
			}
		}		
	}
}