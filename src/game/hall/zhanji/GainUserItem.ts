class GainUserItem extends game.EComponent {
	private labelNickName: eui.Label;
	private labelScore: eui.Label;
	private labelFaScore: eui.Label;
	private labelWaiBaoScore: eui.Label;
	private imgMaster: eui.Image;
	private icon_banker: eui.Image
	private gainUserData: game.GainUserData;
	private bankerChairId: number;
	public constructor() {
		super();
		this.skinName = "resource/skins/hall/zhanji/gainUserItemSkin";
	}

	public onCreateViewComplete(): void {
		super.onCreateViewComplete();
		this.updateUI();
	}

	public setData(bankerChairId: number, data: any) {
		this.bankerChairId = bankerChairId;
		this.gainUserData = data;
		this.updateUI();
	}

	protected updateUI_() {
		if (this.gainUserData != null) {
			this.labelNickName.text = this.gainUserData.nickName;
			game.ZhanJiColorUtils.setScoreLabelFormat(this.labelScore, this.gainUserData.curScore)

			// getFaScoreColor
			var faScore = this.gainUserData.faScore;
			var showFa = (faScore != 0);
			this.labelFaScore.visible = showFa;
			if (showFa) {
				if (faScore > 0) {
					this.labelFaScore.text = "+" + faScore;
				} else {
					this.labelFaScore.text = faScore + "";
				}
				this.labelFaScore.textColor = game.ZhanJiColorUtils.getFaScoreColor(faScore);
			}
			game.ZhanJiColorUtils.setScoreLabelFormat(this.labelWaiBaoScore, this.gainUserData.waibaoScore)
			this.icon_banker.visible = (this.gainUserData.userChairId == this.bankerChairId);
		}
	}
}
window["GainUserItem"] = GainUserItem