

export default function useadd(num,newStu,stt){

    const addFun = () => {
        console.log(666);
        // 对象添加到数组中需要深拷贝
        stt.push({ id: num++, ...newStu });
      };
      return {addFun}
}