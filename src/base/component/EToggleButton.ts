class EToggleButton extends eui.ToggleButton {
	public constructor() {
		super();
	}

	protected buttonReleased() {
		game.LogUtils.info("点击按钮----");
		game.SoundService.getInstance().playAudio("game_button_click_mp3");
	}


}

window["EToggleButton"] = EToggleButton