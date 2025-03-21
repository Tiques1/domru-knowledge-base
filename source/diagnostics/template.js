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

const diagnostics = "./diagnostics/";
const instructions = "./instructions/";

// Для доп. инфы ниже
document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll(".instructionsList li");
  const contentContainer = document.getElementById("content-container");

  listItems.forEach((item) => {
    item.addEventListener("click", function () {
      const contentFile = this.getAttribute("data-content");
      listItems.forEach((item) => {
        item.style.backgroundColor = "#ffffff";
      });
      item.style.backgroundColor = "#AA0000";

      fetch(instructions + contentFile)
        .then((response) => response.text())
        .then((html) => {
          contentContainer.innerHTML = html;
        })
        .catch((error) => {
          console.error("Ошибка загрузки контента:", error);
        });
    });
  });
});

// Для перехода к следующему шагу

document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll(".nextStepList li");
  const contentContainer = document.getElementById("mainDiv");
  const historyList = document.getElementById("historyList");

  listItems.forEach((item) => {
    item.addEventListener("click", function () {
      const contentFile = this.getAttribute("data-content");

      fetch(diagnostics + contentFile)
        .then((response) => response.text())
        .then((html) => {
          contentContainer.innerHTML = html;
        })
        .catch((error) => {
          console.error("Ошибка загрузки контента:", error);
        });

      const h1 = document.getElementById("title");
      const li = document.createElement("li");
      li.textContent = `${h1.textContent}`;
      historyList.appendChild(li);
    });
  });
});
