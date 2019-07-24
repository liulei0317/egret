class EButton extends eui.Button{
		public constructor() {
			super();
		}

		protected buttonReleased(){
			super.buttonReleased();
			// if(!GlobalData.onlightFlag)
			// {
			// 	var myVideo = document.getElementsByTagName("video")[0];
    		// 	myVideo.play();
			// 	GlobalData.onlightFlag = true;
			// }
			game.LogUtils.info("点击按钮----");
			game.SoundService.getInstance().playAudio("game_button_click_mp3");
		}
}
window["EButton"] = EButton