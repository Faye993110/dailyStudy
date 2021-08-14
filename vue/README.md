# hexiao-vue

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 接口文档

```
http://47.101.42.212:8001/swagger-ui.html
```

### 全局属性/事件

```js
<script>
import { getCurrentInstance } from 'vue'

export default {
  name: 'login',
  setup () {
    const { proxy } = getCurrentInstance()

    // 全局cookie
    proxy.$Cookies.set('isAuthenticated', false)

    let data = {
      username: 'admin',
      password: proxy.$encrypt('123456'),  // 字段加密
    }
    // 接口调用(注意get和post传参的属性不同params和data)
    proxy.$Http.post("/auth/login", { data }).then((result) => {
      console.log(result)
    })


    return {}
  }
}
</script>
```
