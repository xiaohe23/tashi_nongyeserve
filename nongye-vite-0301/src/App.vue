<template>
  <div>
    <h1>显示学生信息</h1>
    <!-- 学号:<input type="text" v-model="newStu.id" /><br /> -->
    姓名:<input type="text" v-model="newStu.name" /><br />
    年龄:<input type="text" v-model="newStu.age" /><br />
    {{ newStu.id }} --{{ newStu.name }} -{{ newStu.age }}
    <button @click="addFun">添加</button>
    <ul>
      <li v-for="(item, index) in stt" :key="item.id">
        学号：{{ item.id }} ,年龄 ：{{ item.age }},名字：{{ item.name }}
        <span @click="delFun(index)">×</span>
      </li>
    </ul>
  </div>
  
</template>

<script>
// 需求:1.完成删除  2.id号自增长
// 列表添加添加
import { defineComponent, reactive } from "vue";
import useadd from './useadd'
import  usedel  from "./usedel";
export default defineComponent({
  name: "App",
  setup() {
    let newStu = reactive({
      age: "",
      name: "",
    });
    
    const stt = reactive([
      { id: 1, age: 18, name: "大山" },
      { id: 2, age: 13, name: "大山1" },
      { id: 3, age: 19, name: "大山2" },
      { id: 4, age: 20, name: "大山3" },
    ]);
    let num = 5;
    const {addFun}=useadd(num,newStu,stt);
    const {delFun}=usedel(stt)
    // 函数
    // const addFun = () => {
    //   console.log(666);
    //   // 对象添加到数组中需要深拷贝
    //   stt.push({ id: num++, ...newStu });
    // };
    //
    // const delFun = (index) => {
    //   console.log(index);
    //   stt.splice(index, 1);
    // };

    // 需要返回，数据和函数都必须要返回,template中才能使用
    return { stt, newStu, addFun, delFun };
  },
});
//
// reactive定义复杂数据类型时，return 中可以使用 扩展运算符，但是 不能修改数据
// 如果需要修改数据，在 return中需要使用  toRefs,在修改数据时，有双向绑定效果
// 显示 iphone 购物车 ,id、商品名、价格
</script>
