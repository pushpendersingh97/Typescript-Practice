var dateTime = () => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time')!.innerHTML = h + ":" + m + ":" + s;
    setTimeout(dateTime, 500);
}
var checkTime = (i: any) => {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}