class ClubCombatRecordsUI extends game.EComponent {
	private scrollerTables: EScroller;
	private clubMemberDataList: game.ClubApplyJoinData[];

	private clubData: game.ClubData;
	private zhanjiUI: ZhanJiUI;
	private clubId: string;
	public constructor() {
		super();
		this.skinName = "resource/skins/club/combatRecord/clubCombatsUISkin.exml";
	}

	public onCreateViewComplete(): void {
		super.onCreateViewComplete();
		this.zhanjiUI.fromClub = true;
		this.updateUI();
	}

	protected updateUI_() {
		if (this.clubId != null) {
			this.zhanjiUI.getCombatList_Club(this.clubId);
		}
	}

	public setData(clubId) {
		this.clubId = clubId;
		this.updateUI();
	}



	public clean() {
		super.clean();
	}

}
window["ClubCombatRecordsUI"] = ClubCombatRecordsUI