module game {
	export class ClubLuckyRecordItem extends game.EComponent {
		private clubData: game.ClubData;
		private date: eui.Label
		private desc: eui.Label
		private recordsData: ClubBlessChangedRecordsData;

		public constructor(clubData: ClubData, blessRecordData) {
			super();
			this.clubData = clubData
			this.recordsData = blessRecordData
			this.skinName = "resource/skins/club/luckyScore/ClubLuckyRecordItem.exml";
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.updateUI();
		}
		public setData(clubData: ClubData, data: any) {
			this.clubData = clubData;
			this.recordsData = data;
			this.updateUI();
		}
		protected updateUI_() {
			const LUCY_SOURCE_DATA = ["试试手气", "麻将", "比鸡", "转蛋", "体力商城", "跑得快"]
			let source = this.recordsData.source
			let blessNum = this.recordsData.changeNum
			let userName = this.recordsData.nickName || "您"
			let sourceName = LUCY_SOURCE_DATA[source - 1]
			let info_str = ""
			GameUtils.sub(this.desc, userName, 177)
			userName = this.desc.text
			this.desc.text = ""
			let tmpText = []
			// this.desc.textFlow = [
			// 	{ text: "", style: { size: 26, textColor: 0xffffff } },
			// 	{ text: "", style: { size: 26, textColor: 0xffffff } }
			// ]
			switch (source) {
				case 1:
					if (blessNum >= 0) {
						tmpText = [
							{ text: "管理员将\"" + userName + "\"的体力增加", style: { size: 26, textColor: 0x9D4D0A } },
							{ text: "" + Math.abs(blessNum), style: { size: 26, textColor: 0x3480be } }
						]
					}
					else {
						tmpText = [
							{ text: "管理员将\"" + userName + "\"的体力减少", style: { size: 26, textColor: 0x9D4D0A } },
							{ text: "" + Math.abs(blessNum), style: { size: 26, textColor: 0x3480be } }
						]
					}
					break;
				case 2:
				case 3:
				case 4:
				case 6:
					if (blessNum > 0) {
						tmpText = [
							{ text: userName + "在\"" + sourceName + "\"游戏中 体力 增加", style: { size: 26, textColor: 0x9D4D0A } },
							{ text: "" + Math.abs(blessNum), style: { size: 26, textColor: 0x3480be } }
						]
					}
					else {
						tmpText = [
							{ text: userName + "在\"" + sourceName + "\"游戏中 体力 减少", style: { size: 26, textColor: 0x9D4D0A } },
							{ text: "" + Math.abs(blessNum), style: { size: 26, textColor: 0x3480be } }
						]
					}
					break;
				case 5:
					tmpText = [
						{ text: userName + "在\"" + sourceName + "\"中 体力 减少", style: { size: 26, textColor: 0x9D4D0A } },
						{ text: "" + Math.abs(blessNum), style: { size: 26, textColor: 0x3480be } }
					]
					break;
				default:
					break;
			}
			this.desc.textFlow = tmpText
			this.date.text = DateUtils.dateFormat(this.recordsData.createTime)
		}
		public clean() {
			super.clean();
		}
	}
}