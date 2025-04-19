export const getOneMonthAgo = (date?: Date) => {
    if (!date) date = new Date();

    date.setMonth(date.getMonth() - 1);
    return date;
};

export const isLastDayOfMonth = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastDay = nextMonth.getDate();

    return today.getDate() === lastDay;
};

export function convertMinuteToMillis(x: number) {
    return x * 60000;
}

export function currentTime() {
    return new Date().getTime();
}

export function isTimeGreaterThanMinute(savedTime: number, min: number) {
    if (!savedTime) return false;
    return currentTime() - savedTime >= convertMinuteToMillis(min);
}

export function isTimeLesserThanMinute(savedTime: number, min: number) {
    if (!savedTime) return true;
    return currentTime() - savedTime <= convertMinuteToMillis(min);
}
