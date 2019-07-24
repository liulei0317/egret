module game {
	export class UserInfoService {
		private static instance: UserInfoService;

		private loginInfo: MsgLoginInfo = null;

		private constructor() {
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_LOGIN), this.loginCallBack, this); EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_LOGIN), this.loginCallBack, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_phoneNumber_login), this.loginCallBack, this);
		}
		public static getInstance(): UserInfoService {
			if (UserInfoService.instance == null) {
				UserInfoService.instance = new UserInfoService();
			}
			return UserInfoService.instance;
		}
		public login(loginInfo: MsgLoginInfo) {
			let requestDomain
			this.loginInfo = loginInfo;
			if (this.loginInfo.loginUserType == LoginUserType.SMS) {
				requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_USER_phoneNumber_login, loginInfo);
				SocketManager.getInstance().send(requestDomain);
			}
			else {
				requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_USER_LOGIN, loginInfo);
				SocketManager.getInstance().send(requestDomain);
			}
		}
		public autoLogin() {
			let unionId = DataStorage.readLocalData(DataStorageConst.DATA_KEY_UnionId);
			if (unionId.length > 0 && unionId != "undefined") {
				let loginInfo = new MsgLoginInfo();
				loginInfo.unionId = unionId;
				UserInfoService.getInstance().login(loginInfo);
			} else {
				UserInfoService.getInstance().login(this.loginInfo);
			}
		}
		private loginCallBack(event: egret.Event) {
			CommonView.hideWaiting();
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == MsgResultStatus.SUCCESS) {
				GlobalData.userData.parse(msgDomain.data);
				GlobalData.userData.setDiamondNum(msgDomain.data.diamond);
				GlobalData.userData.setGoldNum(msgDomain.data.gold);
				if (typeof (msgDomain.data.unionId) != 'undefined')
					this.loginInfo.unionId = msgDomain.data.unionId
				this.loginInfo.phoneNumber = msgDomain.data.phoneNumber
				if (this.loginInfo.loginUserType != LoginUserType.GUEST) {
					DataStorage.writeLocalData(DataStorageConst.DATA_KEY_UnionId, this.loginInfo.unionId);
				}
				EAppFacade.getInstance().sendNotification(GameCmd.USER_LOGIN_SUCCESS);

			} else {
				var errorCode = msgDomain.errorCode
				if (errorCode == MsgConstant.ERROR_forbid_login) {
					CommonView.hideWaiting()
					var toastInfo = Utils.format(Strings.fobidLogin, GlobalData.clientConfigs.customer_info)
				}
			}
		}
		public getUserInfo(): UserInfo {
			return GlobalData.userData;
		}
		public setLoginInfo(loginInfo: MsgLoginInfo) {
			this.loginInfo = loginInfo;
		}
	}
}