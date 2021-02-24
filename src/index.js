module.exports = function check(str, bracketsConfig) {
  if (str.length === 0) return false;
  
  let stack = [];
  let cls = false;
  let strA = str.split("");

  for (let i = 0; i < strA.length; i++)
  {
    for (let j = 0; j < bracketsConfig.length; j++)
    {
      if (strA[i] === bracketsConfig[j][0])
      {
        if (bracketsConfig[j][0] === bracketsConfig[j][1]) {
          let ind = strA.lastIndexOf(strA[i], i === 0 ? 0 : i - 1);
          if (ind !== -1 && ind < i && ind % 2 !== i % 2) {
            let c = strA.reduce((count, item, index) => {
              index < i && item === strA[i] ? count++ : count;
              return count;
            }, 0);
            if (c % 2 !== 0) {
              cls = true;
            }
            else {
              stack.push(j);
              cls = false;
              break; 
            }
          }
          else {
            stack.push(j);
            cls = false;
            break; 
          }
        }
        else {
          stack.push(j);
          cls = false;
          break;
        }
      }
      else
      {
        cls = true;
      }
    }
    if (cls) 
    {
      if (stack.length === 0) return false;
      let last = stack.pop();
      if (strA[i] !== bracketsConfig[last][1])
      {
        return false;
      }
    }
  }

  if (stack.length !== 0) return false;

  return true;
}
