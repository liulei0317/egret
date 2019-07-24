module game {
	export class ConstantUtils {
		public constructor() {
		}

		public static getRoomTypeName(roomType){
			return (roomType == Constants.ROOM_TYPE.jinYuanZi)?"进园子":"敞开头";
		}

		public static getPayModeName(payMode,fromClub){
			if(GlobalData.clientConfigs.showCreateRoom == "0" && GameConfig.platform == GameConfig.PLATFORM_SET.weChat)
			{
				return "";
			}else
			{
				if(payMode == Constants.ROOM_PAY_MODE.AA){
					return "AA付费";
				}else if(payMode == Constants.ROOM_PAY_MODE.creator){
					return "房主付费";
				}else if(payMode == Constants.ROOM_PAY_MODE.other){
					if(fromClub){
						return "会长付费";
					}else{
						return "代开模式";
					}
				}else{
					return "未知";
				}
			}
			
		}		

		public static getTurnModeName(turnMode){
			if(turnMode == Constants.ROOM_TIME_MODE.ba){
				return "把";
			}else{
				return "圈";
			}
		}


		public static getItemIconName(itemType){
			if(itemType == Constants.Item_Type.DIAMOND){
				return "icon_card_png";
			}else if(itemType == Constants.Item_Type.GOLD){
				return "icon_gold_png";		
			}else if(itemType == Constants.Item_Type.RMB){
				return "icon_red_package_png";										
			}else{
				return null;
			}
		}						
	}
}