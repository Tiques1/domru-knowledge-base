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
  .then((text) => {
    var json = JSON.parse(text);
    Object.keys(json).forEach(function (elem) {
      const li = document.createElement("li");
      li.setAttribute("class", "primary-option");
      li.textContent = `${elem}`;
      document.getElementById("list").appendChild(li);

      li.addEventListener("click", () => {
        var center = document.getElementById("center");

        const nextStepList = document.createElement("ul");
        nextStepList.classList.add("nextStepList");

        const instructionsList = document.createElement("ul");
        instructionsList.classList.add("instructionsList");

        json[li.textContent]["Варианты"].forEach((opt) => {
          const optionItem = document.createElement("li");
          optionItem.classList.add("optionItem");
          optionItem.textContent = opt;

          nextStepList.appendChild(optionItem);
        });

        json[li.textContent]["Инструкции"].forEach((inst) => {
          const instructionsItem = document.createElement("li");
          instructionsItem.textContent = inst;

          instructionsList.appendChild(instructionsItem);
        });

        const h1 = document.createElement("h1");
        h1.textContent = li.textContent;

        center.innerHTML = null;
        center.appendChild(h1);
        center.appendChild(nextStepList);
        center.appendChild(instructionsList);
      });

      //   li.addEventListener("click", () => {
      //     fetch("./diagnostics/diagnostics.json")
      //       .then((response) => response.text())
      //       .then((json) => {
      //         console.log(JSON.parse(json)[li.textContent]);
      //       })
      //       .catch((error) => {
      //         console.error("Ошибка загрузки контента:", error);
      //       });
      //   });
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

// document.querySelectorAll("#buttons button")[0].onclick = function () {
//   const elem = document.getElementById("historyDiv");
//   const btn = document.getElementsByClassName("history-btn");
//   if (elem.classList.contains("hidden")) {
//     elem.classList.remove("hidden");
//     // btn[0].classList.add("rotate");
//   } else {
//     document.getElementById("historyDiv").classList.add("hidden");
//     // btn[0].classList.remove("rotate");
//   }
// };

document.querySelectorAll("#buttons button").forEach((el) =>
  el.addEventListener("click", (e) => {
    document.querySelectorAll(".sidebar").forEach((sb) => {
      if (sb.getAttribute("id") === e.target.getAttribute("data-sidebar")) {
        if (sb.classList.contains("hidden")) {
          sb.classList.remove("hidden");
        } else {
          sb.classList.add("hidden");
        }
      } else {
        sb.classList.add("hidden");
      }
    });
  })
);

/* Часики */

function digitalClock() {
  var date = new Date();
  var hours = date.getHours() + date.getTimezoneOffset() / 60;
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  //* добавление ведущих нулей */
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  document.querySelectorAll(".time").forEach((el) => {
    el.textContent =
      el.getAttribute("date-city") +
      "\n" +
      (Number(hours) + Number(el.getAttribute("date-time-zone"))).toString() +
      ":" +
      minutes +
      ":" +
      seconds;
  });
  setTimeout("digitalClock()", 1000);
}

digitalClock();

/* Замена центра на диагностику */

// document.querySelectorAll("#list li").forEach((el) => {
//   el.addEventListener("click", (e) => {
//     var center = document.getElementById("center");

//     fetch("./template.html")
//       .then((response) => response.text())
//       .then((html) => {
//         center.innerHTML = html;
//       })
//       .catch((error) => {
//         console.error("Ошибка загрузки контента:", error);
//       });
//   });
// });
