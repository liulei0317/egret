module game {
	export class ChargeRecordItem extends EComponent{
		
		private labelTime:eui.Label;
		private labelInfo:eui.Label;
		private labelNum:eui.Label;

		private chargeRecordData:ChargeRecordData;
	
		public constructor(chargeRecordData) {
			super();
			this.chargeRecordData = chargeRecordData;
			this.skinName = "resource/skins/hall/user/chargeRecordItemSkin.exml";
		}	

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.updateUI();
		}	

		public setData(chargeRecordData:any){
			this.chargeRecordData = chargeRecordData;
			this.updateUI();
		}
	

		

		protected updateUI_(){
			if(this.chargeRecordData!=null){
				this.labelTime.text = DateUtils.dateFormat1(this.chargeRecordData.recordTime,false);
				var itemNum = this.chargeRecordData.itemNum;
				this.labelNum.text = itemNum>0?("+"+itemNum):(""+itemNum);
				this.labelInfo.text = this.getChangeInfo(this.chargeRecordData.itemType,this.chargeRecordData.chgType);
			}
		}	

		private getChangeInfo(itemType,chgType){
			var info = this.getChangeInfo_common(chgType);
			if(info){
				return info;
			}
			if(itemType == Constants.Item_Type.DIAMOND){
				if(chgType == Item_Change_Diamond.BIND_PROXY_TYPE){
					return "绑定代理奖励";
				}else if(chgType == Item_Change_Diamond.BACK_TYPE){
					return "房间返还";
				}else if(chgType == Item_Change_Diamond.CREATE_ROOM_TYPE){
					return "创建房间";
				}else if(chgType == Item_Change_Diamond.JOIN_ROOM_TYPE){
					return "加入房间";					
				}else{
					return "其它";
				}
			}else if(itemType == Constants.Item_Type.GOLD){
				if(chgType == Item_Change_Gold.ANI_COST_TYPE){
					return "道具消耗";
				}else{
					return "其它";
				}
			}else{
				return "其它";
			}
		}

		private getChangeInfo_common(chgType){
			if(chgType == Item_Change_Type.OTHER_TYPE){
				return "其它";
			}else if(chgType == Item_Change_Type.EMAIL_TYPE){
				return "通过邮件领取";
			}else if(chgType == Item_Change_Type.TASK_TYPE){
				return "任务奖励";
			}else if(chgType == Item_Change_Type.ACTIVITY_TYPE){
				return "活动奖励";
			}else if(chgType == Item_Change_Type.PROXY_GRANT_ADD_TYPE){
				return "代理赠送";
			}else if(chgType == Item_Change_Type.PROXY_GRANT_REDUCE_TYPE){
				return "赠送他人";
			}else if(chgType == Item_Change_Type.SYS_ADMIN_REDUCE_TYPE){
				return "系统扣除";		
			}else if(chgType == Item_Change_Type.SHOP_BUY_TYPE){
				return "商城购买";		
			}else if(chgType == Item_Change_Type.LUCKY_DRAW_TYPE){
				return "转盘奖励";																						
			}else{
				return null;
			}
		}

		public clean(){
			super.clean();
		}		
 			
	}

    //公用变动
	var Item_Change_Type = {
		OTHER_TYPE:0,          //其它
		EMAIL_TYPE:1,          //通过邮件领取
		TASK_TYPE:2,          //任务奖励
		ACTIVITY_TYPE:3,          //活动奖励
		PROXY_GRANT_ADD_TYPE:4,          //代理赠送
		PROXY_GRANT_REDUCE_TYPE:5,          //赠送他人
		SYS_ADMIN_ADD_TYPE:6,          //系统赠送
		SYS_ADMIN_REDUCE_TYPE:7,          //系统扣除
		SHOP_BUY_TYPE:8,          //商城购买
		LUCKY_DRAW_TYPE:9,          //转盘奖励
	}

	

	//钻石变动
	var Item_Change_Diamond = {
		BIND_PROXY_TYPE:101,//绑定代理奖励
		BACK_TYPE:102,//房间返还
		CREATE_ROOM_TYPE:103,//创建房间
		JOIN_ROOM_TYPE:104,//加入房间
	}	

	//金币变动
	var Item_Change_Gold = {
		ANI_COST_TYPE:201,//动画消耗
	}		
}

