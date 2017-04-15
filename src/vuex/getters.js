/**
 * 这个 getter 函数会返回 count 的值
 * 在 ES6 里你可以这样写
 * export const getCount = state => state.count
 */
const getCount = state => state.count

const citys = state => state.citys

const fatherDire = state => state.fatherDire

const curDire = state => state.curDire



export { getCount,citys,fatherDire,curDire}
