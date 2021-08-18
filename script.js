let theme = localStorage.getItem("theme");
const toggle = document.querySelector("#toggle");

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

if (theme !== null) {
    if (theme === "theme_2") enableTheme_2();
    else if (theme === "theme_3") enableTheme_3();
    else enableTheme_1();
}
else enableTheme_1();

toggle.addEventListener("click", () => {
    theme = localStorage.getItem("theme");
    if (theme === "theme_1") enableTheme_2();
    else if (theme === "theme_2") enableTheme_3();
    else if (theme === "theme_3") enableTheme_1();
})