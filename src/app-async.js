// Mock task data
let tasks = [
  { name: "Complete assignment", completed: false },
  { name: "Prepare presentation", completed: true },
  { name: "Write report", completed: false },
  { name: "Review project proposal", completed: true },
  { name: "Attend team meeting", completed: false },
];

// This is used to display a loading message while the tasks are being fetched
const loadingElement = document.getElementById("loading-display");

// Async version
// TASK #2: Display "Loading tasks..."
// TASK #3: Display "Add task..."
// TASK #4: Display "Marking task as completed..."
// TASK #5: Display "Deleting task..."
async function getTasks() {
  // You will need to add something here...
  loadingElement.textContent = "Loading tasks...";
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        // You will need to add something here...
        loadingElement.textContent = "";
        resolve(tasks);
      },
      Math.random() * 2000 + 1000,
    );
  });
}

function displayTasks(taskList) {
  const taskListElement = document.getElementById("task-list");
  taskListElement.innerHTML = ""; // Clear existing tasks
  taskList.forEach((task) => {
    const listItem = document.createElement("li");

    const deleteButton = document.createElement("span");
    deleteButton.textContent = "🗑️";
    deleteButton.addEventListener("click", async (event) => {
      event.preventDefault();
      deleteButton.textContent = "🤯";
      tasks = await deleteTask(taskList.indexOf(task));
      displayTasks(tasks);
    });
    listItem.appendChild(deleteButton);

    const taskName = document.createElement("span");
    taskName.textContent = task.name;
    taskName.setAttribute("class", "task-name");
    taskName.addEventListener("click", async () => {
      tasks = await markAsCompleted(taskList.indexOf(task));
      displayTasks(tasks);
    });

    if (task.completed) {
      taskName.classList.add("completed");
    }

    listItem.appendChild(taskName);

    taskListElement.appendChild(listItem);
  });
}

function addTask(task) {
  // You will need to add something here...
  loadingElement.textContent = "Adding task...";
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        // You will need to add something here...
        loadingElement.textContent = "";
        tasks.push(task);
        resolve(tasks);
      },
      Math.random() * 2000 + 1000,
    );
  });
}

function deleteTask(taskIndex) {
  // You will need to add something here...
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        // You will need to add something here...
        tasks.splice(taskIndex, 1);
        resolve(tasks);
      },
      Math.random() * 2000 + 1000,
    );
  });
}

function markAsCompleted(taskIndex) {
  // You will need to add something here...
  loadingElement.textContent = "Marking task as completed...";
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        // You will need to add something here...
        loadingElement.textContent = "";
        tasks[taskIndex].completed = true;
        resolve(tasks);
      },
      Math.random() * 2000 + 1000,
    );
  });
}

document.getElementById("add-task").addEventListener("click", async (event) => {
  event.preventDefault();
  const input = document.getElementById("task-input");
  tasks = await addTask({ name: input.value, completed: false });
  input.value = "";
  displayTasks(tasks);
});

tasks = await getTasks();
displayTasks(tasks);
