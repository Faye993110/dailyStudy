
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

TinyReact.render(virtualDOM, root);

setTimeout(()=>{
  TinyReact.render(modifyDOM, root)
},2000)


// function Demo(){
//   return <div>Hello</div>
// }

// function Heart(props) {
//   return (<div>
//     {props.title}
//     &hearts;
//     <Demo></Demo>
//   </div>)
// }

//TinyReact.render(<Heart title="hello react"></Heart>, root)

//子类继承父类，父类要有props
class Alert extends TinyReact.Component {
  constructor(props){
    //props 传递给父类
    super(props)
  }
  render (){
    return <div>
      {this.props.name}
      {this.props.age}
      </div>
  }
}

//TinyReact.render(<Alert name="张三" age={20}></Alert>, root)