const getid = id => document.getElementById(id);
const crel = nn => document.createElement(nn);

window.onload = function () {
	const input = getid('input');
    const addBtn = getid('add');
    const output = getid('output');
    
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    
    addBtn.onclick = handleAdd;
    input.onkeydown = function (event) {
        if (event.key == 'Enter') handleAdd();
    }
    
    function handleAdd() {
        let val = input.value;
        if (val == '') return;
        addTodo(val);
        input.value = '';
        apply();
    }
    
    function delTodo(id) {
        todos.splice(id, 1);
        apply();
    }
    function likeTodo(id) {
        todos[id].like = !todos[id].like;
        apply();
    }
    function addTodo(name) {
        todos.push({
            name, like: false
        });
        apply();
    }
    
    function apply() {
        localStorage.setItem('todos', JSON.stringify(todos));
        output.innerHTML = '';
        todos.forEach(function (todo, id) {
            const li = crel('li');
            const name = crel('span');
            const likeBtn = crel('button');
            const delBtn = crel('button');
            
            likeBtn.innerHTML = '♥';
            likeBtn.onclick = () => likeTodo(id);
            delBtn.innerHTML = 'x';
            delBtn.onclick = () => delTodo(id);
            
            name.innerHTML = todo.name;
            if (todo.like) likeBtn.classList.add('like');
            
            li.append(name);
            li.append(likeBtn);
            li.append(delBtn);
            
            output.append(li);
        });
    }
    apply();
}
