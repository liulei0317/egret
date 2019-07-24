class CombatUserItem extends game.EComponent {
	private labelNickName: eui.Label;
	private labelScore: eui.Label;
	private labelWaiBaoScore: eui.Label;
	private lab2: eui.Label
	private imgMaster: eui.Image;

	private combatUserData: game.CombatUserData;
	private masterId: string;
	private fromClub: boolean;
	public constructor() {
		super();
		this.skinName = "resource/skins/hall/zhanji/combatUserItemSkin";
	}

	public onCreateViewComplete(): void {
		super.onCreateViewComplete();
		this.updateUI();
	}

	public setData(masterId: string, data: any, fromClub: boolean) {
		this.masterId = masterId;
		this.combatUserData = data;
		this.fromClub = fromClub
		this.updateUI();
	}

	protected updateUI_() {
		if (this.isViewCreated && this.combatUserData != null) {
			this.labelNickName.text = this.combatUserData.nickName;

			this.labelScore.text = this.combatUserData.score + "";
			// this.labelScore.textColor = game.ZhanJiColorUtils.getScoreColor(this.combatUserData.score);
			game.ZhanJiColorUtils.setScoreLabelFormat(this.labelScore, this.combatUserData.score)

			if (!this.fromClub) {
				this.labelWaiBaoScore.text = this.combatUserData.waiBaoScore + "";
				// this.labelWaiBaoScore.textColor = game.ZhanJiColorUtils.getWaiboScoreColor(this.combatUserData.waiBaoScore);
				game.ZhanJiColorUtils.setScoreLabelFormat(this.labelWaiBaoScore, this.combatUserData.waiBaoScore)
				this.labelWaiBaoScore.visible = true
				this.lab2.visible = true
			}
			else {
				this.labelWaiBaoScore.visible = false
				this.lab2.visible = false
				if (this.combatUserData.showCalNum) {
					this.lab2.visible = true;
					this.lab2.text = "记分："
					this.labelWaiBaoScore.visible = true
					// this.labelWaiBaoScore.text = "" + this.combatUserData.calNum
					game.ZhanJiColorUtils.setScoreLabelFormat(this.labelWaiBaoScore, this.combatUserData.calNum)

				}
			}
			this.imgMaster.visible = (this.combatUserData.userId == this.masterId);
		}
	}
}
window["CombatUserItem"] = CombatUserItem