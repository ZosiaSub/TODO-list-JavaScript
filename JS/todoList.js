 function CreateTodo() {

        var list = document.getElementById('todo-list');
        var url = 'https://todo-list-632b6.firebaseio.com/Todos.json';

        this.init = getTodoList;
        this.save = saveNewTodo;

        function getTodoList(){
            fetch(url,{
                method: "GET"
            }).then(function(response){
                return response.json();

            }).then(function(json){
                if(json){
                    createTodoList(json);
                    onClickRemoveTodo();
                }else {
                    emptyListInfo();
                }
            })
        }

        function createTodoList(json){
            for(var id in json){

                var li = document.createElement('li');
                li.className = "list-group-item";
                li.id = 'li-'+ id;
                li.innerText = json[id].value;

                var button = document.createElement('button');
                button.className = 'remove';
                button.id = id;
                button.innerText = "X";

                li.appendChild(button);
                list.appendChild(li);
                }
        }

        function emptyListInfo(){
             var noTodo = '<div id="noTodo">Nothing TODO :)</div>';
             list.innerHTML = noTodo;
        }

        function onClickRemoveTodo(){
            var buttons = document.querySelectorAll('.remove');
            buttons.forEach(function(button){

                 button.addEventListener('click', function(event){
                 var id = event.target.id;
                 removeTodo(id);

                 })
            })
        }

        function removeTodo(id) {
            fetch('https://todo-list-632b6.firebaseio.com/Todos/' + id + '.json', {
               method: "DELETE"
            }).then(function(){
               var deletedElement = document.getElementById('li-'+ id);
               deletedElement.remove();
            }).then(function(){
                var li = document.querySelector('li');
                if(!li){
                    emptyListInfo();
                }
            })
        }

        function saveNewTodo() {
            $('#add-button').on('click', function(e) {
                e.preventDefault();

                var addedElement = document.getElementById("add-new-element");
                var newTodo = addedElement.value;

                if (!newTodo) {
                    alert('Add new TODO :)');
                } else {
                    fetch(url, {
                        method: "POST",
                        body: JSON.stringify({value: newTodo})
                    }).then(function (response) {
                        if (response.ok) {
                            addedElement.value = "";
                            $('#todo-list').empty();
                        }
                    }).then(function(){
                        getTodoList();
                    })
                }
            })
        }
}



