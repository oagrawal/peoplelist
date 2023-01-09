window.addEventListener('load', () => {

    currentName = localStorage.getItem('clickedName');
    currentNameData = JSON.parse(localStorage.getItem(currentName)) || [];

    const currentNameText = document.querySelector('#currentNameText');
    currentNameText.innerHTML = "Displaying information for " + currentName;

    const goBack = document.querySelector('#goBack');

    goBack.addEventListener('click', (e) => {
        localStorage.removeItem('clickedName');
        location.href = "index.html";
    });
    
    DisplayMeetings();

});

function DisplayMeetings(){

    const list_el = document.querySelector('#tasks');
	list_el.innerHTML = "";

    currentNameData.forEach(person => {

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const input = document.querySelector('#new-task-input');

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el1 = document.createElement("textarea");
        task_input_el1.classList.add("text");
        task_input_el1.placeholder = "(no information)";
        task_input_el1.type = "text"
        task_input_el1.value = person.meeting;
        task_input_el1.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el1)


        const task_input_el2 = document.createElement("textarea");
        task_input_el2.classList.add("text");
        task_input_el2.placeholder = "(no information)";

        task_input_el2.type = "text"
        task_input_el2.value = person.meeting2;
        task_input_el2.setAttribute("readonly", "readonly");


        task_content_el.appendChild(task_input_el2)

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el1 = document.createElement("button");
        task_edit_el1.classList.add("edit");
        task_edit_el1.innerHTML = "Edit info 1";

        const task_edit_el2 = document.createElement("button");
        task_edit_el2.classList.add("secondEdit");
        task_edit_el2.innerHTML = "Edit info 2";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        // const time = document.createElement("h2");
        // time.classList.add("time");
        // time.innerHTML = person.createdAt

        task_actions_el.appendChild(task_edit_el1);
        task_actions_el.appendChild(task_edit_el2);
        task_actions_el.appendChild(task_delete_el);
        // task_actions_el.appendChild(time);


        task_el.appendChild(task_actions_el)

        list_el.appendChild(task_el);
        
        task_edit_el1.addEventListener('click', (e) => {
			task_input_el1.removeAttribute('readonly');
			task_input_el1.focus();
			task_input_el1.addEventListener('blur', (e) => {
				task_input_el1.setAttribute('readonly', true);
				person.meeting = e.target.value;
				localStorage.setItem(currentName, JSON.stringify(currentNameData));
				DisplayMeetings()

			})
		})

        task_edit_el2.addEventListener('click', (e) => {

			task_input_el2.removeAttribute('readonly');
			task_input_el2.focus();
			task_input_el2.addEventListener('blur', (e) => {
				task_input_el2.setAttribute('readonly', true);
				person.meeting2 = e.target.value;
				localStorage.setItem(currentName, JSON.stringify(currentNameData));
				DisplayMeetings()

			})
		})

        task_delete_el.addEventListener('click', (e) => {
            if (window.confirm("Are you sure you want to delete meeting's "+
            "information? This action cannot be reversed.")) {
                currentNameData = currentNameData.filter(t => t != person);
                localStorage.setItem(currentName, JSON.stringify(currentNameData));
                DisplayMeetings();
            }       
        	
		})
    })
}