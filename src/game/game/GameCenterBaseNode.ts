class GameCenterBaseNode extends game.EComponent
{
    private Node_centerText: eui.Group
    private Node_LeftNum: eui.Group
    private centerClock: eui.Label
    private Text_leftFlowerNum: eui.Label
    private Text_leftCardNum: eui.Label
    private Text_turnMode: eui.Label
    private Text_turnNum: eui.Label

    protected center_dir_effect: eui.Group
    private center_number: eui.Group
    private timeNumber: eui.Label

    private center_light_1: eui.Image;
    private center_light_2: eui.Image;
    private center_light_3: eui.Image;
    private center_light_4: eui.Image;
    protected lightNode: eui.Image[]

    private center_dark_dir_1: eui.Image;
    private center_dark_dir_2: eui.Image;
    private center_dark_dir_3: eui.Image;
    private center_dark_dir_4: eui.Image;
    protected darkFengNode: eui.Image[]

    private center_dir_1: eui.Image;
    private center_dir_2: eui.Image;
    private center_dir_3: eui.Image;
    private center_dir_4: eui.Image;
    protected fengNode: eui.Image[]

    private time = 0
    protected status: number;
    private tickScheduler: string

    protected gs:game.GameScene
    public constructor(skinName:string)
    {
        super();
        this.skinName = skinName
    }

    public onCreateViewComplete()
    {
        super.onCreateViewComplete();
        this.initData();
        this.initCenterNode();
    }

    public setGameScene(gs: game.GameScene) {
        this.gs = gs;
    }

    private initData()
    {
        this.time = 0;
    }

    protected initCenterNode() {
        this.lightNode = [this.center_light_1, this.center_light_2, this.center_light_3, this.center_light_4]
        this.darkFengNode = [this.center_dark_dir_1, this.center_dark_dir_2, this.center_dark_dir_3, this.center_dark_dir_4]
        this.fengNode = [this.center_dir_1, this.center_dir_2, this.center_dir_3, this.center_dir_4]
        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            this.lightNode[i].visible = false
            this.lightNode[i].alpha = 0.5
            this.darkFengNode[i].visible = true
            this.fengNode[i].visible = false
        }
        this.center_dir_effect.visible = false
    }

     public onEventHandler(evt: egret.Event) {
        var rsvMsg = evt.data
        var eventId = rsvMsg.cmd
        var data = rsvMsg.data
         if (eventId == game.GameCmd.LEFT_CARD_NUM_CHANGED) {
            var leftCardNum = data.leftCardNum
            var leftFlowerNum = data.leftFlowerNum
            this.updateLeftCardNum(leftCardNum)
            this.updateLeftFlowerNum(leftFlowerNum)
        }else if (eventId == game.GameCmd.AUTO_DISCARD_TIME) {
            GlobalData.gameData.clearAutoDelayTimeNum()
            var leftTime = Math.floor(data.leftTime / 1000)
            this.resetClock(leftTime, true)
        }else if (eventId == game.GameCmd.DIR_ARROW_CHANGE) {
            var curDirClientId = data.clientId
            this.updateDirArrow(curDirClientId)
        }else if (eventId == game.GameCmd.AUTO_DISCARD_TIME) {
            GlobalData.gameData.clearAutoDelayTimeNum()
            var leftTime = Math.floor(data.leftTime / 1000)

            this.resetClock(leftTime, true)
        }else if (eventId == game.GameCmd.AUTO_DISCARD_TIME_STATUS_CHANGED)
        {
            this.changeAutoHostStatus()
        }
     }

     private changeAutoHostStatus()
     {
        if( GlobalData.gameData.getCanAutoHost() ){
            this.startTimer()
        }else{
            this.stopTimer()
        }
     }

      public setStatus(status) {
        this.status = status
        this.updateCenterNode()
        this.updateAutoTimer()
      }

    protected updateCenterNode() {
        if (this.status == GameConst.GAME_STATUS_TYPE.ready || this.status == GameConst.GAME_STATUS_TYPE.before_playing || this.status == GameConst.GAME_STATUS_TYPE.waiting) {
            this.centerClock.visible = false
        }
        else {
            this.centerClock.visible = true
        }

        this.updateTurnNumber()
        this.updateDir()
        if (this.status == GameConst.GAME_STATUS_TYPE.ready) {
            this.Node_centerText.visible = false
        }else if (this.status == GameConst.GAME_STATUS_TYPE.playing) {
             this.Node_centerText.visible = true
            this.Node_LeftNum.visible = true
            this.updateLeftCardNum()
            this.updateLeftFlowerNum()
            var discardChairId = GlobalData.gameData.getDiscardChairId()
            var clientId = GlobalData.gameData.changeChairIdToClientId(discardChairId)
            this.updateDirArrow(clientId)
        }else if (this.status == GameConst.GAME_STATUS_TYPE.waiting) {
            this.center_dir_effect.visible = false
            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                this.darkFengNode[i].visible = true
                this.lightNode[i].visible = false
                this.fengNode[i].visible = false
            }
            this.Node_LeftNum.visible = false
        }else if (this.status == GameConst.GAME_STATUS_TYPE.over || this.status == GameConst.GAME_STATUS_TYPE.allOver) {
            this.stopTimer()
        }
    }

    public updateDirArrow(clientId) {
        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            this.lightNode[i].visible = clientId == i
            this.darkFengNode[i].visible = clientId != i
            this.fengNode[i].visible = clientId == i
        }

        this.center_dir_effect.visible = true
        this.playEffect(clientId)
        this.resetClock()
    }

    protected playEffect(clientId:number)
    {
    }

    private updateLeftFlowerNum(leftNum: number = -1) {
        var num = leftNum
        if (num == -1) {
            num = GlobalData.gameData.getLeftFlowerNum()
        }
        this.Text_leftFlowerNum.text = "" + num
    }

    private updateLeftCardNum(leftNum: number = -1) {
        var num = leftNum
        if (num == -1) {
            num = GlobalData.gameData.getLeftCardNum()
        }
        this.Text_leftCardNum.text = "" + num
    }

    private updateTurnNumber() {
        var curTurnNum = GlobalData.gameData.getCurTurnNumber()
        var totalTurnNum = GlobalData.gameData.getRoomInfo().getTurnNumber()
        var turnNumStr

        if (GlobalData.gameData.getRoomInfo().getTurnMode() == Constants.ROOM_TIME_MODE.quan) {
            var curDir = GlobalData.gameData.getCurTurnDirection()
            turnNumStr = GameConst.DIRECT_DESC[curDir] + curTurnNum + "/" + totalTurnNum;
        }
        else {
            turnNumStr = curTurnNum + " / " + totalTurnNum
        }
        this.Text_turnNum.text = turnNumStr
        this.Text_turnMode.text = GlobalData.gameData.getRoomInfo().getTurnModeDesc() + "数"
    }

    protected updateDir() {
        var eastChairId = GlobalData.gameData.getEastChairId()
        var eastClientId = GlobalData.gameData.changeChairIdToClientId(eastChairId)

        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            var direct = ((i - eastClientId) + GameConst.maxPlayerNum) % GameConst.maxPlayerNum + 1
            var darkFengName = "feng" + direct + "_png"
            var fengName = "nowFeng" + direct + "_png"
            this.fengNode[i].source = fengName
            this.darkFengNode[i].source = darkFengName
            this.darkFengNode[i].visible = true
        }
    }

    private updateAutoTimer() {
        var autoDelayTime = GlobalData.gameData.getAutoDelayTimeNum()
        if (autoDelayTime > 0) {
            GlobalData.gameData.clearAutoDelayTimeNum()
            this.resetClock(autoDelayTime, true)
        }
    }

    private resetClock(leftTime: number = -1, autoDiscard: boolean = false) {
        if (autoDiscard) {
            this.centerClock.visible = true
        }
        Utils.sendGameEvent(game.GameCmd.UPDATE_AUTODISCARD_Text_Visible,{visible:autoDiscard})
        this.time = GameConst.operateTime
        if (leftTime != -1) {
            this.time = leftTime
        }
        this.centerClock.text = "" + this.time
        this.startTimer()
    }

    private startTimer() {
        this.stopTimer()
        this.tickScheduler = game.TimerItemManager.getInstance().startTimer(game.TimerItem.TimerType.perSec, this.time * 1000, this.timerEventHandler, this)
    }
    private stopTimer() {
        if (this.tickScheduler != null) {
            game.TimerItemManager.getInstance().stopTimer(this.tickScheduler)
            this.tickScheduler = null
        }
    }

    private timerEventHandler(e: egret.TimerEvent) {
        if (GlobalData.gameData.isPlayBack() && this.gs.getReplayer() && this.gs.getReplayer().isPause()) {
            return
        }
        this.time = Math.max(this.time - 1, 0)
        if (this.time == 3 && GlobalData.gameData.getDiscardChairId() == GlobalData.gameData.getMyChairId()) {
            game.SoundService.getInstance().playAudio("countdown_mp3", 3)
        }
        this.centerClock.text = "" + this.time
        if (this.time == 0) {
            this.stopTimer()
        }
    }

    public release()
    {
        this.stopTimer();
    }
}
window["GameCenterBaseNode"] = GameCenterBaseNode