class ERadioButton extends game.EComponent {
	private imgOn: eui.Image;
	private labelText: eui.Label;
	private rect: eui.Rect;
	private selected: boolean = false;

	public constructor() {
		super();
	}

	public onCreateViewComplete(): void {
		super.onCreateViewComplete();
		this.addTapEvent(this.rect, this.onThisClick);
	}

	private onThisClick() {
		this.setSelected(!this.selected);
	}

	public setSelected(selected) {
		this.selected = selected;
		this.imgOn.visible = this.selected;
	}

	public isSelected() {
		return this.selected;
	}

	public setText(text) {
		this.labelText.text = text;
	}

	public setFontFamily(fontFamily) {
		this.labelText.fontFamily = fontFamily;
	}

	public setFontSize(fontSize) {
		this.labelText.size = fontSize;
	}

	public setFontColor(color) {
		this.labelText.textColor = color;
	}
}
window["ERadioButton"] = ERadioButton