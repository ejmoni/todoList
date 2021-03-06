let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("tab-underline")
let taskList = [];
let mode = "all";
let filterList=[];

addButton.addEventListener("click", addTask)
taskInput.addEventListener("focus",function(){
    taskInput.value="";
});

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}
console.log(tabs);
function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent : taskInput.value,
       isComplete:false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let result = "";
    list = [];
    if(mode=="all"){
        list = taskList;
    }else if(mode == "ongoing" || mode=="done"){
        list = filterList;
    }

    let resultHTML ="";
    for(let i =0;i<list.length;i++){
        if(list[i].isComplete){
            resultHTML+=`<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`;
    }else{
            resultHTML +=`<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    </div>`;
    }
        
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){

    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
         }
    }
    render();
    console.log(taskList);
}

function deleteTask(id){
   for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
        taskList.splice(i,1);
        break;
   }
   }
   render();
}
function filter(event){

    mode =event.target.id;
    filterList=[];
    if(mode=="all"){
        render();
    }else if(mode =="ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        
        render();
    }else if(mode == "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }

    console.log(filterList);
}


function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}