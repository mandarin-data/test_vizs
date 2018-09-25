$ = function (id) {
    return document.getElementById(id);
}

var popups = ['popup1', 'popup2', 'popup3', 'popup4', 'popup5', 'popup6', 'popup7', 'popup8', 'popup9', 'popup10']

var hideit = function (id) {
    $(id).style.display = 'none';
}

var hide = function () {
    popups.forEach(hideit);
}

var show = function (id) {
    $(id).style.display = 'block';
}

hide(popup1);
