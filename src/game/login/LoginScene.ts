module game {
	export class LoginScene extends SceneBase {
		private btnGuestLogin1: eui.Label;
		private btnGuestLogin2: eui.Label;
		private btnGuestLogin3: eui.Label;
		private btnGuestLogin4: eui.Label;
		private btnGuestLogin5: eui.Label;
		private Group_test: eui.Group;

		private weChatLoginBtn: any = null

		// private logininfo:MsgLoginInfo = null;

		private connectCount = 0;

		private userInfo: any

		private guestStartIndex = 0;
		////////////////////
		private lbTime: eui.Label
		private btn_codeLogin: EButton
		private btn_getCode: EButton
		private editableTextPhoneNumber: eui.EditableText
		private editableTextCodeNumber: eui.EditableText
		private timerTrigger: egret.Timer
		private currentTime: number = 60
		public constructor() {
			super(Constants.SCENE_INDEX.LOGIN);
			this.skinName = "resource/skins/login/loginSceneSkin.exml";
		}

		public onCreateViewComplete(): void {
			if (GameConfig.platform == GameConfig.PLATFORM_SET.H5) {
				this.Group_test.visible = GameConfig.isDebug
				this.addTapEvent(this.btnGuestLogin1, this.guestLogin);
				this.addTapEvent(this.btnGuestLogin2, this.guestLogin);
				this.addTapEvent(this.btnGuestLogin3, this.guestLogin);
				this.addTapEvent(this.btnGuestLogin4, this.guestLogin);
				this.addTapEvent(this.btnGuestLogin5, this.guestLogin);
			}
			else {
				this.Group_test.visible = false
			}
			// this.addTapEvent(this.btnWeiXinLogin, this.wxLoginEvent.bind(this));
			this.addTapEvent(this.btn_getCode, this.clickGetSmsCode)
			this.addTapEvent(this.btn_codeLogin, this.clickPhoneNumberLogin)
			EAppFacade.getInstance().registerCommand(GameCmd.SOCKET_STATUS_CHANGE, this.connectHandler, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_LOGIN), this.userloginCallback, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_phoneNumber_login), this.phoneNumberLoginCallBack, this);

			GameHttpManager.checkAppUpdate()

			this.getLocation()
			// this.connectSocketServer(true)
			RES.createGroup("load", ["common_json", "bg_mp3", "shareResult"])
			RES.loadGroup("load");
			if (GameConfig.platform == GameConfig.PLATFORM_SET.weChat) {
				this.initLoginBtn();
			}
			let unionId = DataStorage.readLocalData(DataStorageConst.DATA_KEY_UnionId);
			if (unionId.length > 0 && unionId != "undefined") {
				let info: game.MsgLoginInfo = new game.MsgLoginInfo();
				info.unionId = unionId
				info.loginUserType = LoginUserType.SMS
				UserInfoService.getInstance().setLoginInfo(info);
				if (ConnectService.getInstance().getStatus() == ConnectConst.ConnectStatus.Connected) {
					CommonView.showWaiting();
					game.UserInfoService.getInstance().login(info);
				} else {
					this.connectSocketServer(true);
				}
			}
			// if(egret.Capabilities.isMobile)
			// {
			// 	DialogManager.getInstance().popUp2("是否全屏显示？",()=>{
			// 		setNoSleepEnabled();
			// 		Utils.fullScreen();
			// 		// Utils.toggleFullScreen();
			// 	})
			// }
		}

		private initLoginBtn() {
			var btnW = 306
			var realW = btnW / GameConfig.ScreenW * GameConfig.windowWidth / GameConfig.pixelRatio
			var btnH = 102
			var realH = btnH / GameConfig.ScreenH * GameConfig.windowHeight / GameConfig.pixelRatio
			this.weChatLoginBtn = wx.createUserInfoButton({
				type: 'image',
				image: "button_login_1.png",
				style: {
					left: (GameConfig.windowWidth / GameConfig.pixelRatio - realW) / 2,
					top: 444 / GameConfig.ScreenH * GameConfig.windowHeight / GameConfig.pixelRatio,
					width: realW,
					height: realH,
					lineHeight: 40,
					backgroundColor: '#ff0000',
					color: '#ffffff',
					textAlign: 'center',
					fontSize: 16,
					borderRadius: 4
				}
			})
			this.weChatLoginBtn.onTap((res) => {
				if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
					// 处理用户拒绝授权的情况
					CommonView.showToast("授权失败")
				} else {
					this.wxLoginByWechatLoginBtnEvent(res)
				}
			});
			this.weChatLoginBtn.show();//我们测试的时候，需要用手机预览才看得到按钮~！微信开发工具上看不到！
		}

		private async getLocation() {
			var lastLocation = GlobalData.userData.getLocation()
			if (lastLocation.latitude != 0 || lastLocation.longitude != 0) {
				return
			}
			const location = await platform.getLocation()

			if (location != null) {
				console.log(location)
				GlobalData.userData.setLocation(location.longitude, location.latitude)
			}
		}


		private async wxLoginByWechatLoginBtnEvent(res) {
			CommonView.showWaiting()
			if (this.weChatLoginBtn) {
				this.weChatLoginBtn.hide();
			}
			var userInfo = res.userInfo;
			console.log(res)
			if (userInfo.nickName == undefined || userInfo.nickName == null) {
				CommonView.hideWaiting()
				console.log("userInfo is null")
				this.weChatLoginBtn.show();
				return
			}
			console.log(userInfo);
			this.userInfo = res.userInfo;
			var loginData = await platform.login();
			if (loginData.code == undefined || loginData.code == null) {
				CommonView.hideWaiting()
				console.log("loginData is null")
				this.weChatLoginBtn.show();
				return
			}
			console.log(loginData);
			var encryptedData = res.encryptedData
			var iv = res.iv
			GameHttpManager.getUnionId(loginData.code, encryptedData, iv, this.getUnionIdCallBack.bind(this))
		}

		private async wxLoginEvent() {
			var hasProblem = await this.checkAuthSetting()
			if (hasProblem) {
				console.log("checkAuthSetting failed")
				return
			}
			CommonView.showWaiting()
			var info = await platform.getUserInfo(() => {
				CommonView.hideWaiting();
				game.DialogManager.getInstance().popUp1("您拒绝授权，重新授权页面的进入路径为：右上角菜单->关于（小程序名字）->右上角菜单->设置")
			});
			var idx = info.errMsg.indexOf('auth deny')
			console.log(info)
			if (info.errMsg.indexOf('auth deny') > -1 || info.errMsg.indexOf('auth denied') > -1) {
				// 处理用户拒绝授权的情况
				CommonView.hideWaiting();
				game.DialogManager.getInstance().popUp1("您拒绝授权，重新授权页面的进入路径为：右上角菜单->关于（小程序名字）->右上角菜单->设置")
				return;
			}
			var userInfo = info.userInfo
			console.log(userInfo)
			if (userInfo.nickName == undefined || userInfo.nickName == null) {
				CommonView.hideWaiting()
				console.log("userInfo is null")
				return
			}
			console.log(userInfo);
			this.userInfo = userInfo;
			var loginData = await platform.login();

			if (loginData.code == undefined || loginData.code == null) {
				CommonView.hideWaiting()
				console.log("loginData is null")
				return
			}
			console.log(loginData);
			var encryptedData = info.encryptedData
			var iv = info.iv
			GameHttpManager.getUnionId(loginData.code, encryptedData, iv, this.getUnionIdCallBack.bind(this))
		}

		private async checkAuthSetting() {
			var setInfo = await platform.getSetting()
			console.log(setInfo)
			var authSetting = setInfo.authSetting
			if (authSetting['scope.userInfo'] === true) {
				// 用户已授权，可以直接调用相关 API
			} else if (authSetting['scope.userInfo'] === false) {
				// 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
				game.DialogManager.getInstance().popUp1("您拒绝授权，重新授权页面的进入路径为：右上角菜单->关于（小程序名字）->右上角菜单->设置")
				return true
			} else {
				// 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
			}
			return false
		}

		private getUnionIdCallBack(data) {
			CommonView.hideWaiting()
			if (data.code == CmdResultType.SUCCESS) {
				console.log(data)
				var backData = data.data
				var unionId = backData.unionId
				var openId = backData.openId

				var vo: game.MsgLoginInfo = new game.MsgLoginInfo();
				vo.openId = openId;
				vo.channel = "mina";
				vo.platform = "qinghuai";
				vo.headImgUrl = this.userInfo.avatarUrl;
				vo.nickName = this.userInfo.nickName;
				vo.gender = this.userInfo.gender;
				vo.unionId = unionId;
				// if(guestIndex == 1){
				// 	vo.unionId = "3211";
				// }
				vo.hasRegisterInfo = true;
				vo.loginUserType = game.LoginUserType.WEIXIN;
				UserInfoService.getInstance().setLoginInfo(vo);
				if (ConnectService.getInstance().getStatus() == ConnectConst.ConnectStatus.Connected) {
					CommonView.showWaiting();
					game.UserInfoService.getInstance().login(vo);
				} else {
					this.connectSocketServer(true);
				}
			} else {
				CommonView.showToast(Strings.loginFailed)
				if (this.weChatLoginBtn) {
					this.weChatLoginBtn.show();
				}
			}
		}

		private connectSocketServer(showUI: boolean) {
			CommonView.showWaiting();
			this.connectCount++;
			game.ConnectService.getInstance().connect(true);
		}

		private connectHandler(event: egret.Event) {
			if (event.data != null) {
				var status = event.data.status;
				if (status == ConnectConst.ConnectStatus.ConnectClose) {
					// if (this.connectCount >= 5) {
					// 	CommonView.hideWaiting();
					// 	DialogManager.getInstance().popUp1("连接服务器失败，请重试!", function () {
					// 		this.connectCount = 0;
					// 		this.connectSocketServer();
					// 	}.bind(this));
					// } else {
					var idTimeout: number = egret.setTimeout(function (arg) {
						// console.log( "timeout:", arg );
						this.connectSocketServer(false);
					}, this, 2000, "egret"
					);
					// }
				} else if (status == ConnectConst.ConnectStatus.Connected) {

					// CommonView.showToast("连接成功");
					// if(DataStorage.readLocalData(DataStorageConst.DATA_KEY_UnionId).length<=0){
					// 	game.UserInfoService.getInstance().login(this.logininfo);	
					// }
					// EAppFacade.getInstance().removeCommand(GameCmd.SOCKET_STATUS_CHANGE,this.connectHandler,this);
				}
			}
		}

		public guestLogin(event: eui.UIEvent) {
			var guestIndex: number = this.getGuestIndex(event);
			// event.currentTarget
			var vo: game.MsgLoginInfo = new game.MsgLoginInfo();
			var guestCode = 1
			// var guestCode = 3209;
			vo.openId = "openId_" + (guestCode + guestIndex);
			vo.channel = "android";
			vo.platform = "qinghuai";
			vo.headImgUrl = "http://wx.qlogo.cn/mmopen/QiaGV991oIlm6kG5bjbRKhq5AeRWfOiaAibLqMon7F5iceQ7o31Pvj7mUroEb7W32KZiad9DrkGVMvJx4ULDJiaKRCzh8LEAzGR3Sv/0";
			vo.nickName = "guest_" + (guestCode + guestIndex);
			vo.gender = ((guestIndex % 2) == 0) ? game.GenderType.MAN : game.GenderType.WOMAN;
			vo.unionId = "unionId_" + (guestCode + guestIndex);
			// if(guestIndex == 1){
			// 	vo.unionId = "3211";
			// }
			vo.hasRegisterInfo = true;
			vo.loginUserType = game.LoginUserType.GUEST;
			UserInfoService.getInstance().setLoginInfo(vo);
			// this.logininfo = vo;
			// DataStorage.writeLocalData(DataStorageConst.DATA_KEY_UnionId,vo.unionId);
			// game.UserInfoService.getInstance().login(vo);
			if (ConnectService.getInstance().getStatus() == ConnectConst.ConnectStatus.Connected) {
				CommonView.showWaiting();
				game.UserInfoService.getInstance().login(vo);
			} else {
				this.connectSocketServer(true);
			}

		}
		private clickGetSmsCode() {
			let phoneNumer = this.editableTextPhoneNumber.text
			if (phoneNumer.length == 0) {
				CommonView.showToast("请输入手机号")
				return
			}
			// SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_USER_getLoginSmsCode, {
			// 	phoneNumber: phoneNumer,
			// })
			GameHttpManager.getLoginSmsCode(phoneNumer, this.getLoginSmsCodeCallBack.bind(this))
		}
		private clickPhoneNumberLogin() {
			let phoneNumer = this.editableTextPhoneNumber.text
			let code = this.editableTextCodeNumber.text
			if (phoneNumer.length == 0) {
				CommonView.showToast("请输入手机号")
				return
			}
			if (code.length == 0) {
				CommonView.showToast("请输入验证码")
				return
			}
			// SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_USER_phoneNumber_login, {
			// 	phoneNumber: phoneNumer,
			// 	code: code
			// })
			var info: game.MsgLoginInfo = new game.MsgLoginInfo();
			info.phoneNumber = phoneNumer
			info.code = code
			info.loginUserType = LoginUserType.SMS
			UserInfoService.getInstance().setLoginInfo(info);
			if (ConnectService.getInstance().getStatus() == ConnectConst.ConnectStatus.Connected) {
				CommonView.showWaiting();
				game.UserInfoService.getInstance().login(info);
			} else {
				this.connectSocketServer(true);
			}
		}
		private getGuestIndex(event: eui.UIEvent) {
			var label: eui.Label = event.currentTarget;
			if (label == this.btnGuestLogin1) {
				return this.guestStartIndex + 1;
			} else if (label == this.btnGuestLogin2) {
				return this.guestStartIndex + 2;
			} else if (label == this.btnGuestLogin3) {
				return this.guestStartIndex + 3;
			} else if (label == this.btnGuestLogin4) {
				return this.guestStartIndex + 4;
			} else if (label == this.btnGuestLogin5) {
				return this.guestStartIndex + 5;
			} else {
				return 0;
			}
		}

		private userloginCallback(event: egret.Event) {
			CommonView.hideWaiting();
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				SceneSkip.skipToHallScene();
			} else {
				CommonView.showToast("登陆失败，请重试!");
			}
		}
		private phoneNumberLoginCallBack(event: egret.Event) {
			CommonView.hideWaiting();
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				SceneSkip.skipToHallScene();
			} else {
				if (msgDomain.errorCode == MsgConstant.ERROR_sms_code_expired) {
					CommonView.showToast(Strings.smsCode_invalid);
				}
				else if (msgDomain.errorCode == MsgConstant.ERROR_sms_phoneNumber_unBind) {
					let dialog = game.DialogManager.getInstance().show(new BindWeChatBox())
				}
				else {
					CommonView.showToast("登陆失败，请重试");
				}
			}
		}
		private getLoginSmsCodeCallBack(event: egret.Event) {
			let data: any = event;
			let msgDomain: game.MsgDomain = data;
			if (msgDomain.code == game.CmdResultType.SUCCESS)
				this.codeTimer()
			else {
				if (msgDomain.errorCode == MsgConstant.ERROR_sms_phoneNumber_unBind) {
					let dialog = game.DialogManager.getInstance().show(new BindWeChatBox())
				}
				else {
					CommonView.showToast("获取验证失败");
				}
			}
		}
		private codeTimer() {
			this.btn_getCode.enabled = false
			this.lbTime.visible = true
			this.lbTime.text = "60"
			this.timerTrigger = new egret.Timer(1000, 0)
			this.timerTrigger.addEventListener(egret.TimerEvent.TIMER, () => {
				this.currentTime--
				this.lbTime.text = "" + this.currentTime
				if (this.currentTime <= 0) {
					this.btn_getCode.enabled = true
					this.lbTime.text = ""
					this.timerTrigger.stop()
					this.lbTime.visible = false
				}
			}, this);
			//开始计时
			this.timerTrigger.start();
		}
		public clean() {
			if (this.weChatLoginBtn != null) {
				this.weChatLoginBtn.hide();
				this.weChatLoginBtn.destroy();
			}
			EAppFacade.getInstance().removeCommand(GameCmd.SOCKET_STATUS_CHANGE, this.connectHandler, this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_LOGIN), this.userloginCallback, this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_phoneNumber_login), this.phoneNumberLoginCallBack, this);

			super.clean();
		}
	}
}