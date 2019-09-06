var addMessage = document.querySelector('.message'),
    addButton  = document.querySelector('.add'),
    todo       = document.querySelector('.todo');


var todoList   = [];

if(localStorage.getItem("todo")){
    todoList = JSON.parse(localStorage.getItem("todo"))
}


addButton.addEventListener("click", function(){
    if(!addMessage.value)return;
    var newTodo = {
        todo: addMessage.value,
        checked: false,
        important:false
    };
    todoList.push(newTodo);
    displeyMessages();
    localStorage.setItem("todo", JSON.stringify(todoList));
    addMessage.value = '';
});

function displeyMessages(){
    var displeyMessages = "";
    if(todoList === 0){
        todo.innerHTML = "";
    }
    todoList.forEach(function(item,i){
        displeyMessages += `
            <li>
                <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : ""}>
                <label for="item_${i}" class="${item.important ? 'important' : ''}">${item.todo}</label>
            </li>
        `;
        todo.innerHTML = displeyMessages;
    });
}

todo.addEventListener('change', function(event){
var valueLabel = todo.querySelector('[for='+ event.target.getAttribute('id') +']').innerHTML;
todoList.forEach(function(item){
    if(item.todo === valueLabel){
        item.checked =!item.checked;
        localStorage.setItem("todo", JSON.stringify(todoList));

    }
});
});

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){
            if(event.ctrlkey || event.metaKey){
                todoList.splice(i , 1);
            }else{
                item.important = !item.important;
            }
            displeyMessages();
            localStorage.setItem("todo", JSON.stringify(todoList));
        }
    });
});