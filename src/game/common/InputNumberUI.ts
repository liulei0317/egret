module game {

	export class InputNumberUI extends EComponent{
        private labelNumber1:eui.Label;
        private labelNumber2:eui.Label;
        private labelNumber3:eui.Label;
        private labelNumber4:eui.Label;
        private labelNumber5:eui.Label;
        private labelNumber6:eui.Label;

        private btnNumber1:EButton;
        private btnNumber2:EButton;
        private btnNumber3:EButton;
        private btnNumber4:EButton;
        private btnNumber5:EButton;
        private btnNumber6:EButton;
        private btnNumber7:EButton;
        private btnNumber8:EButton;
        private btnNumber9:EButton;
        private btnNumber0:EButton;

        private btnClear:EButton;
        private btnDelete:EButton;

        private numbers:string = "";

        private numberFullFunc: Function;

        private combatDataList:game.CombatData[];

		public constructor() {
            super();
			this.skinName = "resource/skins/common/InputNumberSkin.exml";
		}

		public onCreateViewComplete():void{
            super.onCreateViewComplete();

			this.addTapEvent(this.btnClear,this.clickClear)
			this.addTapEvent(this.btnDelete,this.clickDelete);

            this.initBtnsEvent();
            
		}	

        protected updateUI_(){
			var numbers = this.getNumbers();
			var len = numbers.length;
			for(var i=0;i<len;i++){
				if(this.numbers.length>=i){
					numbers[i].visible = true;
					numbers[i].text = this.numbers.substring(i,i+1);
				}else{
					numbers[i].visible = false;
				}
			}
		}

        public checkInput(){
            var clubId = this.numbers;
            if(clubId.length!=6 || !Utils.isNumbers(clubId)){
                CommonView.showToast("俱乐部ID应该是6位数字！");
                return false;
            }
            return true;
        }

        public getInpuNumbers(){
            return this.numbers;
        }

        private getNumber(event: eui.UIEvent):number {
            var btnNumber:EButton = event.currentTarget;
            var btnNumbers:EButton[] = this.getBtnNumbers();
            var len = btnNumbers.length;
			for(var i:number = 0;i<len;i++){
                if(btnNumber == btnNumbers[i]){
                    return i;
                }
            }
		}

        private getBtnNumbers(){
            var btnNumbers:EButton[] = [this.btnNumber0,this.btnNumber1,this.btnNumber2,this.btnNumber3,this.btnNumber4,this.btnNumber5,this.btnNumber6,this.btnNumber7,this.btnNumber8,this.btnNumber9]; 
            return btnNumbers;
        }

		private getNumbers(){
			return [this.labelNumber1,this.labelNumber2,this.labelNumber3,this.labelNumber4,this.labelNumber5,this.labelNumber6];
		}        

        public clickBtnNumber(event: eui.UIEvent) {
 			if(this.numbers.length>=6){
				return;
			}
			var number = this.getNumber(event);
			this.numbers+=number;
			this.updateUI();
            if(this.numbers.length == 6){
                if (this.numberFullFunc) {
                    this.numberFullFunc.call(null, null);
                }  
            }          
        }

        private clickClear(){
			this.numbers = "";
			this.updateUI();
		}

		private clickDelete(){
			if(this.numbers.length>0){
				this.numbers = this.numbers.substr(0,this.numbers.length-1);
			}
			this.updateUI();
		}	

        private initBtnsEvent(){
			var btns = this.getBtnNumbers();
			var len = btns.length;
			for(var i = 0;i<len;i++){
				this.addTapEvent(btns[i],this.clickBtnNumber);
			}
		}

        public setNumberFullFunc(fun: Function) {
            this.numberFullFunc = fun;
        }        

       

        public clean(){
            super.clean();
        }
	}
}