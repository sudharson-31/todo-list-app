import { useState } from "react";
import List from "./list";
let id1 =0;
export default function Todo(){
    const [theme,setTheme] = useState(true)
    const [newTodo,setnewTodo] = useState({isCompleted: false, text: ""})
    const root = document.getElementById('root')
    const [filtermode,setFilterMode] = useState(0);
    const [modified, setModified] = useState(0);
    const [todoListArray, setTodoListArray] = useState([])
  
    function themer(){
        if(theme){
            root.classList.remove("darkmode")
            root.classList.add("lightmode")
            
        }
        else{
            root.classList.remove("lightmode")
            root.classList.add("darkmode")
        }
        setTheme(!theme)
    }
    function handleNewText(e){
        setnewTodo({...newTodo,text: e.target.value})
    }
    function handleCheck(e){
        let a = newTodo.isCompleted;
        const checkbox1 = document.getElementById("checkbox1");
        const check1 = document.getElementById("check1");
        if(a===false){
            checkbox1.classList.add("fill")
            check1.classList.add("check1fill")
        }
        else{
            checkbox1.classList.remove("fill")
            check1.classList.remove("check1fill")
        }

        setnewTodo({...newTodo, isCompleted: !a})
        
    }
    function addItem(e){
        const checkbox1 = document.getElementById("checkbox1");
        const check1 = document.getElementById("check1");
        
        
        if(e.code=='Enter'){
            let item = {...newTodo}
            item["id"] = id1;
            id1++;
            setTodoListArray([...todoListArray, item])
            setnewTodo({isCompleted: false, text: ""})
            checkbox1.classList.remove("fill")
            check1.classList.remove("check1fill")
        }
       
    }
    function filterHandle(a){
     const filter1 = document.getElementById("t-c-f-f1")
     const filter2 = document.getElementById("t-c-f-f2")
     const filter3 = document.getElementById("t-c-f-f3")
        setFilterMode(prevState=>{
            prevState = a;
            return prevState
        })
        if(a===0){
            filter1.classList.add("selectedFilter");
            filter2.classList.remove("selectedFilter");
            filter3.classList.remove("selectedFilter");
        }
        else if (a===1){
            filter1.classList.remove("selectedFilter");
            filter2.classList.add("selectedFilter");
            filter3.classList.remove("selectedFilter");
        }
        else if (a===2){
            filter1.classList.remove("selectedFilter");
            filter2.classList.remove("selectedFilter");
            filter3.classList.add("selectedFilter");
        }
    }
    function handleModify(arr,b){

            setTodoListArray(prevState=>{
                prevState = []
                for(let i=0;i<arr.length;i++)
                {
                    arr[i].id= i;
                    prevState.push(arr[i])
                }
                prevState= arr;
                return prevState
            })
        

        setModified(prevState=>{
            prevState = prevState+1;
            return prevState
        })
    }
    function clearCompleted(){
        
        let arr= todoListArray.filter(e=>e.isCompleted == false)
 
        handleModify(arr)
    }
    return(
        <div className="todo">
            <div className="t-header">
                <span className="t-h-title">
                    TODO
                </span>
                <span className="t-h-themeswitcher" onClick={themer}>
                   {
                    theme? <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>:<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
                   }
                </span>
            </div>
            <div className="t-newItem">
                <span className="t-nI-create">
                                <span id="checkbox1" className="checkbox1" onClick={e=>handleCheck(e)}>
                                <svg className ="check1" id="check1" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                                <input 
                                type="checkbox" 
                                className="checker1"
                                value={newTodo.isCompleted} 
                                onChange={e=>handleCheck(e)}/>
                                </span>
                                </span>
                                <span className="t-nI-c-content">
                                <input 
                                type="text" 
                                className="text" 
                                placeholder={"Create a new todo..."} 
                                value={newTodo.text}
                                onKeyDown={e=>addItem(e)}
                                onChange={e=>handleNewText(e)}/>
                </span>
                   
            </div>
            <div className="t-component">
                <List arr={todoListArray} filter={filtermode} modifyArr={handleModify}/>
                <div className="t-c-footer">
                    <span className="t-c-f-length">
                        {todoListArray.length} items left
                    </span>
                    <span className="t-c-f-filters">
                        <span className="t-c-f-f1 selectedFilter" id="t-c-f-f1" onClick={e=>filterHandle(0)}>
                            All
                        </span>
                        <span className="t-c-f-f2" id="t-c-f-f2" onClick={e=>filterHandle(1)}>
                            Active
                        </span>
                        <span className="t-c-f-f3" id="t-c-f-f3" onClick={e=>filterHandle(2)}>
                            Completed
                        </span>
                    </span>
                    <span className="t-c-f-actions">
                        <span className="t-c-f-a1" onClick={clearCompleted}>
                            Clear completed
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}