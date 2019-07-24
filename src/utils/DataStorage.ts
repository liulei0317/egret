//存档
class DataStorage {


    //写入数据
    public static writeLocalData(key: string, value: string) {
        egret.localStorage.setItem(key, value);

    }
    //读取数据
    public static readLocalData(key: string, defaultValue?: string): string {
        if (defaultValue == undefined || defaultValue == null) defaultValue = "";
        var result = ""
        result = egret.localStorage.getItem(key);
        result = (result == "" || result == undefined || result == null) ? defaultValue : result
        return result

    }
    //移除数据
    public static removeLocalData(key: string) {
        egret.localStorage.removeItem(key);
    }
}


class DataStorageConst {
    public static DATA_KEY_UnionId = "login_user_unionId_1";
    public static DATA_KEY_DECLARE_CREATE_ROOM = "DATA_KEY_DECLARE_CREATE_ROOM";
}