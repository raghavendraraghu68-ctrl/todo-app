let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((taskObj, index) => {
    let li = document.createElement("li");

    li.textContent = taskObj.text;

    if (taskObj.completed) {
      li.style.textDecoration = "line-through";
    }

    li.onclick = function () {
      taskObj.completed = !taskObj.completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showTasks();
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function (e) {
      e.stopPropagation(); // prevent li click
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showTasks();
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;

  if (task === "") {
    alert("Enter a task!");
    return;
  }

  tasks.push({ text: task, completed: false });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  showTasks();
}

showTasks();
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
