function convert(time) {
    return time > 9 ? time : ("0" + time);
}

export function adjustTime(time) {
    const date = new Date(time);
    
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);

    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${date.getFullYear()}년 ${convert(month)}월 ${convert(day)}일  ${convert(hour)}:${convert(minute)}:${convert(second)}`
}