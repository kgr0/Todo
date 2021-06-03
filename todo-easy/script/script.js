const Title = ({todoCount}) => {
    return (
        <div>
            <div>
                <h1>To do ({todoCount})</h1>
            </div>
        </div>
    );
}

const TodoForm = ({addTodo}) => {
    let input;
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            addTodo(input.value);
            input.value = '';
        }}>
            <input className="form-control col-md-12" ref={node => {
                input = node;
            }} />
            <br />
        </form>
    );
};

const Todo = ({todo, remove, change}) => {
    return (<div  className="list-group-item todo-list-item" >
     <a className="list-group-item list-item list-text" href="#">{todo.text}</a>
     <a className="list-group-item list-item" href="#" onClick={() => {remove(todo.id)}}>Done</a>
     <a className="list-group-item list-item" href="#" onClick = {(e)=>{change(todo,e)}}>Up</a>
     </div>);
}
const Done = ({done, remove2}) => {
    return (<div className="list-group-item done-list-item">
        <a className="list-group-item list-text">{done.text}</a>
        <a className="list-group-item list-item" href="#" onClick={() => {remove2(done.id)}}>X</a>
        </div>);
}
const Prior = ({prior, remove3,change3}) => {
    return (<div  className="list-group-item prior-list-item" >
    <a className="list-group-item list-item list-text" href="#">{prior.text}</a>
    <a className="list-group-item list-item" href="#" onClick={() => {remove3(prior)}}>Done</a>
    <a className="list-group-item list-item" href="#" onClick = {(e)=>{change3(prior)}}>Down</a>
    </div>);
}

const TodoList = ({todos, remove,change}) => {
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} remove={remove} change={change}/>)
    });

    return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
}
const DoneList = ({dones, remove2}) => {
    const doneNode = dones.map((done) => {
        return (<Done done={done} key={done.id} remove2={remove2}/>)
    });

    return (<div className="list-group" style={{marginTop:'30px'}}>{doneNode}</div>);
}
const PriorList = ({priors, remove3,change3}) => {
    const priorNode = priors.map((prior) => {
        return (<Prior prior={prior} key={prior.id} remove3={remove3} change3={change3}/>)
    });

    return (<div className="list-group" style={{marginTop:'30px'}}>{priorNode}</div>);
}

window.id = 0;
window.id2 = 0;
window.prior = 0;
class TodoApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            data2:[],
            data3:[]
        }
    }
    componentDidMount(){
        this.setState({data: this.state.data});
        this.setState({data2: this.state.data2});
        this.setState({data3: this.state.data3});
    }
    addTodo = (val) => {
        const todo = {text: val, id: window.id++};
        this.setState({data: this.state.data.concat([todo])});
    }
    addDone = (val) => {
        const done = {text: val, id: window.id2++};
        this.setState({data2: this.state.data2.concat([done])});

    }
    addPrior = (val) => {
        const prior = {text: val, id: window.prior++};
        this.setState({data3: this.state.data3.concat([prior])});
    }

    handleRemove(id){
        const remainder = this.state.data.filter((todo) => {
            if(todo.id !== id)
                return todo;
            this.addDone(todo.text);
        });
        this.setState({data: remainder});
    }
    handleRemove2(id){
        const remainder = this.state.data2.filter((done) => {
            if(done.id !== id) return done;
        });

        this.setState({data2: remainder});
    }
 handleChange3(prior){

        const remainder = this.state.data3.filter((p) => {
            if(p.id !== prior.id) return p;
        });

        this.setState({data3: remainder});

        this.addTodo(prior.text);
        
    }
    handleRemove3(prior){
        const remainder = this.state.data3.filter((p) => {
            if(p.id !== prior.id)
                return p;
            this.addDone(p.text);
        });
        this.setState({data3: remainder});
        
    }

    rem(id){
const remain = this.state.data.filter((todo) => {
    if(todo.id !== id)
        {
            return todo;
        }
});
this.setState({data: remain});
    }

    async handleChange(todo, e) {
      
            var d = {text: todo.text, id: this.state.data3.length};
            await this.rem(todo.id);
            this.addPrior(d.text);
      }

    render(){
        return (
            <div>
                <Title todoCount={this.state.data.length+this.state.data3.length}/>
                <TodoForm addTodo={this.addTodo}/>
                <PriorList 
                    priors={this.state.data3}
                    remove3={this.handleRemove3.bind(this)}
                    change3 = {this.handleChange3.bind(this)}
                />
                <TodoList
                    todos={this.state.data}
                    remove={this.handleRemove.bind(this)}
                    change = {this.handleChange.bind(this)}
                />
                <hr></hr>
                <p className="title">Done</p>
                <DoneList 
                    dones={this.state.data2}
                    remove2={this.handleRemove2.bind(this)}
                />
                
            </div>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));