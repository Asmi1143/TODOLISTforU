var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");

function addTask() {
    var taskText = taskInput.value;
    var dateInput = document.getElementById("dateInput");

    var taskDate = new Date(dateInput.value);
    var timeLimit = taskDate - Date.now();

    if (taskText.trim() !== "" && timeLimit > 0) {
        var taskItem = document.createElement("li");
        taskItem.taskTextSpan = document.createElement("span");
        taskItem.taskDateSpan = document.createElement("span");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function() {
            taskItem.taskTextSpan.style.textDecoration = this.checked ? "line-through" : "none";
            if (this.checked) {
                showCompletionMessage(taskText);
            }
        });

        taskItem.taskTextSpan.textContent = taskText;
        taskItem.taskDateSpan.textContent = taskDate.toLocaleString();

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            deleteTask(taskItem);
        });

        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function() {
            editTask(taskItem, taskText, taskDate);
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskItem.taskTextSpan);
        taskItem.appendChild(taskItem.taskDateSpan);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
        taskInput.value = "";
        dateInput.value = "";

        setTimeout(function() {
            if (!checkbox.checked) {
                taskItem.style.backgroundColor = "red";
                alert("Time's up! Complete the task: " + taskText);
            }
        }, timeLimit);
    }
}

function deleteTask(taskItem) {
    taskItem.parentNode.removeChild(taskItem);
}

function showCompletionMessage(taskText) {
    var completionMessage = document.createElement("p");
    completionMessage.textContent = "Congratulations! You successfully completed the task: " + taskText;
    completionMessage.style.color = "green";
    taskList.appendChild(completionMessage);


    
    var cheerUpMessage = document.createElement("p");
    cheerUpMessage.textContent = "Now, take a break and cheer up!";
    cheerUpMessage.style.color = "blue";
    taskList.appendChild(cheerUpMessage);
}

function editTask(taskItem, taskText, taskDate) {
    var newText = prompt("Edit the task:", taskText);
    var newDate = prompt("Edit the date and time (YYYY-MM-DD HH:MM):", taskDate.toISOString().substring(0, 16));
    var newDateTime = new Date(newDate);
    console.log(newText);

    if (newText !== null && newDate !== null) {
        taskItem.taskTextSpan.textContent = newText;
        taskItem.taskDateSpan.textContent = newDateTime.toLocaleString();
    }
}