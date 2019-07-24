module game {
	export class ClubWatcherItem extends EComponent{
		private btnSetting:EButton;

		private imgHead:eui.Image;
		private imgWatcher:eui.Image;

		private labelMemberName:eui.Label;
		private labelMemberID:eui.Label;
		private labelMemberType:eui.Label;
		
		private clubId:string;
		private clubWatcherData:ClubWatcherData;
		
	
		public constructor(clubId,clubWatcherData) {
			super();
			this.clubId = clubId;
			this.clubWatcherData = clubWatcherData;
			this.skinName = "resource/skins/club/watcher/clubWatcherItemSkin.exml";
		}	

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.addTapEvent(this.btnSetting,this.clickSetting);
			this.updateUI();
		}	

		public setData(clubWatcherData:any){
			this.clubWatcherData = clubWatcherData;
			this.updateUI();
		}

		public clickSetting(){
			ClubService.getInstance().setWatcher(this.clubId,this.clubWatcherData.memberId);
		}

		protected updateUI_(){
			if(this.clubWatcherData!=null){
				var self = this;
				ResManager.loadWebImage(this.clubWatcherData.headImgUrl, function (texture: any) {
					self.imgHead.texture = texture;
					self.imgHead.addEventListener(eui.UIEvent.COMPLETE,()=>{
						self.imgHead.texture = texture;
					},this)
				}, this)

				this.labelMemberName.text = this.clubWatcherData.memberName;
				this.labelMemberID.text = this.clubWatcherData.memberId;
				this.labelMemberType.text = ClubUtils.getMemberName(this.clubWatcherData.memberType);
				this.imgWatcher.visible = this.clubWatcherData.watcher;
			}
		}	
	}
}