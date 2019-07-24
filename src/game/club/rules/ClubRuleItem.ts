module game {
	export class ClubRuleItem extends EComponent{
		private imgTitleBg:eui.Image;
		private labelRuleName:eui.Label;
		private btnCustomSet:EButton;
		private btnDelete:EButton;
		private labelCustomInfo:eui.Label;
		private labelRuleInfo:eui.Label;

		
		private clubRuleData:ClubRuleData;
		
	
		public constructor(clubRuleData) {
			super();
			this.clubRuleData = clubRuleData;
			this.skinName = "resource/skins/club/rules/clubRuleItemSkin.exml";
		}	

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.addTapEvent(this.btnCustomSet,this.clickCustomSet);
			this.addTapEvent(this.btnDelete,this.clickDelete);
			this.updateUI();
		}	

		public setData(clubRuleData:any){
			this.clubRuleData = clubRuleData;
			this.updateUI();
		}

		public clickCustomSet(){
			var dialog = new ClubRuleEditDialog(this.clubRuleData);
			DialogManager.getInstance().show(dialog);
		}

		protected updateUI_(){
			if(this.clubRuleData!=null){
				var colorIndex = this.clubRuleData.getTemplateColor();
				if(!colorIndex){
					colorIndex = 1;
				}
				this.imgTitleBg.source = "img_color_room_"+colorIndex+"_png";

				this.labelRuleName.text = this.clubRuleData.getTemplateName();
				this.labelCustomInfo.text = this.clubRuleData.getCustomInfo();
				this.labelRuleInfo.text = this.clubRuleData.getRulesInfo();

			}
		}	

		private clickDelete(){
			var self = this;
			DialogManager.getInstance().popUp2(Strings.club_rule_delete_tips,function(){
				var clubId = self.clubRuleData.getClubID();
				var templateId = self.clubRuleData.getTemplateID();
				ClubRuleService.getInstance().deleteClubRule(clubId,templateId);
			});
		}	 			
	}
}