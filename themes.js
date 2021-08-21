// --Themes--

// Save theme type on local storage
let theme = localStorage.getItem("theme");
const toggle = document.querySelector("#toggle");

// Functions to enable certain theme
const enableTheme_1 = () => {
    document.body.classList.remove("theme_3", "theme_2");
    localStorage.setItem("theme", "theme_1");}

const enableTheme_2 = () => {
    document.body.classList.remove("theme_1");
    document.body.classList.add("theme_2");
    localStorage.setItem("theme", "theme_2");}

const enableTheme_3 = () => {
    localStorage.setItem("theme", "theme_3");
    document.body.classList.remove("theme_2");
    document.body.classList.add("theme_3");
}

// When page loads check if theme was set, if not set default theme-1.
if (theme === "theme_2") enableTheme_2();
else if (theme === "theme_3") enableTheme_3();
else enableTheme_1();

// Toggle button to change the theme.
toggle.addEventListener("click", () => {
    theme = localStorage.getItem("theme");
    if (theme === "theme_1") enableTheme_2();
    else if (theme === "theme_2") enableTheme_3();
    else if (theme === "theme_3") enableTheme_1();
});