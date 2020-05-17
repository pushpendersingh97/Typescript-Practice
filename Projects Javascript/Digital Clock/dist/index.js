"use strict";
var dateTime = function () {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    setTimeout(dateTime, 500);
};
var checkTime = function (i) {
    if (i < 10) {
        i = "0" + i;
    }
    ; // add zero in front of numbers < 10
    return i;
};
