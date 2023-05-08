
    export default function usedel(stt) {
      const delFun = (index) => {
        stt.splice(index, 1);
      };
      return { delFun };
    }
