class TurnNumberRadioButton extends game.EComponent {
	private radioButton: ERadioButton;
	private labelCostNum: eui.Label;
	private rect: eui.Rect;
	public constructor() {
		super();
		this.skinName = "resource/skins/hall/room/turnModeRadioSkin.exml";
	}

	public onCreateViewComplete(): void {
		super.onCreateViewComplete();
		this.addTapEvent(this.rect, this.onThisClick);
	}

	private onThisClick() {
		this.radioButton.setSelected(!this.radioButton.isSelected());
	}

	public setSelected(selected) {
		this.radioButton.setSelected(selected);
	}

	public setText(turnInfo, costNum) {
		this.radioButton.setText(turnInfo);
		this.labelCostNum.text = "x" + costNum;
	}


}
window["TurnNumberRadioButton"] = TurnNumberRadioButton