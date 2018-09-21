$ = function (id) {
    return document.getElementById(id);
}

var hide = function (id) {
    $(id).style.display = 'none';
}


var show = function (id) {
    $(id).style.display = 'block';
}

hide(popup1);
