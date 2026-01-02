const taskList = document.getElementById('task-list');
const inputBox = document.getElementById('inputBox');

const getTasks = async () => {
    try {
        const res = await fetch('http://localhost:3000/tasks');
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        data.forEach(task => {
            
            const markup = `<li data-id=${task._id} class="${task.terminee ? 'checked' : ''}">${task.titre}<span>\u00d7</span></li>`;
            document.querySelector('ul').insertAdjacentHTML('beforeend', markup);
        });
    }
    catch (error) {
        console.log(error);
    }
}

const createTask = async () => {
    try {

        if (inputBox.value === '') {
            alert("Veuillez saisir votre tâche!");
        }
        else {
            const taskTitle = {
                titre: inputBox.value
            };
            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskTitle)
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data.description);
                return;
            }

            let li = document.createElement("li");
            li.innerHTML = inputBox.value;
            taskList.appendChild(li);

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);

            inputBox.value = "";
        }
    }
    catch (error) {
        console.log(error);
    }

}

const deleteTask = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }
    }
    catch (error) {
        console.log(error);
    }
}


const updateTask = async (id, terminee) => {
    try {

        const taskTerminee = {
            terminee: terminee
        };
        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskTerminee)
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }
    }
    catch (error) {
        console.log(error);
    }
}

taskList.addEventListener("click", function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        const li = e.target.closest("li");
        const id = li.dataset.id;
        const terminee = e.target.classList.contains('checked');
        updateTask(id, terminee);

    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        const li = e.target.closest("li");
        const id = li.dataset.id;
        deleteTask(id);
    }

})

getTasks();