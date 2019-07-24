module game {
	export class ClubRoomData {
		public roomJson:any;
		public roomUsers:ClubRoomUserData[];
		public gaming:boolean ;

		public curTurnNum:number;//第几把 第几圈
		public curTurnDirection:number; //当前圈向


		public constructor() {
		}

		public parse(jsonData){
			this.roomJson = jsonData.roomJson;
			this.gaming = jsonData.gaming;
			this.curTurnNum = jsonData.curTurnNum;
			this.curTurnDirection = jsonData.curTurnDirection;


			this.roomUsers = [];
			var jsonData = jsonData.roomUsers;                
			for(var key in jsonData)
			{
				var itemData = jsonData[key];
				var clubTableData = new ClubRoomUserData();
				clubTableData.parse(itemData);
				this.roomUsers.push(clubTableData);
			}
		}

		public getTemplateColor(){
			var obj:any = this.roomJson;
			var templateColor = obj.templateColor;
			return templateColor;
		}

		public getTemplateId(){
			var obj:any = this.roomJson;
			var templateId = obj.templateId;
			return templateId+"";
		}	

		public getCreatePlayerNum(){
			var obj:any = this.roomJson;
			var createPlayerNum = obj.createPlayerNum;
			return createPlayerNum;
		}				


		public updateTemplateInfo(clubRuleData:ClubRuleData){
			this.roomJson.templateColor = clubRuleData.getTemplateColor();
			this.roomJson.calNum = clubRuleData.getCalNum();
			this.roomJson.templateNum = clubRuleData.getTemplateName();
		}		
	}
}