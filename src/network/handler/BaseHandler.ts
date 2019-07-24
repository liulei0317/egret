module game {
    export class BaseHandler {
        public constructor() {

        }

        public handle(msgDomain: MsgDomain) {
            if (msgDomain.code != MsgResultStatus.SUCCESS) {
                var errorcode = msgDomain.errorCode
                //处理通用错误码
                let toastInfo = ""
                switch (errorcode) {
                    case MsgConstant.ERROR_belss_has_zero_del:
                        toastInfo = "成员体力值为0才能删除！"
                        break;
                    case MsgConstant.ERROR_belss_has_zero_set:
                        toastInfo = "成员体力值为0才能设置归属！"
                        break;
                    case MsgConstant.ERROR_not_set_group_manager:
                        toastInfo = "会长管理模式下不允许设置组管理员！"
                        break;
                    case MsgConstant.ERROR_not_modify_self_bless:
                        toastInfo = "管理员不可以修改自己的体力！"
                        break;
                    case MsgConstant.ERROR_manager_not_by_set:
                        toastInfo = "管理员不能被更改归属！"
                        break;
                    case MsgConstant.ERROR_manager_power_no_enough:
                        toastInfo = "您当前的拥有的体力数量不够发放！"
                        break;
                    default:
                        return
                }
                DialogManager.getInstance().popUp1(toastInfo)
            }
        }
    }
}