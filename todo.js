let todos = JSON.parse(localStorage.getItem('todos')) || [];
const donetodos = JSON.parse(localStorage.getItem('donetodos')) || [];


function addTodo(){
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    if(title && desc){
    todos.push({title: title, desc: desc});
    console.log(todos)
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log(JSON.parse(localStorage.getItem("todos")))
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
    showTodos();
    }else{
    alert("All Fields are required");
    }
}


function showTodos(){
    let ul = document.getElementById("todos"); 
    ul.innerHTML = '';
    var utodos = JSON.parse(localStorage.getItem('todos'))
    for(let i = 0; i < utodos.length; i++){
    let li = document.createElement('li');
    li.innerText = `${utodos[i].title} - ${utodos[i].desc}`;
    let dlt = document.createElement('button');
    dlt.setAttribute("onclick", "deleteTodo(" + i + ")");
    dlt.innerText = 'Delete';
    dlt.setAttribute("id","dltbtn")
    let upd = document.createElement('button');
    upd.setAttribute("onclick", "updateTodo(" + i + ")");
    upd.innerText = 'Update';
    upd.setAttribute("id","updbtn")
    let dn = document.createElement('button');
    dn.setAttribute("onclick", "doneTodo(" + i + ")");
    dn.innerText = 'Done';
    dn.setAttribute("id","dnbtn")



    li.appendChild(dlt);
    li.appendChild(upd);
    li.appendChild(dn)
    ul.appendChild(li);
    }
}

showTodos()

function deleteTodo(index){
    var utodos = JSON.parse(localStorage.getItem('todos'))
    todos.splice(index,1);
    utodos.splice(index,1);
    console.log("utodo",utodos)
    console.log("todo",todos)
    localStorage.setItem('todos', JSON.stringify(utodos));
    showTodos();
}

function updateTodo(index){
    
    let fldTitle = prompt("Enter New Title:");
    let fldDesc = prompt("Enter New Description:");
    if(fldTitle && fldDesc){
        todos[index] = {title : fldTitle , desc : fldDesc};
        showTodos();
    }
    else
    {
        alert("Please Fill Both fields!");
        updateTodo(index)
    } 
}

function doneTodo(index){
    donetodos.push(todos[index])
    deleteTodo(index)
    showdonetodo(donetodos)
    console.log(todos)
    console.log(donetodos)
    
}

function showdonetodo(list){
    let ul = document.getElementById("dntodos");
    ul.innerHTML = '';
    let title = document.createElement('h1')
    title.textContent= `Done Todo:`
    ul.appendChild(title);
    for(let i = 0; i < donetodos.length; i++){
    let li = document.createElement('li');
    li.innerText = `${donetodos[i].title} - ${donetodos[i].desc}`
    ul.appendChild(li)

    let rev = document.createElement('button');
    rev.setAttribute("onclick", "revTodo(" + i + ")");
    rev.innerText = 'Revert';
    rev.setAttribute("id","revbtn")
    li.appendChild(rev)
}
}

function revTodo(index){
        todos.push(donetodos[index])
        localStorage.setItem('todos', JSON.stringify(todos));
        deldonetodo(index)
        showTodos(todos)
}

function deldonetodo(index){
    donetodos.splice(index,1)
    showdonetodo(donetodos)
}
