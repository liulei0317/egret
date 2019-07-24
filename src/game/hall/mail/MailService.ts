module game {
	export class MailService {

    	public Mail_Type =
        {
			NULL:0,
			System:1,     //系统邮件
			Activity:2,   //活动邮件
        }

		private static instance:MailService;


		private constructor() {
		}

		public static getInstance(){
			if(MailService.instance == null){
				MailService.instance = new MailService();
			}
			return MailService.instance;
		}

        public getMailList(){
			// var element: any = { newTask: true};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL,MsgConstant.CMD_EMAIL_LIST,null);
			SocketManager.getInstance().send(requestDomain);           
        }	

        public getMailAttach(emailId){
			var element: any = { emailId: emailId};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL,MsgConstant.CMD_DRAW_EMAIL_ATTACH,element);
			SocketManager.getInstance().send(requestDomain);           
        }

        public viewMail(emailId){
			var element: any = { emailId: emailId};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL,MsgConstant.CMD_VIEW_EMAIL,element);
			SocketManager.getInstance().send(requestDomain);           
        }					

		

		
	}
}