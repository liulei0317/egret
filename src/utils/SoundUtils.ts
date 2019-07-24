module SoundUtils {


export function playChatMsgEffectSoundNameBindPlayer(dir,index)
{
    var playerInfo = GlobalData.gameData.getPlayerByClientId(dir)
    if( playerInfo == null) 
    {
         return
    }
    var ageType = playerInfo.getAgeType()
    var gender = playerInfo.getGender()
    var fileName = "nan"
    if (gender == Constants.GENDER.female) 
    {
        fileName = "nv"
    }
    var name = Utils.format("{0}_chat_{1}_{2}_mp3",fileName,ageType,index)
    if (GameConst.sound_type == GameConst.SOUND_TYPE_ENUM.standard)
    {
        name = Utils.format("{0}_chat_{1}_mp3",fileName,index)
    }
    game.SoundService.getInstance().playAudio(name)
}

    export function playEffectSoundNameBindPlayer(dir, soundType, defaultIndex?:number) {
        var playerInfo = GlobalData.gameData.getPlayerByClientId(dir)
        if (playerInfo == null) {
            return
        }
        var ageType = playerInfo.getAgeType()
        var gender = playerInfo.getGender()
        var name = SoundUtils.getSoundName(gender, ageType, soundType, defaultIndex)
        if (name != null) {
            game.SoundService.getInstance().playAudio(name)
        }
    }

    export function getSoundName(gender, ageType, value, type?: number) {
        if (type == null) {
            var randomNum = SoundCost.soundData[gender][ageType][value]
            if (randomNum == null) {
                return
            }
            type = Utils.getRandom(1, randomNum + 1)
        }
        var fileName = "nan"
        if (gender == Constants.GENDER.female) {
            fileName = "nv"
        }
        var soundName = Utils.format("{0}_{1}_{2}_{3}_mp3", fileName, value, ageType, type)
        if (GameConst.sound_type == GameConst.SOUND_TYPE_ENUM.standard) {
            soundName = Utils.format("{0}_{1}_mp3", fileName, value)
        }
        return soundName
    }
}