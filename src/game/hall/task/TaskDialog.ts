module game {
	export class TaskDialog extends EDialog{

		private btnClose:EButton;

		private tab1:EToggleButton;
		private tab2:EToggleButton;

		private labelTab1:eui.Label;
		private labelTab2:eui.Label;

		private scrollerTables:EScroller;

		private imgRed1:eui.Image;
		private imgRed2:eui.Image;

		private selectTabIndex:number = 1;

		private everydayTaskList:TaskData[];
		private growthTaskList:TaskData[];

		public constructor() {
			super(Constants.UI_PANEL_DATA_SET.taskBox.index);
			this.skinName = "resource/skins/hall/task/taskDialogSkin.exml";
		}


		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);
			this.addTapEvent(this.tab1,this.selectTab1);
			this.addTapEvent(this.tab2,this.selectTab2);
			
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_GET_TASK_LIST), this.getTaskListBack, this);
			EAppFacade.getInstance().registerCommand(GameCmd.UPDATE_TASK_TIP,this.updateTaskTip,this);

			this.selectTab1();

			this.initScroller();

			this.getTaskList();	
		}

		protected updateUI_(){
			this.tab1.selected = false;
			this.tab2.selected = false;       
            this.labelTab1.textColor = 0x874208;
            this.labelTab2.textColor = 0x874208;   
            this.labelTab1.stroke = 0;
            this.labelTab2.stroke = 0;
            if(this.selectTabIndex == 1){
                this.labelTab1.textColor = 0xFFFFFF;
                this.tab1.selected = true;
                this.labelTab1.stroke = 2;
				if(this.everydayTaskList){
					this.scrollerTables.setScrollerContent(this.everydayTaskList, false);
				}
            }else if(this.selectTabIndex == 2){
                this.labelTab2.textColor = 0xFFFFFF;
                this.tab2.selected = true;
                this.labelTab2.stroke = 2;
				if(this.growthTaskList){
					this.scrollerTables.setScrollerContent(this.growthTaskList, false);
				}				
            }     
			this.updateTaskTip();    
        }		

		private initScroller() {
			// this.scrollerTables.setScrollerHeight(434);
			this.scrollerTables.setElementViewInfo(114, 8);
			this.scrollerTables.setElementCreateFunction(this.createElement.bind(this));
			this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this));
			this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this));
		}	


		private createElement(data) {
			var item = new game.TaskItem(data);
			return item;
		}

		private updateElement(item: game.TaskItem, data: any) {
			item.setData(data);
			// console.info("roomData == "+item.toString());
		}

		private updateElementUI(item: game.TaskItem) {
			item.updateUI();
		}	

		private getTaskList(){
			TaskService.getInstance().getTaskList();
		}	

		private getTaskListBack(event: egret.Event) {	
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				var jsonData = msgDomain.data;
				var everydayTask = jsonData.everydayTask;
				var growthTask = jsonData.growthTask;
				var redPointTip_day = jsonData.redPointTip_day;
				var redPointTip_grow = jsonData.redPointTip_grow;
				
				this.everydayTaskList = [];
				this.growthTaskList = [];
				for (var key in everydayTask) {
					var temp = everydayTask[key];
					var taskData = new game.TaskData(temp);
					this.everydayTaskList.push(taskData);
				}
				for (var key in growthTask) {
					var temp = growthTask[key];
					var taskData = new game.TaskData(temp);
					this.growthTaskList.push(taskData);
				}	
				GlobalService.getInstance().setTaskTip(redPointTip_day,redPointTip_grow);	
				// this.imgRed1.visible = redPointTip_day;
				// this.imgRed2.visible = redPointTip_grow;

				this.updateUI();
			}
		}		

 					

		private  selectTab1(){
			this.selectTabIndex = 1;
			this.updateUI();
		}


		private  selectTab2(){
			this.selectTabIndex = 2;
			this.updateUI();
		}	

        private updateTaskTip()
        {
			this.imgRed1.visible = GlobalService.getInstance().hasDayTaskTip();
			this.imgRed2.visible = GlobalService.getInstance().hasGrowTaskTip();
        }			

		public clean(){
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_GET_TASK_LIST), this.getTaskListBack, this);
			EAppFacade.getInstance().removeCommand(GameCmd.UPDATE_TASK_TIP,this.updateTaskTip,this);
			super.clean();
		}

	}
}