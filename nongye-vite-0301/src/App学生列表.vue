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
    <input type="text" v-model="add"><button @click="addarr">添加列表</button>
    <input type="text" v-model="del"><button @click="clickdel">点击删除</button>
  </div>
</template>

<script>
// vue3是 按需加载的,减小vue的体积
import { defineComponent, ref ,reactive,toRefs,watch} from "vue";

export default defineComponent({
  name: "App",
  setup() {
    // ref 可以定义 简单的数据类型的数据
    const age = ref(29);
    const name = ref("小花");
    let del=ref("")
    let add=ref("")
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
    let clickdel=()=>{
      console.log(111);
      const index = iphonearr.iphonedata.findIndex((item) => item.name === del.value);
      // console.log(index);
      if (index !== -1) {
        iphonearr.iphonedata.splice(index, 1);
      }
      console.log('Deleted phone:', del.value);
     
    }
    // 需要返回
    const year=ref(0)
    setTimeout(()=>{
      year.value++
    },1000)
    watch(year,(newd,old)=>{
      console.log("new",newd,"old",old);
    })
    return { ...toRefs(iphonearr),age, name,addarr ,del,clickdel,add};
  },
  methods:{
    addarr(){

    }
  }
});
</script>
