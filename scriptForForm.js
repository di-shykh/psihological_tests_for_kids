(function () {
    window.onload = function () {
        /*working with form*/
        document.getElementsByTagName("form")[0].addEventListener("submit", function () {
            if (typeof (Storage) !== "undefined") {
                alert("local");
                // Code for localStorage/sessionStorage
                //if localStorage is empty
                if (!window.localStorage.name && !window.localStorage.pass) {
                    window.localStorage.name = document.getElementById("name").value;
                    window.localStorage.pass = document.getElementById("password").value;
                }
                else {

                }
            } else {
                // Sorry! No Web Storage support..
                aler("not sup")
            }
        });
    }
})();