module game {
	export class MailData {
		public json:any;
		
        public emailId:number;
        //邮件标题
        public emailTitle:string;
        //邮件内容描述
        public emailContent:string;
		//0未读，1已读
        public emailStatus:number;

        public emailType:number;

        public emailTypeName:string;

        public createTime:number;


        // public int sendUserId;

        // public String sendUserName;

        // public int toUserId;

        public attachStatus:number;

        public attachInfos:string;

        public validSec:string;	

		public selected:boolean = false;

		public constructor(json:JSON) {
			this.json = json;
			this.parse();
		}

		public parse(){
			this.emailId = this.json.emailId;
			this.emailTitle = this.json.emailTitle;
			this.emailContent = this.json.emailContent;
			this.emailStatus = this.json.emailStatus;
			this.emailType = this.json.emailType;
			this.emailTypeName = this.json.emailTypeName;

			this.createTime = this.json.createTime;
			this.emailTypeName = this.json.emailTypeName;
			this.attachStatus = this.json.attachStatus;

			this.attachInfos = this.json.attachInfos;
			this.validSec = this.json.validSec;
		}	

		public getAttachItems(){
			if(this.attachInfos){
				var jsonArrar = JSON.parse(this.attachInfos);
				return jsonArrar;
			}else{
				return [];
			}
		}
	}
}