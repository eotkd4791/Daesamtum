const toDoForm = document.querySelector(".js-toDoForm"),//querySelector는 내가 필요한 뭔가를 HTML에서 찾는다는 말.
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function deleteToDo(event) {
    //console.log(event);         이벤트의 발생 유무 확인?
    console.log("event.target = " , event.target); // 어디서 발생하는지 확인?
    //console.dir(event.target);  부모 찾는 용도(parentNode)
    const btn = event.target;
    const li = btn.parentNode;
    console.log("li = " ,li.text );
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //로컬 스토리지에는 자바스크립트의 데이터(객체)를 저장할 수 없다. 오직 문자열만 가능하기 때문에 JSON.stringify()라는 함수를 쓴다.
    //그러면 Object -> String이 된다.
}
    
function paintToDo(text){
    const li = document.createElement("li");//HTML에 내가 원하는 뭔가를 만든다는 뜻
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    
    delBtn.innerText = "🗑";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);//뭔가를 그의 조상엘리멘트에 넣는 것임.
    li.id = newId;
    li.text=text;
    console.log(li.text);
    toDoList.appendChild(li);
    
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    } 
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();