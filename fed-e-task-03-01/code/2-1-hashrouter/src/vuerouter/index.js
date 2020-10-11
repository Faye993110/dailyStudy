let _Vue = null
export default class VueRouter {
    static install(Vue){
        //1 判断当前插件是否被安装
        if(VueRouter.install.installed){
            return;
        }
        VueRouter.install.installed = true
        //2 把Vue的构造函数记录在全局
        _Vue = Vue
        //3 把创建Vue的实例传入的router对象注入到Vue实例
        // 使用混入，注意this指向，在外面this指向VueRouter，使用混入this指向Vue
        // _Vue.prototype.$router = this.$options.router
        _Vue.mixin({
            beforeCreate(){
                if(this.$options.router){// vue实例执行；组件不执行，组件的$options不存在router属性
                    _Vue.prototype.$router = this.$options.router // 把入口文件中new Vue()是传入的router挂载到$router
                    
                }
               
            }
        })
    }
    constructor(options){
        this.options = options // 记录构造函数传入的选项
        this.routeMap = {} // 把路由规则解析存储到routeMap，键：路由地址，值：路由组件，将来router-view组件会根据当前路由地址到routeMap对象找到对应的组件渲染到浏览器
        // observable
        // data是一个响应式对象，存储当前的路由地址，路由变化时自动加载组件
        this.data = _Vue.observable({ // vue提供的创建响应式对象方法
          current: window.location.hash.substr(1) || '/' // 存储当前的路由地址，默认是‘/
        })
        this.init()

    }
    init(){
        this.createRouteMap()
        this.initComponent(_Vue)
        this.initEvent()
    }
    createRouteMap(){
        //遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        });
    }
    initComponent(Vue){ // 传入Vue构造函数是为了减少对外部的依赖
        Vue.component("router-link",{
            props:{
                to:String
            },
            render(h){
              // h 函数为我们创建虚拟DOM
                return h("a",{
                  attrs: {
                    href: '/#' + this.to
                  }
                },[this.$slots.default]) // 通过this.$slots.default获取默认插槽的内容
            },
            // methods:{
            //     clickhander(e){
            //         history.pushState({},"",this.to)
            //         this.$router.data.current=this.to
            //         e.preventDefault()
            //     }
            // }
            // template:"<a :href='to'><slot></slot><>"
        })
        const self = this
        Vue.component("router-view",{
            render(h){
                // self.data.current
                const cm=self.routeMap[self.data.current]
                return h(cm)
            }
        })
        
    }
    initEvent(){
       // 浏览器前进 后退
      window.addEventListener('hashchange', () => {
        this.data.current = window.location.hash.substr(1)
      })
    }
}