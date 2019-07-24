module game {
	export class SocketManager {
		private static instance: SocketManager;
		private webSocket: egret.WebSocket;
		private msgHandler: Function;
		private connectHandler: Function;
		private url: string;
		private port: number;
		private status: number = ConnectConst.ConnectStatus.Wait;
		private constructor() {

		}

		public static getInstance(): SocketManager {
			if (SocketManager.instance == null) {
				SocketManager.instance = new SocketManager();
			}
			return SocketManager.instance;
		}

		public connect(url: string, port: number, connectHandler: Function, msgHandler: Function, force: boolean): void {
			if (this.status == ConnectConst.ConnectStatus.Connecting) {
				if (force) {
					this.close();
					this.clean();
				} else {
					return;
				}
			} else if (this.status == ConnectConst.ConnectStatus.Connected) {
				if (force) {
					this.close();
					this.clean();
				} else {
					return;
				}
			}

			this.status = ConnectConst.ConnectStatus.Connecting;
			this.url = url;
			this.port = port;
			this.connectHandler = connectHandler;
			this.msgHandler = msgHandler;

			this.webSocket = new egret.WebSocket();
			this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
			this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
			this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
			if (GameConfig.platform == GameConfig.PLATFORM_SET.H5) {
				this.webSocket.connect(url, port);
			} else if (GameConfig.platform == GameConfig.PLATFORM_SET.weChat) {
				this.webSocket.connectByUrl("wss://" + url + "/wss")
			}



			LogUtils.info("开始连接，" + url + ":" + port);
		}

		// public reConnect(){
		// 	this.close();
		// 	this.connect(this.url,this.port,this.msgHandler);
		// }

		public close() {
			if (this.status != ConnectConst.ConnectStatus.ConnectClose) {
				this.status = ConnectConst.ConnectStatus.ConnectClose;
				this.clean();
				if (this.connectHandler != null) {
					this.connectHandler.call(null, { status: this.status });
				}
			}
		}

		private clean() {
			if (this.webSocket != null) {
				this.webSocket.close();
				this.webSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
				this.webSocket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
				this.webSocket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
				this.webSocket = null;
			}
		}

		private onSocketOpen(): void {

			LogUtils.info("连接成功");
			// var json:any = {};
			// json.cmd = 1567;
			// json.msg = "测试内容";
			// this.send(json);
			this.status = ConnectConst.ConnectStatus.Connected;
			if (this.connectHandler != null) {
				this.connectHandler.call(null, { status: this.status });
			}
		}
		private onSocketClose(): void {
			LogUtils.info("连接关闭");
			this.close();
		}
		private onReceiveMessage(e: egret.Event): void {
			var base64 = this.webSocket.readUTF();
			this.onReceiveMessageEvent(base64)
		}

		public onReceiveMessageEvent(base64) {
			var msg = Base64.decode(base64);
			// LogUtils.info("get数据："+msg);
			if (GameConfig.localVersion) {
				this.msgHandler = game.DispatchHandler.getInstance().dispatch
			}
			if (this.msgHandler != null) {
				this.msgHandler.call(null, msg);
			}
		}

		public send(msgDomain: MsgDomain) {
			if (GameConfig.localVersion) {
				game.Mock.getInstance().use(msgDomain)
			}
			if (msgDomain == null || this.webSocket == null) {
				return;
			}
			var jsonStr = JSON.stringify(msgDomain);
			// LogUtils.info("send数据：" +jsonStr);
			var base64 = Base64Utils.encode(jsonStr + "\n");
			this.webSocket.writeUTF(base64);

		}

		public sendMsg(erea: number, cmd: number, data: any = null) {
			var requestDomain = DomainUtils.getRequestDomain(erea, cmd, data);
			this.send(requestDomain)
		}
	}
}