var tareaNueva=document.getElementById("containerNewTask");
var sideBar1=document.getElementById("sideBar");
var contenedor=document.getElementById("contentPanel");
var tbxNombre=document.getElementById("tbxNombre");
var contenedorTasks=document.getElementById("tasksContainer");
var contenedorCompleted=document.getElementById("containerCompleted");
var botonCompleted=document.getElementById("btnCompleted");
var toggler=0;
var arregloTarea=[];
var iterador=0;
var tiempo=Date.now();
var fechaActual=new Date(tiempo);

loadBD();

tbxNombre.addEventListener("focus",function(){
    tbxNombre.style.boxShadow="none";
},false);
tbxNombre.addEventListener("change",function(){
    insertTask();
},false);

function insertTask(){
    if(tbxNombre.value==""){
        tbxNombre.style.boxShadow="0 0 10px red";
    }else{
        arregloTarea.push({id:iterador,nombre:tbxNombre.value,asignada:false,finished:false,fechaC:fechaActual.toDateString(),fechaCompleta:false});
        localStorage.setItem(iterador,JSON.stringify(arregloTarea[iterador]));
        tbxNombre.value="";
        tbxNombre.focus();
        iterador++;
        location.reload();
    }
}
function showCompleted(){
    if(toggler % 2 == 0){
        contenedorCompleted.style.display="block";
        botonCompleted.innerText="Ocultar tareas completas ↑";
    }else{
        contenedorCompleted.style.display="none";
        botonCompleted.innerText="Mostrar tareas completas ↓"
    }
    toggler++;
}
function showAddTarea(){
    if(toggler % 2 == 0){
        tareaNueva.style.display="block";
        tbxNombre.focus();
    }else{
        tareaNueva.style.display="none";
    }
    toggler++;
}
function showSideBar(){
    if(toggler % 2 == 0){
        sideBar1.style.width="150px";
        contenedor.style.left="160px";
    }else{
        sideBar1.style.width="50px";
        contenedor.style.left="60px";
    }
    toggler++;
}
function loadBD(){
    if(localStorage.length<1){
        console.log("BD VACIA!");
    }else{
        console.log(localStorage.length)
        for(i=0;i<localStorage.length;i++){
            arregloTarea.push(JSON.parse(localStorage.getItem(i)));
            console.log(arregloTarea);
            createTasks();
            iterador++;
        }
    }
}
function createTasks(){
    let task=document.createElement("div");
    let taskHeader=document.createElement("div");
        let radioTask=document.createElement("input");
        let nameTask=document.createElement("label");
    let taskBody=document.createElement("div");
        let contentBody=document.createElement("p");
    let taskFooter=document.createElement("div");
        let userIconTask=document.createElement("div");
        let userNameTask=document.createElement("a");

    //INICIALIZACION DE LOS ELEMENTOS CREADOS
    task.className="task";
    taskHeader.className="task-header";
        radioTask.className="radio-check";
        radioTask.type="radio";
        radioTask.id=arregloTarea[i].id;
        radioTask.addEventListener("click",function(){
            completeTask(this.id);
            console.log("Completa");
        },false);
        if(arregloTarea[i].finished==true){
            nameTask.innerText="Completada el: "+arregloTarea[i].fechaCompleta;
            nameTask.className="task-completed-label";
        }else{
            nameTask.innerText="Completar";
        }
        
    taskBody.className="task-body";
        contentBody.innerText=arregloTarea[i].nombre;
        contentBody.className="text-tarea";
    taskFooter.className="task-footer";
        userIconTask.className="round-username-icon-task";
        userIconTask.innerText="AG";
        userNameTask.innerText="Arturo Garcia";

    //APPEND DE LOS ELEMENTOS CREADOS ARRIBA
        task.appendChild(taskHeader);
        if(arregloTarea[i].finished==true){
            contenedorCompleted.appendChild(task)
        }else{
            contenedorTasks.appendChild(task);
            taskHeader.appendChild(radioTask);
        }
            
            taskHeader.appendChild(nameTask);
        task.appendChild(taskBody);
            taskBody.appendChild(contentBody);
        taskBody.appendChild(taskFooter);
            taskFooter.appendChild(userIconTask);
            taskFooter.appendChild(userNameTask);
}
function completeTask(identifier){
    localStorage.setItem(identifier,JSON.stringify({id:arregloTarea[identifier].id,nombre:arregloTarea[identifier].nombre,asignada:arregloTarea[identifier].asignada,finished:true,fechaC:arregloTarea[identifier].fechaC,fechaCompleta:fechaActual.toDateString()}));
    location.reload();
}