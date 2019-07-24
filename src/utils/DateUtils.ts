module game {
    export class DateUtils {
        public constructor() {
        }

        public static dateToString(time: number) {

        }

        public static dateFormat(time: number) {
            return DateUtils.dateFormat1(time, true);
        }

        public static dateFormat1(time: number, showSecond, isHideYMD: boolean = false) {
            var date = new Date(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();
            var second = date.getSeconds();
            var s = "";
            if (!isHideYMD) {
                s = year + "/"
                if (month < 10) {
                    s += "0";
                }
                s += month + "/";
                if (day < 10) {
                    s += "0";
                }
                s += day + " ";
            }
            if (hour < 10) {
                s += "0";
            }
            s += hour + ":";
            if (min < 10) {
                s += "0";
            }
            s += min;
            if (showSecond) {
                s += ":";
                if (second < 10) {
                    s += "0";
                }
                s += second;
            }

            return s;
        }

        public static dateDesc(time: number) {
            var second = Math.floor(time / 1000);
            var left = second;
            var day = Math.floor(second / (24 * 3600));
            if (day > 0) {
                left = second % day * 24 * 3600;
            }
            var hour = Math.floor(left / 3600);
            if (hour > 0) {
                left = left % (hour * 3600);
            }
            var min = Math.floor(left / 60);
            if (min) {
                left = left % (min * 60);
            }
            var sec = left;
            var s = "";
            if (day > 0) {
                s += (day + "天");
            }
            if (hour > 0) {
                s += (hour + "小时");
            }
            if (min > 0) {
                s += (min + "分");
            }
            if (sec > 0) {
                s += (sec + "秒");
            }
            return s;
        }
        /**
        * @param {number} range
        * @param {string} [type]
        * @memberOf VehicleOverviewComponent
        * @description 获取今天及前后天
        */
        public static getRangeDate(range: number, type?: string, formatType: string[] = ["年", "月", "日"]) {
            const formatDate = (time: any) => {
                // 格式化日期，获取今天的日期
                const Dates = new Date(time);
                const year: string = "" + Dates.getFullYear();
                const month: string = "" + (Dates.getMonth() + 1)
                const day: string = "" + Dates.getDate()
                const arr = [year, month, day]
                let outString: string = ""
                for (let i = 0; i < 3; i++) {
                    if (formatType[i] === "") {
                        continue;
                    }
                    outString = outString + arr[i] + formatType[i]
                }
                return outString
            };
            const now = formatDate(new Date().getTime()); // 当前时间
            const resultArr: Array<any> = [];
            let changeDate: string;
            if (range) {
                if (type) {
                    if (type === 'one') {
                        changeDate = formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
                        console.log(changeDate);
                        return changeDate;
                    }
                    if (type === 'more') {
                        if (range < 0) {
                            for (let i = 0; i < Math.abs(range); i++) {
                                resultArr.push(formatDate(new Date().getTime() + (-1000 * 3600 * 24 * i)));
                            }
                            console.log(resultArr);
                            return resultArr;

                        } else if (range > 0) {
                            for (let i = 0; i < range; i++) {
                                resultArr.push(formatDate(new Date().getTime() + (1000 * 3600 * 24 * i)));
                            }
                            console.log(resultArr);
                            return resultArr;
                        }
                        else {
                            return now
                        }
                    }
                } else {
                    changeDate = formatDate(new Date().getTime() + (1000 * 3600 * 24 * range));
                    console.log(changeDate);
                    return changeDate;
                }
            }
        }
    }
}