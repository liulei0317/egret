module game {
	export class ActivityItemData {
		public json:any;
		

		//通告或活动标题,标签上的文字
		public title:string;
		//内容标题
		public contentTitle:string;
		public content:string;
		//0：图片，1：文字，2：链接
		public contentDetailType:number;
		//0：通知，1：活动
		public contentType:number;
		//点击图片 打开游戏的某个功能 0.无效果 1.创建房间 2.战绩列表 3.充值钻石 4.分享  5.复制字符串 6-
		public openGameType:number;
		// public createTime:number;//创建时间
		public startDateTime:number;//创建时间
		public endDateTime:number;//创建时间
		public functionName:string;
		//点击图片复制文字 5.复制字符串
		public eventContent:string;
		// public hasCommend = false;  //是否推荐
		public selected:boolean = false;

		public eventTypeDesc:string;		

		public constructor(json:JSON) {
			this.json = json;
			this.parse();
		}

		private parse(){
			this.title = this.json.title;
			this.contentTitle = this.json.contentTitle;
			this.content = this.json.content;
			this.contentDetailType = this.json.contentDetailType;
			this.contentType = this.json.contentType;
			this.openGameType = this.json.openGameType;
			this.startDateTime = this.json.startDateTime;
			this.endDateTime = this.json.endDateTime;
			this.functionName = this.json.functionName;
			this.eventContent = this.json.eventContent;
		}	
	}
}