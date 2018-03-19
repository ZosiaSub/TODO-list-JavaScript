
function CookiesController() {

    this.init = function () {
        checkCookie();
    }

    this.get = function () {
        checkCookie();
        checkCookieUser();
    }

    function setCookies(name, value, days) {

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";

        document.cookie = name + "=" + value + expires + "; path=/";
    }


    function acceptCookies() {
        document.querySelector('#cookieAcceptBarConfirm').addEventListener('click', function () {

            checkCookieUser();
        });
    }

    function checkCookie() {
        if (document.cookie) {
            document.getElementById('cookieAcceptBar').style.display = 'none';
        }else {
            acceptCookies();
        }
    }

    function checkCookieUser() {
        var user = getCookie('page-todo-name');

        if (!user && user === "") { // shows cookie is not set
            user = prompt("Please enter your name:", "");
            if(user){
                document.getElementById('cookieAcceptBar').style.display = 'none';
                var userDiv = document.querySelector('#user-name');
                userDiv.style.display = 'block';
                userDiv.innerText = "Hi " + user + "!";
                setCookies('page-todo-name', user, 5); //save input in cookie
            }

        } else {
            var userDiv = document.querySelector('#user-name');
            userDiv.style.display = 'block';
            userDiv.innerText = "Hi " +  user + "!";
        }//if cookie is already set
    }


    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }

        return "";
    }
}








