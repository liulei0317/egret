class ClubRoomUserItem extends game.EComponent {
	private labelNickName: eui.Label;
	private imgHeadIcon: eui.Image;
	private labelLeave: eui.Label;
	private labelHost: eui.Label;
	private imgMask: eui.Image;

	private labelHide: eui.Label;
	private groupShow: eui.Group;

	private clubRoomUserData: game.ClubRoomUserData;
	private permissions: any;
	private isGaming: boolean;

	public constructor(clubRoomUserData, permissions, isGaming) {
		super();
		this.clubRoomUserData = clubRoomUserData;
		this.permissions = permissions;
		this.isGaming = isGaming;
		this.skinName = "resource/skins/club/room/clubRoomUserItemSkin.exml";
	}

	public onCreateViewComplete(): void {
		super.onCreateViewComplete();
		this.updateUI();
	}

	public setData(data: any, permissions, isGaming) {
		console.log("data==" + data);
		this.clubRoomUserData = data;
		this.permissions = permissions;
		this.isGaming = isGaming;
		this.updateUI();
	}

	protected updateUI_() {
		var self = this;
		if (this.clubRoomUserData != null) {
			this.labelNickName.text = this.clubRoomUserData.nickName;

			this.labelLeave.visible = false;
			this.imgMask.visible = false;
			this.labelHost.visible = false;
			var hasDefaultRight = game.ClubService.getInstance().checkDefaultRight(this.permissions);
			if (hasDefaultRight) {
				if (this.clubRoomUserData.userStatusType == GameConst.PLAYER_STATUS.LEAVE || this.clubRoomUserData.userStatusType == GameConst.PLAYER_STATUS.OFFLINE) {
					this.labelLeave.visible = true;
					this.labelLeave.y = 36;
					this.imgMask.visible = true;
					this.labelLeave.text = "离开";
					if (this.clubRoomUserData.userStatusType == GameConst.PLAYER_STATUS.OFFLINE) {
						this.labelLeave.text = "离线";
					}
				}

				var autoHost = this.clubRoomUserData.autoHost;
				this.labelHost.visible = autoHost;
				if (autoHost) {
					this.imgMask.visible = true;
					this.labelHost.y = 36;
				}
				if (this.labelLeave.visible && this.labelHost.visible) {
					this.labelLeave.y = 24;
					this.labelHost.y = 47;
				}
			}
			self.imgHeadIcon.visible = true;
			game.ResManager.loadWebImage(this.clubRoomUserData.headImgUrl, function (texture: any) {
				self.imgHeadIcon.texture = texture;
				self.imgHeadIcon.addEventListener(eui.UIEvent.COMPLETE, () => {
					self.imgHeadIcon.texture = texture;
				}, this)
			}, this);
		} else {
			this.labelHide.visible = this.isGaming;
			this.groupShow.visible = !this.isGaming;
			if (!this.isGaming) {
				this.labelNickName.text = "";
				this.imgMask.visible = false;
				this.labelLeave.visible = false;
				this.labelHost.visible = false;
				this.imgHeadIcon.visible = false;
			}

		}
	}
}
window["ClubRoomUserItem"] = ClubRoomUserItem