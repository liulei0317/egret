module game {
	export class SettingDialog extends EDialog {
		private imgPerson: eui.Image;
		private labelNickName: eui.Label;
		private btnChangeAccount: EButton;
		private btnFeedback: EButton;

		// private btnBgMusic:eui.Image;
		// private btnSound:eui.Image;
		// private btnAbout:EButton;
		private btnClose: EButton;

		// private imgBgMusicOff:eui.Image;
		// private imgBgMusicOn:eui.Image;

		// private imgSoundOff:eui.Image;
		// private imgSoundOn:eui.Image;

		private versionCode: eui.Label
		private toggleMusic: EToggleButton;
		private toggleSound: EToggleButton;

		public constructor() {
			super(Constants.UI_PANEL_DATA_SET.setting.index);
			this.skinName = "resource/skins/hall/settingDialogSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.versionCode.text = "当前版本:" + GameConfig.version
			this.addTapEvent(this.btnClose, this.close);
			// this.addTapEvent(this.btnAbout,this.showAbout);
			this.addTapEvent(this.toggleMusic, this.switchBgMusic);
			this.addTapEvent(this.toggleSound, this.switchSound);
			this.addTapEvent(this.btnChangeAccount, this.switchAccount);
			this.addTapEvent(this.btnFeedback, this.clickFeedback);

			this.updateUI();
		}

		protected updateUI_() {
			this.labelNickName.text = UserInfoService.getInstance().getUserInfo().getUserName();
			var imageUrl = UserInfoService.getInstance().getUserInfo().getHeadIMGUrl();
			var self = this;
			ResManager.loadWebImage(imageUrl, function (texture: any) {
				self.imgPerson.texture = texture;
				self.imgPerson.addEventListener(eui.UIEvent.COMPLETE, () => {
					self.imgPerson.texture = texture;
				}, this)
			}, this)

			this.updateUI_BgMusic();
			this.updateUI_Sound();

		}

		private updateUI_BgMusic() {
			var isOn = SoundService.getInstance().getBgMusicSwitch();
			this.toggleMusic.selected = isOn;
		}

		private updateUI_Sound() {
			var isOn = SoundService.getInstance().getAudioSwitch();
			this.toggleSound.selected = isOn;
		}

		// private showAbout(){
		// 	DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.about.index)
		// }

		private switchBgMusic() {
			SoundService.getInstance().setBgMusicSwitch(!SoundService.getInstance().getBgMusicSwitch());
			this.updateUI_BgMusic();
			if (SoundService.getInstance().getBgMusicSwitch()) {
				SoundService.getInstance().playMusic();
			} else {
				SoundService.getInstance().pauseBgMusic();
			}
		}
		private switchSound() {
			SoundService.getInstance().setAudioSwitch(!SoundService.getInstance().getAudioSwitch());
			this.updateUI_Sound();
			if (!SoundService.getInstance().getAudioSwitch()) {
				SoundService.getInstance().stopAllAudio();
			}
		}

		private switchAccount() {
			game.DialogManager.getInstance().popUp2("是否注销当前账号", () => {
				if (CommonView.broadcast != null) {
					CommonView.broadcast.clearAllData()
				}
				DataStorage.removeLocalData(DataStorageConst.DATA_KEY_UnionId);
				ConnectService.getInstance().stopTimer();
				ConnectService.getInstance().close();
				GlobalData.userData.cleanUser();
				SceneSkip.skipToLoginScene();
				game.GlobalService.init();
			})
		}

		private clickFeedback() {
			var dialog = new FeedbackDialog();
			DialogManager.getInstance().show(dialog);
		}
	}
}