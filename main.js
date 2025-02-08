/* Немного рофлов, а также обработчик запроса */

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

/* Подгрузка первичных вариантов из json файла */
// Доделать замену контента

fetch("./problems.json")
  .then((response) => response.text())
  .then((json) => {
    Object.keys(JSON.parse(json)).forEach(function (elem) {
      const li = document.createElement("li");
      li.setAttribute("class", "primary-option");
      li.textContent = `${elem}`;
      document.getElementById("list").appendChild(li);
      li.addEventListener("click", () => {
        fetch("./diagnostics/diagnostics.json")
          .then((response) => response.text())
          .then((json) => {
            console.log(JSON.parse(json)[li.textContent]);
          })
          .catch((error) => {
            console.error("Ошибка загрузки контента:", error);
          });
      });
    });
  })
  .catch((error) => {
    console.error("Ошибка загрузки контента:", error);
  });

/* Далее идет  блок с заменой контента по нажатию на вариант из списка*/

// document.addEventListener("DOMContentLoaded", () => {
//   [...document.querySelectorAll(".primary-option")].forEach((el) =>
//     el.addEventListener("click", (e) => {
//       fetch("./diagnostics/diagnostics.json")
//         .then((response) => response.text())
//         .then((json) => {
//           //console.log(JSON.parse(json).Интернет);
//         })
//         .catch((error) => {
//           console.error("Ошибка загрузки контента:", error);
//         });
//     })
//   );
// });

/* История */

document.getElementsByClassName("history-btn")[0].onclick = function () {
  const elem = document.getElementById("historyDiv");
  const btn = document.getElementsByClassName("history-btn");
  if (elem.classList.contains("hidden")) {
    elem.classList.remove("hidden");
    btn[0].classList.add("rotate");
  } else {
    document.getElementById("historyDiv").classList.add("hidden");
    btn[0].classList.remove("rotate");
  }
};
