let list = document.querySelector(".list");
let input = document.querySelector("#inputTask");
let todos = [];
let completed = [];

window.onload = function() {
    if(localStorage.getItem('todos') !== null) {
        todos = JSON.parse(localStorage.getItem('todos'));
        completed = JSON.parse(localStorage.getItem('completed'));
        todos.forEach(function(todo, index) { // print todo
            var task = document.createElement("li");
            // check icon
            var check = document.createElement("i");
            if(completed[index] == '1') {
                task.classList.add('completed');
                check.classList.add('fa-solid', 'fa-circle-check', 'fa-2xl');
            }
            else
                check.classList.add('fa-regular', 'fa-circle', 'fa-2xl');
            task.appendChild(check);
            // text
            var text = document.createElement("span");
            text.textContent = todo;
            task.appendChild(text);
            // remove icon
            var remove = document.createElement("i");
            remove.classList.add('fa-solid', 'fa-xmark', 'fa-xl', 'remove');
            task.appendChild(remove);
            //edit icon
            var edit = document.createElement("i");
            edit.classList.add('fa-solid', 'fa-pen-to-square', 'fa-xl', 'edit');
            task.appendChild(edit);
            list.appendChild(task);
        });
    }
}

function addTask() { // add todo to local storage
    todos.push(input.value); 
    localStorage.setItem('todos', JSON.stringify(todos));
    completed.push('0'); 
    localStorage.setItem('completed', JSON.stringify(completed));
    location.reload();
}

list.addEventListener("click", function(e) {
    if(e.target.classList[3] == "remove") { // remove todo from local storage
        key = e.target.parentElement.textContent;
        index = 0;
        counter = 0;
        todos.forEach(function(todo) {
            if(todo == key)
                index = counter;
            else
                counter++;
        });
        todos = todos.slice(0, index).concat(todos.slice(index + 1));
        localStorage.setItem('todos', JSON.stringify(todos));
        completed = completed.slice(0, index).concat(completed.slice(index + 1));
        localStorage.setItem('completed', JSON.stringify(completed));
        location.reload();
    }
    else if(e.target.classList[3] == "edit") { // edit todo
        key = e.target.parentElement.textContent;
        var result = prompt("Please enter new text", key);
        if(result != null) {
            index = 0;
            counter = 0;
            todos.forEach(function(todo) {
                if(todo == key)
                    index = counter;
                else
                    counter++;
            });
            todos[index] = result;
            localStorage.setItem('todos', JSON.stringify(todos));
            location.reload();
        }
    }
    else { // complete todo
        var key = e.target.textContent;
        index = 0;
        counter = 0;
        todos.forEach(function(todo) {
            if(todo == key)
                index = counter;
            else
                counter++;
        });
        if(completed[index] != '1') {
            completed[index] = '1';
            localStorage.setItem('completed', JSON.stringify(completed));
            location.reload();
        }
    }
});