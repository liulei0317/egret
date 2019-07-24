class NoClubUI extends game.EComponent{

	private btnCreate:EButton;
	private btnJoin:EButton;

	public constructor() {
		super();
		this.skinName = "resource/skins/club/noClubUISkin.exml";
	}

	public onCreateViewComplete(): void {
		super.onCreateViewComplete();
		this.addTapEvent(this.btnCreate,this.clickCreate);
		this.addTapEvent(this.btnJoin,this.clickJoin);
	}

	private clickCreate(){
		var dialog = new game.ClubCreateDialog();
		game.DialogManager.getInstance().show(dialog);
	}
	private clickJoin(){
		var dialog = new game.JoinClubDialog();
		game.DialogManager.getInstance().show(dialog);
	}
	
}


window["NoClubUI"] = NoClubUI