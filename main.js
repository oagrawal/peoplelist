window.addEventListener('load', () => {

    todos = JSON.parse(localStorage.getItem('todos')) || [];

    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');

    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
        
    //     const task = input.value;

    //     if(!task){
    //         alert("Please fill out the task!");
    //         return;
    //     }
        
    //     const task_el = document.createElement("div");
    //     task_el.classList.add("task");

    //     const task_content_el = document.createElement("div");
    //     task_content_el.classList.add("content");
    //     // task_content_el.innerText = task;

    //     task_el.appendChild(task_content_el);

    //     const task_input_el = document.createElement("input");
    //     task_input_el.classList.add("text");
    //     task_input_el.type = "text"
    //     task_input_el.value = task;
    //     task_input_el.setAttribute("readonly", "readonly");

    //     task_content_el.appendChild(task_input_el)

    //     const task_actions_el = document.createElement("div");
    //     task_actions_el.classList.add("actions");

    //     const task_edit_el = document.createElement("button");
    //     task_edit_el.classList.add("edit");
    //     task_edit_el.innerHTML = "Edit";

    //     const task_delete_el = document.createElement("button");
    //     task_delete_el.classList.add("delete");
    //     task_delete_el.innerHTML = "Delete";

    //     task_actions_el.appendChild(task_edit_el);
    //     task_actions_el.appendChild(task_delete_el);

    //     task_el.appendChild(task_actions_el)

    //     list_el.appendChild(task_el);

    //     input.value = "";

    //     task_edit_el.addEventListener('click', () => {

    //         if(task_edit_el.innerHTML.toLowerCase() == "edit"){
    //             task_input_el.removeAttribute('readonly');
    //             task_input_el.focus();
    //             task_edit_el.innerHTML = "Save";
    //         }else{
    //             task_input_el.setAttribute('readonly', 'readonly');
    //             task_edit_el.innerHTML = "Edit";
    //         }
            
    //     })

    //     task_delete_el.addEventListener('click', () => {

    //         list_el.removeChild(task_el);
            
    //     });

    // });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const todo = {
            content: e.target.content.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();

    });

    DisplayTodos();

});

function DisplayTodos(){
    const list_el = document.querySelector('#tasks');
	list_el.innerHTML = "";

    todos.forEach(todo => {
        const task_el = document.createElement("div");
         task_el.classList.add("task");

         const input = document.querySelector('#new-task-input');


        // const label = document.createElement('label');
		// const input = document.createElement('input');
		// const span = document.createElement('span');
		// const content = document.createElement('div');
		// const actions = document.createElement('div');
		// const edit = document.createElement('button');
		// const deleteButton = document.createElement('button');

        
		// input.type = 'checkbox';
		// input.checked = todo.done;
		// span.classList.add('bubble');
		// if (todo.category == 'personal') {
		// 	span.classList.add('personal');
		// } else {
		// 	span.classList.add('business');
		// }
		// content.classList.add('todo-content');
		// actions.classList.add('actions');
		// edit.classList.add('edit');
		// deleteButton.classList.add('delete');

		// content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		// edit.innerHTML = 'Edit';
		// deleteButton.innerHTML = 'Delete';

		// label.appendChild(input);
		// label.appendChild(span);
		// actions.appendChild(edit);
		// actions.appendChild(deleteButton);
		// todoItem.appendChild(label);
		// todoItem.appendChild(content);
		// todoItem.appendChild(actions);

		// todoList.appendChild(todoItem);

        
            const task_content_el = document.createElement("div");
            task_content_el.classList.add("content");
            // task_content_el.innerText = task;
    
            task_el.appendChild(task_content_el);
    
            const task_input_el = document.createElement("input");
            task_input_el.classList.add("text");
            task_input_el.type = "text"
            // task_input_el.value = task;
            task_input_el.value = todo.content;
            
            task_input_el.setAttribute("readonly", "readonly");
    
            task_content_el.appendChild(task_input_el)
    
            const task_actions_el = document.createElement("div");
            task_actions_el.classList.add("actions");
    
            const task_edit_el = document.createElement("button");
            task_edit_el.classList.add("edit");
            task_edit_el.innerHTML = "Edit";
    
            const task_delete_el = document.createElement("button");
            task_delete_el.classList.add("delete");
            task_delete_el.innerHTML = "Delete";
    
            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);
    
            task_el.appendChild(task_actions_el)
    
            list_el.appendChild(task_el);
    
            input.value = "";
    

		// if (todo.done) {
		// 	task_el.classList.add('done');
		// }
		
		// input.addEventListener('change', (e) => {
		// 	// todo.done = e.target.checked;
		// 	localStorage.setItem('todos', JSON.stringify(todos));

		// 	if (todo.done) {
		// 		todoItem.classList.add('done');
		// 	} else {
		// 		todoItem.classList.remove('done');
		// 	}

		// 	DisplayTodos()

		// })

		task_edit_el.addEventListener('click', (e) => {
			task_input_el.removeAttribute('readonly');
			task_input_el.focus();
			task_input_el.addEventListener('blur', (e) => {
				task_input_el.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		task_delete_el.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})
    })
}