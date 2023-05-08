<template>
  <div>
    <h1>ref</h1>
    <div>年龄：{{ age }}</div>
    <div>名字：{{ name }}</div>
    <div>
      <ul>
        <li v-for="item in iphonedata" :key="item.id">reactive：手机名：{{ item.name }}，价格：{{ item.amonta }}</li>
      </ul>
    </div>
    <button @click="addarr">添加列表</button>
  </div>
</template>

<script>
// vue3是 按需加载的,减小vue的体积
import { defineComponent, ref ,reactive,toRefs} from "vue";

export default defineComponent({
  name: "App",
  setup() {
    // ref 可以定义 简单的数据类型的数据
    const age = ref(29);
    const name = ref("小花");
    const iphonearr=reactive({
      iphonedata:[
        {id:1,amonta:2222,name:"i6"},
        {id:1,amonta:2222,name:"i7"},
        {id:1,amonta:2222,name:"i8"},
        {id:1,amonta:2222,name:"i9"}
      ]
    })
   let addarr=()=>{
      iphonearr.iphonedata.push( {id:1,amonta:2222,name:"i9"})
    }
    // 需要返回
    return { ...toRefs(iphonearr),age, name,addarr };
  },
  methods:{
    addarr(){

    }
  }
});
</script>
