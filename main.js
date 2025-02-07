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

document.getElementById("searchButton").addEventListener("click", inputCheck);

document.getElementById("mainSearch").addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    inputCheck();
  }
});

function inputCheck() {
  var inp = document.getElementById("input");

  if (inp.value != "") {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.textContent = "Hello";
    ul.appendChild(li);
    return;
  } else {
    inp.setAttribute("placeholder", phrases[counter]);
    if (0 <= counter && counter < phrases.length - 1) {
      counter += 1;
    } else {
      counter = 0;
    }
  }
}

fetch("./problems.json")
  .then((response) => response.text())
  .then((json) => {
    Object.keys(JSON.parse(json)).forEach(function (elem) {
      const li = document.createElement("li");
      li.textContent = `${elem}`;
      document.getElementById("list").appendChild(li);
    });
  })
  .catch((error) => {
    console.error("Ошибка загрузки контента:", error);
  });
