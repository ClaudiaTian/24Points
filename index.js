let a = {name:1}
let b = JSON.parse(JSON.stringify(a))
b.name = 2

console.log(a.name)

