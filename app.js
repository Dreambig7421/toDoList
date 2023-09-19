///////////////Variable Declaration////////////////////////////////

const addBtn = document.getElementById ("add-Btn");

const newTaskInput = document.getElementById ("task=input");

const taskContainer = document.getElementById ("tasks");

const error = document.getElementById ("error");

const countValue = document.getElementById ("count-value");

let taskCount = 0;

/////////////Count Display Function////////////////////////////////

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>

        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>`;
    taskContainer.insertAdjacentHTML ("beforeend", task);

    const deleteButtons = document.querySelectorAll (".delete");
    deleteButtons.forEach((button) => {
        button.onclick = (e) => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount = (taskCount);
        };
    });

    const editButtons = document.querySelectorAll (".edit")
    editButtons.forEach ((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if(!(e.target.className == "edit")) {
                targetElement = e.target.parentElement;
            };
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount); 
        };
    });
    const tasksCheck = document.querySelectorAll ("task-check");
    tasksCheck.forEach((checkbox) => {
        checkbox.onChange = () => {
            checkbox.nextElementSibling.classList.toggle ("completed");
            if (checkbox.checked) {
                taskCount -= 1;
            } else {
                taskCount += 1;
            }
            displayCount (taskCount);
        };
    });
    taskCount +=1;
    displayCount (taskCount);
    newTaskInput.value = "";
    
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount (taskCount);
    newTaskInput.value = "";
};




