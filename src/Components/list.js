export default function List({ arr, filter,modifyArr }) {
    let mapper = []

    if (filter === 2) {
        mapper = arr.filter(e => e.isCompleted == true)
    }
    else if (filter === 1) {
        mapper = arr.filter(e => e.isCompleted === false)
    }
    else {
        mapper = arr
    }
    function handleCheck(id){
        for(let i=0;i<arr.length;i++){
            if(arr[i].id == id){
                arr[i].isCompleted = !arr[i].isCompleted;
                
            }
          
        }

        modifyArr(arr)
    }
    function remove(id){
        arr.splice(id,1)
        modifyArr(arr)
    }
    function checker(a, b, c) {
        if (b === 1) {
            if (a === false) {
                return (<span className="checkbox2" onClick={e=>handleCheck(c.id)}><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" opacity={0}><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" /></svg>
                    <input type="checkbox" className="checker2" checked={a} /></span>)
            }
            else {
                return (<span className="checkbox2fill" onClick={e=>handleCheck(c.id)}><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" /></svg>
                    <input type="checkbox" className="checker2" checked={a} /></span>)
            }
        } else if (b === 2) {
            if (a === false) {
                return (
                    <span className="t-c-l-item">
                        {c}
                    </span>
                )
            }
            else {
                return (
                    <span className="t-c-l-item itemCompleted">
                        {c}
                    </span>
                )
            }

        }
        else if(b===3){
            if(a===true){
                return <></>
            }
            else{
                return (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" onClick={e=>remove(c.id)}><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>)
            }
        }

    }
    return (
        <div className="t-c-list">
            {
                mapper.map((e, i) => {
                    return (
                        <div className="t-c-l">
                            <span className="t-c-l-checkbox">
                                {checker(e.isCompleted, 1, e)}
                            </span>
                            {checker(e.isCompleted, 2, e.text)}
                            <span className="t-c-l-delete" >
                                {checker(e.isCompleted,3,e)}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}