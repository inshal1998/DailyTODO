const inputBox = document.querySelectorAll(".input-box");
const checkBoxList = document.querySelectorAll(".check-box");
const error_label = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");
const desc = document.querySelector(".desc");
let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let isEmpty = true;
let completedCount = Object.values(allGoals).filter(
  (count) => count.isCompleted
).length;
progressValue.style.width = `${(completedCount / 3) * 100}%`;
let goalCount = progressValue.children[0];
goalCount.innerText = `${completedCount} / 3 Complete`;
const quotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away , keep going!",
  "Whoa! Yous just completed all the goals , time for chill :D",
];

desc.innerText = quotes[0];

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    isEmpty = [...inputBox].every((input) => {
      return input.value;
    });
    if (isEmpty) {
      checkbox.parentElement.classList.toggle("completed");
      let nextElementSibling = checkbox.nextElementSibling;
      allGoals[nextElementSibling.id].isCompleted =
        !allGoals[nextElementSibling.id].isCompleted;

      completedCount = Object.values(allGoals).filter(
        (count) => count.isCompleted
      ).length;
      progressValue.style.width = `${(completedCount / 3) * 100}%`;
      desc.innerText = quotes[completedCount];
      goalCount.innerText = `${completedCount} / 3 Complete`;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      error_label.classList.add("show-error");
    }
  });
});

inputBox.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].goal;
    if (allGoals[input.id].isCompleted) {
      allGoals[input.id].isCompleted = true;
      input.parentElement.classList.add("completed");
    }
  }
  input.addEventListener("input", (e) => {
    if (e.target.value) {
      error_label.classList.remove("show-error");
    }
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].isCompleted) {
      input.value = allGoals[input.id].goal;
    }

    if (allGoals[input.id]) {
      allGoals[input.id].goal = input.value;
    } else {
      allGoals[input.id] = {
        goal: input.value,
        isCompleted: false,
      };
    }
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
