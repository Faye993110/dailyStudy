一、简答题
1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。
```
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```
答： name不是响应式数据。响应式对象和响应式数组是指在vue初始化时期，利用Object.defineProperty()方法对其进行监听，这样在修改数据时会及时体现在页面上。
可以设置默认值 dog：{name:''} 或者 用 $set方法去添加数据


2、请简述 Diff 算法的执行过程
* Diff 算法是对比新旧节点的子节点，同级别节点依次比较，算法时间复杂度为O(n)
* 在进行同级别节点比较的时候，首先会对新旧节点数组的开始和结束节点设置标记索引，遍历过程中移动索引
* 在对开始和结束节点比较的时候，总共有四种情况：
  * oldStartVnode / newStartVnode(旧开始节点 / 新开始节点)
  * oldEndVnode / newEndVnode(旧结束节点 / 新结束节点)
  * oldStartVnode / newEndVnode(旧开始节点 / 新结束节点)
  * oldEndVnode / newStartVnode(旧结束节点 / 新开始节点) 循环遍历新旧节点
* 首先判断 oldStartVnode 和 newStartVnode 是否是 sameVnode(sel 和 key 是否相同)
  * patchVnode 比较 oldStartVnode 和 newStartVnode，更新节点
  * 标记索引往后移(++oldStartIdx、++newStartIdx)
* 否则判断 oldEndVnode 和 newEndVnode 是否是 sameVnode(sel 和 key 是否相同)
  * patchVnode 比较 oldEndVnode 和 newEndVnode，更新节点
  * 标记索引往前移(--oldEndIdx、--newEndIdx)
* 否则判断 oldStartVnode 和 newEndVnode 是否是 sameVnode(sel 和 key 是否相同)
  * patchVnode 比较 oldStartVnode 和 newEndVnode，更新节点
  * 把 oldStartVnode 移动到右边
  * 标记索引移动(++oldStartIdx、--newEndIdx)
* 否则判断 oldEndVnode 和 newStartVnode 是否是 sameVnode(sel 和 key 是否相同)
  * patchVnode 比价 oldEndVnode 和 newStartVnode，更新节点
  * 把 oldEndVnode 移动到左边
  * 标记索引移动(--oldEndIdx、++newStartIdx)
* 如果不是以上四种情况
  * 遍历新节点，使用 newStartVnode 的 key 在老节点数组中找相同节点
  * 如果没有找到，说明 newStartVnode 是新节点
    * 创建新节点对应的 DOM 元素，插入到 DOM 树中
  * 如果找到了
    * 判断新节点和找到的老节点的 sel 选择器是否相同
    * 如果不相同，说明节点被修改了
        *  重新创建对应的 DOM 元素，插入到 DOM 树中
    * 如果相同，把 elmToMove 对应的 DOM 元素，移动到左边
* 循环结束

  * 当老节点的所有子节点先遍历完(oldStartIdx > oldEndIdx)，循环结束
  * 新节点的所有子节点先遍历完(newStartIdx > newEndIdx)，循环结束
* 如果老节点的数组先遍历完(oldStartIdx > oldEndIdx)，说明新节点有剩余，把剩余节点批量插入到右边

* 如果新节点的数组先遍历完(newStartIdx > newEndIdx)，说明老节点有剩余，把剩余节点批量删除

二、编程题
1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
* Hash模式：
  * URL 中#后面的内容作为路径地址
  * 监听 hashchange事件
  * 根据当前路由地址找到对应组件重新渲染
* 思路
  * Hash 模式是基于锚点，通过锚点值作为路由地址；以及 onhashchange 事件，地址发生变化时触发onhashchange
  * Hash 模式路由与 history 模式路由类似
  * 不同点在于 router-link 组件内的 a 标签 href 地址前添加 '/#'；href: '/#' + this.to
  * a 标签不需要添加事件阻止默认行为和记录历史，因为锚点并不*会触发 a 标签的默认行为，而且会自动修改 url
  * hash值发生变化的时候会触发 onhashchange 事件，监听该事件，把保存路由的响应式数据修改为对应地址，渲染对应的组件； window.addEventListener('hashchange ', () => { this.data.current = window.location.hash.substr(1) })


2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
* 在complier.js里面修改即可
* v-html：
```
htmlUpdater(node, value, key) {
  node.innerHTML = value
  new Watcher(this.vm, key, (newValue) => {
    node.innerHTML = newValue
  })
}
```
* v-on:
  * 在vue.js中
  ```
  // 把methods注入vue实例
  _injectionMethods(methods) {
    Object.keys(methods).forEach(fnName => {
      this[fnName] = this.$methods[fnName]
    })
  }
  ```
  * 在complier.js 文件中：
  ```
  // 根据指令拼接函数(不需要if语句)，调用对于的指令处理函数
  update(node, key, attrName) {
    if (attrName.startsWith('on:')) {
      attrName = attrName.replace('on:', '')
    }

    let updateFn = this[attrName + 'Updater']
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }

  // v-on
  clickUpdater(node, value, key) {
    node.onclick = value
  }
  ```



3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果
```
import { h, init } from 'snabbdom'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'
import className from 'snabbdom/modules/class'


let patch = init([style,eventlisteners])
let originalData = [
  { rank: 1, title: 'The Shawshank Redemption', desc: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', elmHeight: 0 },
  { rank: 2, title: 'The Godfather', desc: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', elmHeight: 0 },
  { rank: 3, title: 'The Godfather: Part II', desc: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.', elmHeight: 0 },
  { rank: 4, title: 'The Dark Knight', desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.', elmHeight: 0 },
  { rank: 5, title: 'Pulp Fiction', desc: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', elmHeight: 0 },
  { rank: 6, title: 'Schindler\'s List', desc: 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', elmHeight: 0 },
  { rank: 7, title: '12 Angry Men', desc: 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.', elmHeight: 0 },
  { rank: 8, title: 'The Good, the Bad and the Ugly', desc: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.', elmHeight: 0 },
  { rank: 9, title: 'The Lord of the Rings: The Return of the King', desc: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', elmHeight: 0 },
  { rank: 10, title: 'Fight Club', desc: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...', elmHeight: 0 },
]
let data = [...originalData]

//获取最后一个电影id
//let lastId = data[data.length - 1 ] ? data[data.length-1].rank + 1 : 1;


const container = document.querySelector('#app')

var sortBy = 'rank';
let vnode = view(data);

// 初次渲染
let oldVnode = patch(container, vnode)
// 渲染
function render() {
    oldVnode = patch(oldVnode, view(data));
}
// 生成新的VDOM
function view(data) {
    return h('div#container',
        [
            h('h1', 'Top 10 movies'),
            h('div',
                [
                    h('a.btn.add',
                        { on: { click: add } }, 'Add'),
                    'Sort by: ',
                    h('span.btn-group',
                        [
                            h('a.btn.rank',
                                {
                                    'class': { active: sortBy === 'rank' },
                                    on: { click: [changeSort, 'rank'] }
                                }, 'Rank'),
                            h('a.btn.title',
                                {
                                    'class': { active: sortBy === 'title' },
                                    on: { click: [changeSort, 'title'] }
                                }, 'Title'),
                            h('a.btn.desc',
                                {
                                    'class': { active: sortBy === 'desc' },
                                    on: { click: [changeSort, 'desc'] }
                                }, 'Description')
                        ])
                ]),
            h('div.list', data.map(movieView))
        ]);
}

// 添加一条数据 放在最上面
function add() {
    const n = originalData[Math.floor(Math.random() * 10)];
    data = [{ rank: data.length+1, title: n.title, desc: n.desc, elmHeight: 0 }].concat(data);
    render();
}
// 排序
function changeSort(prop) {
    sortBy = prop;
    data.sort(function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        }
        if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    });
    render();
}

// 单条数据
function movieView(movie) {
    return h('div.row', {
        key: movie.rank,
        style: {
            display: 'none', 
            delayed: { transform: 'translateY(' + movie.offset + 'px)', display: 'block' },
            remove: { display: 'none', transform: 'translateY(' + movie.offset + 'px) translateX(200px)' }
        },
        //钩子函数，当元素插入的时候，把高度保存起来
        hook: {
            insert: function insert(vnode) {
                movie.elmHeight = vnode.elm.offsetHeight;
            }
        }
    }, [
        h('div', { style: { fontWeight: 'bold' } }, movie.rank),
        h('div', movie.title), 
        h('div', movie.desc),
        h('div.btn.rm-btn', {on: { click: [remove, movie]}}, 'x')]);
}
// 删除数据
function remove(movie) {
    data = data.filter(function (m) {
        return m !== movie;
    });
    render()
}
```
