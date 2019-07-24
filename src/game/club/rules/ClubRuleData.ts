module game {
	export class ClubRuleData {
		public roomJson: any;

		public constructor(roomJson: JSON) {
			this.roomJson = roomJson;
		}

		public parse(jsonData) {
			this.roomJson = jsonData.roomJson;

		}

		public clone() {
			var s = JSON.stringify(this.roomJson);
			return new ClubRuleData(JSON.parse(s));
		}

		public getClubID() {
			var roomInfos: any = this.roomJson;
			return roomInfos.clubId;
		}

		public getRulesInfo() {
			return game.RoomUtils.getRulesInfo(this.roomJson);
		}

		public getTemplateName() {
			var roomInfos: any = this.roomJson;
			var templateName = roomInfos.templateName;
			if (templateName) {
				return templateName;
			} else {
				return "无";
			}
		}

		public getTemplateID() {
			var roomInfos: any = this.roomJson;
			return roomInfos.templateId;
		}

		public getTemplateColor() {
			var roomInfos: any = this.roomJson;
			return roomInfos.templateColor;
		}

		public setTemplateColor(templateColor) {
			var roomInfos: any = this.roomJson;
			roomInfos.templateColor = templateColor;
		}

		public getCalNum() {
			var roomInfos: any = this.roomJson;
			return roomInfos.calNum;
		}

		public getCustomInfo() {
			var roomInfos: any = this.roomJson;
			var calNum = roomInfos.calNum;
			if (!calNum) {
				calNum = 0;
			}
			return "记分:" + calNum + "/100分";
		}
	}
}