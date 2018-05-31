'use strict';

var todo = new CreateTodo();
var cookie = new CookiesController();

function todoApp() {
    document.addEventListener("DOMContentLoaded", function () {
        todo.init();
        todo.save();
    });
}

function cookieActive(){
    if (document.cookie === "") {
        cookie.init();
    } else {
        cookie.get();
    }
}

cookieActive();
todoApp();