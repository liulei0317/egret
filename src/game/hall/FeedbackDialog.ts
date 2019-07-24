module game {
	export class FeedbackDialog extends EDialog{
		private radio1:ERadioButton;
		private radio2:ERadioButton;
		private radio3:ERadioButton;

		private btnFeedback:EButton;

		private editPhoneNumber:eui.EditableText;
		private editContent:eui.EditableText;
		
		// private btnBgMusic:eui.Image;
		// private btnSound:eui.Image;
		// private btnAbout:EButton;
		private btnClose:EButton;

		private contentType:number = 0;

		// private imgBgMusicOff:eui.Image;
		// private imgBgMusicOn:eui.Image;

		// private imgSoundOff:eui.Image;
		// private imgSoundOn:eui.Image;
	

		public constructor() {
			super();
			this.skinName = "resource/skins/hall/feedbackDialogSkin.exml";
		}

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);

			this.editPhoneNumber.inputType = egret.TextFieldInputType.TEL;
			this.editPhoneNumber.restrict = '0-9';

			// this.addTapEvent(this.btnAbout,this.showAbout);
			this.addTapEvent(this.btnFeedback,this.feedback);
			this.addTapEvent(this.radio1,this.clickRadio1);
			this.addTapEvent(this.radio2,this.clickRadio2);
			this.addTapEvent(this.radio3,this.clickRadio3);

			this.radio1.setText("建议");
			this.radio2.setText("问题");
			this.radio3.setText("其它");

			this.updateUI();
		}	

		protected updateUI_(){
			this.radio1.setSelected(this.contentType == 0);
			this.radio2.setSelected(this.contentType == 1);
			this.radio3.setSelected(this.contentType == 2);
		}

		private clickRadio1(){
			this.contentType = 0;
			this.updateUI();
		}
		private clickRadio2(){
			this.contentType = 1;
			this.updateUI();
		}
		private clickRadio3(){
			this.contentType = 2;
			this.updateUI();
		}				


		private feedback(){
			var content = this.editContent.text.trim();
			if(content.length<=0){
				CommonView.showToast("请输入您宝贵的意见或者建议");
				return;
			}
			var phoneNumber = this.editPhoneNumber.text.trim();
			if(phoneNumber.length>0 && phoneNumber.length!=11){
				CommonView.showToast("请输入11位数字的手机号码");
				return;
			}
			GameHttpManager.feeback(GlobalData.userData.getUserId(),this.contentType,content,phoneNumber,this.feedbackBack.bind(this));
			
		}	


		 private feedbackBack(event:egret.Event){
			var data:any = event;
            var msgDomain:MsgDomain = data;
            if(msgDomain.code == CmdResultType.SUCCESS){
                CommonView.showToast("信息反馈成功，非常感谢~");
				this.close();
			}
		}		
	}
}