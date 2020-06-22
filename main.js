let dateTimePerson = /[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}, [0-9]{2}:[0-9]{2} - [a-zA-Z\s]{1,}: /g
let lineBreaks = /(\r\n|\n|\r)/gm
let questionMarks = /[.,'’?!]/g


let newChat = chatMolly.toLowerCase().replace(dateTimePerson, ``)
.replace(lineBreaks,` `)
.replace(/\(media omitted\)/g, ``)
.replace(questionMarks, ``)


let entries = new Map(
  newChat.split(` `)
  .filter(c => !c.match(/[$&+,:;=?@#|'<>.-^*()%!"]/g))
  .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()))

const obj = Object.fromEntries(entries)

let sortable = []
for (var word in obj) {
    sortable.push([word, obj[word]])
}

let output = sortable.sort(function(a, b) {
    return b[1] - a[1]
})

console.log(output)