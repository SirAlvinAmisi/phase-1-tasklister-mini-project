// Wait for the DOM to fully load before executing any JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Get references to the form and input field
  const form = document.getElementById("create-task-form");
  const inputField = document.getElementById("new-task-description");

  // Create and add a priority dropdown menu to the form
  const priorityDropdown = document.createElement("select");
  priorityDropdown.id = "priority";

  // Add priority options to the dropdown
  const priorities = [
    { value: "major", label: "Major (Red)" },
    { value: "medium", label: "Medium (Yellow)" },
    { value: "least", label: "Least (Green)" },
  ];

  priorities.forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority.value;
    option.textContent = priority.label;
    priorityDropdown.appendChild(option);
  });

  // Append the priority dropdown to the form
  form.appendChild(priorityDropdown);

  // Listen for form submission via the Submit button
  form.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    addTask();
  });

  // Listen for the Enter key in the input field
  inputField.addEventListener("keypress", function (event) {
    // Check if the Enter key was pressed
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default Enter behavior
      addTask();
    }
  });
});

// Function to add a new task
function addTask() {
  // Get the task description and priority
  const taskDescription = document.getElementById("new-task-description").value;
  const priority = document.getElementById("priority").value;

  // Ignore empty input
  if (taskDescription.trim() === "") return;

  // Create a new <li> element for the task
  const taskItem = document.createElement("li");
  taskItem.textContent = taskDescription;

  // Set the text color based on the selected priority
  if (priority === "major") taskItem.style.color = "red";
  else if (priority === "medium") taskItem.style.color = "yellow";
  else if (priority === "least") taskItem.style.color = "green";

  // Create a delete button to remove the task
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.style.marginLeft = "10px";
  deleteButton.addEventListener("click", () => taskItem.remove());

  // Create an edit button to modify the task
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.style.marginLeft = "10px";
  editButton.addEventListener("click", () => {
    const newDescription = prompt("Edit your task:", taskItem.textContent);
    if (newDescription && newDescription.trim() !== "") {
      taskItem.textContent = newDescription;
      taskItem.style.color =
        priority === "major"
          ? "red"
          : priority === "medium"
          ? "yellow"
          : "green";
      taskItem.appendChild(deleteButton);
      taskItem.appendChild(editButton);
    }
  });

  // Append the delete and edit buttons to the task item
  taskItem.appendChild(deleteButton);
  taskItem.appendChild(editButton);

  // Append the new task to the tasks list
  const tasksList = document.getElementById("tasks");
  tasksList.appendChild(taskItem);

  // Clear the input field
  document.getElementById("new-task-description").value = "";
}

// Stretch deliverable: Sorting tasks by priority
const sortTasks = () => {
  const tasksList = document.getElementById("tasks");
  const tasks = Array.from(tasksList.children);

  // Sort tasks based on their color (priority)
  tasks.sort((a, b) => {
    const priorityOrder = { red: 1, yellow: 2, green: 3 };
    return priorityOrder[a.style.color] - priorityOrder[b.style.color];
  });

  // Clear the tasks list and append the sorted tasks
  tasksList.innerHTML = "";
  tasks.forEach((task) => tasksList.appendChild(task));
};

// Add a sorting button to the page
const addSortingButton = () => {
  const sortButton = document.createElement("button");
  sortButton.textContent = "Sort Tasks by Priority";
  sortButton.style.marginTop = "10px";
  sortButton.addEventListener("click", sortTasks);

  const listContainer = document.getElementById("list");
  listContainer.appendChild(sortButton);
};

// Call the function to add the sorting button on page load
addSortingButton();
