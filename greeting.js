const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");//쿼리 셀렉터는 찾은 첫번째 것을 가져온다. 
//또 다른 방법은 querySelectorAll를 이용하면 모든 것을 가져온다. 클래스명에 따른 엘리먼트를 가져오는데 이건 배열을 준다.

//로컬 스토리지
const USER_LS = "currentUser",
    SHOWING_ON = "showing";

function DeleteName(text){
    localStorage.DeleteName(USER_LS,text);
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){//무언가 submit이 되면 해당 이벤트를 처리하는 함수
    //보통 event가 나타나면 root에서 발생하고 form에서 일어난다. 마치 거품처럼.
    //왜냐하면 이것이 올라면서 다른 모든 것들이 event에 반응하기 때문에.. 
    //form을 제출하는 이벤트가 발생하면 event가 계속 올라간다. document까지.
    //해당 document 다른 곳으로 간다. (input에 입력하고 엔터를 치면 해당 내용이 없어짐.)
    //엔터키를 누르면 프로그래밍이 되어진대로 다른 곳으로 가고 페이지가 새로고침이 된다.
    event.preventDefault();//#1
    //따라서 이러한 디폴드 동작을 위의 함수를 통해서 막는다.
    //이 함수를 호출하면 input에 입력을 한 후, 엔터를 쳐도 아무일도 일어나지 않는다.
    
    const currentValue = input.value;
    //console.log(currentValue);
    paintGreeting(currentValue); //입력값을 보여주지만 새로고침하면 없어진다. 따라서 saveName이라는 함수를 만들어 저장 기능을 구현한다.
    /*
        기본 동작을 막는 1단계 -> event.preventDefault()메소드를 호출한다.
                     2단계 -> 이 파라미터의 value를 얻기 위해 input.value를 가져온다.
                     3단계 -> input에서 가져온 값을 화면에 보여주기 위해 paintGreeting 함수를 가져온다.(저장은 안되기 때문에 새로고침하면 삭제됨)
                     4단계 -> input으로 입력 받은 값을 local storage에 저장하면 새로고침을 해도 값이 유지된다. 
                     5단계 -> saveName이라는 함수를 통해서 input으로 입력 받은 값을 local storage에 셋팅한다. (localStorage.setItem(Key,Value))
    */

    /*
        localStorage에 대한 얘기
        # 로컬 스토리지는 URL기반으로 동작한다.
        # 따라서 내가 만든 앱은 페이스북이나 다른 웹사이트의 로컬 스토리지에 접근하지 않는다. 
    */
   saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_ON);
    //input창에 이름을 입력하고 엔터를 누른다는 것은 제출한다는 것을 의미한다.
    //input태그가 form태그 내부에 있을 때 엔터키를 알아차린다.
    //엔터를 치면 웹사이트를 새로고침하는 것과 같이 된다. default동작(handleSubmit함수 주석 설명)에 의해서 form을 제출하면 이 정보를 다른 곳에 보내려고 한다.
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {//stef가 존재하기 때문에 null이 아니다.
    //currentUser값이 null이면 input 상자를 띄움.
        askForName();
    } else {
        //she is
        paintGreeting(currentUser);
    }
}


function init() {
    loadName();
}
init();