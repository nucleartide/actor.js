
function* numbers(max) {
  let n = 1
  while (n <= max) yield n++
}

exports.take = function take(n) {
  const results = []
  for (const num of numbers(n)) results.push(num)
  return results
}

exports.all = async function all(funcs) {
  const results = []
  for (const f of funcs) results.push(await f())
  return results
}
