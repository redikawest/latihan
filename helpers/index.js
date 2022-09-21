
export const generateRandomInt = (digits) => {
    let num = "";
    const possible = "123456789";
    for (let i = 0; i < digits; i++) {
        num += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return num;
}

export const addSeconds = (seconds, date= new Date()) => {
    date.setSeconds(date.getSeconds() + seconds)

    return date;
}