module game {
	export class ClubUtils {
		public constructor() {
		}

		public static getMemberName(memberType){
			if(memberType == ClubConst.MemberType.MONITOR){
				return "会长";
			}
			// else if(memberType == ClubConst.MemberType.MONITOR2){
			// 	return "副会长";
			// }else if(memberType == ClubConst.MemberType.ADMIN){
			// 	return "管理员";				
			// }else{
			// 	return "普通成员";		
			// }
			return "";
		}
	}
}