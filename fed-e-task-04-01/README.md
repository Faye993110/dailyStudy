1. 请简述React 16 版本中初始化渲染的过程
要将 React 元素渲染到页面中，分为两个阶段，render 阶段和 commit 阶段。
render 阶段负责创建 Fiber 数据结构并为 Fiber 节点打标记，标记当前 Fiber 节点要进行的 DOM 操作。
commit 阶段负责根据 Fiber 节点标记 ( effectTag ) 进行相应的 DOM 操作。


2. 为什么React 16 版本中 render 放弃了使用递归
答：递归使得程序一直在跑，一直到render完成才能继续下一步操作。如果组件比较多，或者有复杂的计算逻辑，这之间的消耗的时间是比较多的。假设更新一个组件需要1ms，如果有200个组件要更新，那就需要200ms，这200ms之间是不能响应的。如果这时候用户在input框输入什么东西，表现出来的就是明显的卡顿。React这样的调度策略对动画的支持也不好。如果React更新一次状态，占用浏览器主线程的时间超过16.6ms，就会被人眼发觉前后两帧不连续，呈现出动画卡顿。所以放弃使用递归，引用了新架构fiber

3.请简述React 16 版本中 commit 阶段的三个子阶段分别做了什么事情
commit 阶段可以分为三个子阶段：
before mutation 阶段（执行 DOM 操作前），主要做的事情就是去调用类组件的 getSnapShotBeforeUpdate 生命周期函数。这个函数在更新阶段才执行，在初始阶段不执行。 调用的方法是：commitBeforeMutationEffects
mutation 阶段（执行 DOM 操作），根据effectTag 属性执行DOM操作。调用的方法是：commitMutationEffects
layout 阶段（执行 DOM 操作后），调用类组件生命周期函数以及函数组件钩子函数。调用的方法是：commitLayoutEffects， 在这个方法中又调用了commitLayoutEffectOnFiber去处理/类组件处理生命周期函数和函数组件处理钩子函数

4.请简述workInProgress Fiber 树存在的意义是什么
react 在初始化渲染过程中，会构建一个fiber对象，构建完成之后，会将当前fiber对象看成是current fiber 树，接下来，react会在这个fiber对象中添加一个属性，这个属性就是alternate，属性值是current fiber 树的拷贝，将拷贝出来的树，当成workInProgress fiber 树，并给这个workInProgress fiber 树也添加一个alternate 属性，这个属性指向current fiber 树。接下来构建子集fiber 对象就全部在workInProgress fiber树中完成。当所有fiber对象构建完成之后，使用workInProgress fiber 树替换 current fiber 树。 替换完成之后，workInProgress树就变成current fiber 树。fiber 节点当中是存储了对应的DOM节点对象的，也就是说DOM对象的构建是在内存中完成的，当所有的fiber 对象构建完成，所有的DOM对象也就构建完成了，这时就可以直接使用内存当中的DOM对象替换页面的DOM对象了。这就是react中使用的双缓存技术，目的是实现更快速的DOM更新。也就是workInProgress Fiber 树存在的意义。