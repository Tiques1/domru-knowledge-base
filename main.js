document.getElementById("searchButton").addEventListener("click", inputCheck);

var counter = 0;
const phrases = [
  "Введите запрос",
  "Вы ничего не ввели!",
  "Ты тупой?",
  "Для кого написано? Введите запрос!!!",
  "Хватит жать на кнопку, введи запрос!",
  "Еблан.",
  "Ты еще здесь?",
  "Иди нахуй",
];

document
  .getElementById("mainSearch")
  .addEventListener("keydown", (e) => inputCheck(e));

function inputCheck(e) {
  var inp = document.getElementById("input");

  if (inp.value === "") {
    inp.setAttribute("placeholder", phrases[counter]);
    if (0 <= counter && counter < phrases.length - 1) {
      counter += 1;
    } else {
      counter = 0;
    }
    return;
  }

  if (e.code === "Enter") {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.textContent = "Hello";
    ul.appendChild(li);
  }
}
