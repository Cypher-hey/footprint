var x = 10;
function a(y) {
    var x = 20;
    return b(y);
}

function b(y) {
    return console.log(x + y);
}
a(20);
