import Loadable from 'react-loadable';
import React from 'react';

const LoadableComponent = Loadable({
    //这里的import是异步加载的语法
  loader: () => import('./'),
  loading(){
      return <div>正在加载。。。。。。</div>
  }
});

export default () => <LoadableComponent></LoadableComponent>

// export default class App extends React.Component {
//   render() {
//     return <LoadableComponent/>;
//   }
// }