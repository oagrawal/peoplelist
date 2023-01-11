window.addEventListener('load', () => {

    peopleArray = JSON.parse(localStorage.getItem('peopleArray')) || [];

    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');

    form.addEventListener('submit', (e) => {
        if(e.target.content.value == "" || e.target.id.value == ""){
            alert("Please include a name and ID");
        }else{
            e.preventDefault();
            const name = e.target.content.value + " (" + e.target.id.value + ")";


            const person = {
                meeting: e.target.meetingdetails.value,
                meeting2: e.target.meetingdetails2.value,
                done: false,
                createdAt: new Date()
            }


            if(!peopleArray.includes(name)){
                peopleArray.push(name);
            }  

            const nameData = JSON.parse(localStorage.getItem(name)) || [];
            nameData.push(person)
            localStorage.setItem(name, JSON.stringify(nameData));
            localStorage.setItem('peopleArray', JSON.stringify(peopleArray));

            e.target.reset();

            DisplayTodos();
        }
    });

    DisplayTodos();

});

function DisplayTodos(){
    const list_el = document.querySelector('#tasks');
	list_el.innerHTML = "";

    peopleArray.forEach(name => {

       const nameData = JSON.parse(localStorage.getItem(name)); // JSON code for name

       const task_el = document.createElement("div");
        task_el.classList.add("task");

        const input = document.querySelector('#new-task-input');

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text"
        task_input_el.value = name;
        
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el)

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit Name";


        const task_meetings_el = document.createElement("button");
        task_meetings_el.classList.add("meetings");
        task_meetings_el.innerHTML = "Meeting Details";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_meetings_el);
        task_actions_el.appendChild(task_delete_el);


        task_el.appendChild(task_actions_el)

        list_el.appendChild(task_el);

        input.value = "";
    
		task_edit_el.addEventListener('click', (e) => {

			task_input_el.removeAttribute('readonly');
			task_input_el.focus();
			task_input_el.addEventListener('blur', (e) => {

				task_input_el.setAttribute('readonly', true);

                //store the newName and Data from the old name
				const newName = e.target.value;

                if(name != newName){
                    localStorage.setItem(newName, JSON.stringify(nameData));
                    //adjust peopleArray
                    peopleArray[peopleArray.indexOf(name)] = newName;
                    localStorage.setItem('peopleArray', JSON.stringify(peopleArray));
                    localStorage.removeItem(name);
                    DisplayTodos()
                }
			})
		})


        task_meetings_el.addEventListener('click', (e) => {

            localStorage.setItem('clickedName', name);
            location.href = "meetings.html";
        })


		task_delete_el.addEventListener('click', (e) => {

            if (window.confirm("Are you sure you want to delete all of this name's "+
            "information? This action cannot be reversed.")) {
                peopleArray = peopleArray.filter(t => t != name);
                localStorage.setItem('peopleArray', JSON.stringify(peopleArray));
    
                localStorage.removeItem(name);
                DisplayTodos()
            }              

        	
		})

        
    })
}
