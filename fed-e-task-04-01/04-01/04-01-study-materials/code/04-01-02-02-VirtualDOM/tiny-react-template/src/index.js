
import TinyReact from './TinyReact'

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h6>这个将会被删除</h6>
    2, 3
    <input type="text" value="13" />
  </div>
)

const modifyDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test123">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段被修改的内容</span>
    <button onClick={() => alert("你好!!!!!")}>点击我</button>
    <input type="text" value="13" />
  </div>
)

const root = document.getElementById('root');

// TinyReact.render(virtualDOM, root);

// setTimeout(()=>{
//   TinyReact.render(modifyDOM, root)
// },2000)


function Demo(){
  return <div>Hello</div>
}

function Heart(props) {
  return (<div>
    {props.title}
    &hearts;
    <Demo></Demo>
  </div>)
}

//TinyReact.render(<Heart title="hello react"></Heart>, root)

//子类继承父类，父类要有props
class Alert extends TinyReact.Component {
  constructor(props){
    //props 传递给父类
    super(props);
    this.state = {
      title:'default'
    }
    this.handleCick = this.handleCick.bind(this);
  }
  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps')
  }
  componentWillUpdate(){
    console.log('componentWillUpdate')
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
  }
  handleCick(){
    this.setState({title:'changed title'})
  }
  render (){
    return <div>
      {this.props.name}
      {this.props.age}
      {this.state.title}
      <button onClick={this.handleCick}>改变title</button>
      </div>
  }
}

// TinyReact.render(<Alert name="张三" age={20}></Alert>, root)

// setTimeout(() => {
//   TinyReact.render(<Alert name="李四" age={50}></Alert>, root)
//   //TinyReact.render(<Heart title="hello react"></Heart>, root)
// },2000)


class DemoRef extends TinyReact.Component{
  constructor(props){
    super(props);
    this.handleCick = this.handleCick.bind(this);
  }
  handleCick(){
    console.log(this.input.value)
    console.log(this.alert)
  }
  
  componentDidMount(){
    console.log('componentDidMount')
  }
  componentWillUnmount(){
    console.log('componentWillUnmount')
  }

  render(){
    return(
      <div>
        <input type="text" ref={input => (this.input = input)} ></input>
        <button onClick={this.handleCick}>click button</button>
        <Alert ref={alert => this.alert = alert} name="李四" age={50}></Alert>        
      </div>
    )
  }
}

//TinyReact.render(<DemoRef></DemoRef>, root)

class KeyDemo extends TinyReact.Component {
    constructor(props) {
      super(props)
      this.state = {
        persons: [
          {
            id: 1,
            name: "张三"
          },
          {
            id: 2,
            name: "李四"
          },
          {
            id: 3,
            name: "王五"
          },
          {
            id: 4,
            name: "赵六"
          }
        ]
      }
      this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
      const newState = JSON.parse(JSON.stringify(this.state))
     // newState.persons.push(newState.persons.shift())
      // newState.persons.splice(1, 0, { id: 100, name: "李逵" })
     newState.persons.pop()
      this.setState(newState)
    }
    componentWillUnmount(){
      console.log('componentWillUnmount')
    }
    render() {
      return (
        <div>
          <ul>
            {this.state.persons.map(person => (
              <li key={person.id} >
                {person.name}
                <DemoRef />
              </li>
            ))}
          </ul>
          <button onClick={this.handleClick}>按钮</button>
        </div>
      )
    }
  }
  
  TinyReact.render(<KeyDemo />, root)