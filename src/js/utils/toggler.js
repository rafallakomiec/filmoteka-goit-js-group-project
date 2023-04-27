import { save } from "./storage";

document.addEventListener('DOMContentLoaded', function() {

    const body = document.body;
    const input = document.querySelector("#darkmode-toggle");
    
    const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
    };
    
    loadTheme();
    input.addEventListener('change', changeTheme);

    function changeTheme() {
    body.classList.toggle(Theme.DARK);
    body.classList.toggle(Theme.LIGHT);

        getCurrentTheme(body.classList);
    }

    function getCurrentTheme(currentTheme) {
        save('Theme', currentTheme);
    }

    function loadTheme() {
    const savedTheme = load('Theme');
    if (savedTheme === Theme.DARK) {
        body.classList.add(savedTheme);
        input.checked = true;
        } else {
            body.classList.add(Theme.LIGHT);
        }
    }
});

