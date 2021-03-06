//
// Whatsapp Chat
//

// mainChat is variable used throughout, set it equal to any of the string variables in /chats
let mainChat = chatNiall

// console.log(chatJoe)

// if (chatJoe !== undefined) {
//   let mainChat = chatJoe
// }

// Grapheme Splitter
//https://www.npmjs.com/package/grapheme-splitter
const splitter = new GraphemeSplitter();

//
//
// Regex
//
//

let emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g

// Matches name format, e.g. "Niall Barber" or "Clare"
const personRegExp = `[a-zA-Z\s]{1,}`
const person = new RegExp(personRegExp, `g`)

const dateRegExp = `[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}`
const date = new RegExp(dateRegExp, `g`)

const timeRegExp = `[0-9]{2}:[0-9]{2}`
const time = new RegExp(timeRegExp, `g`)

// Matches Date, Time format
// let dateTimeRegExp = `${dateRegExp}, ${timeRegExp} - `
let dateTimeRegExp = new RegExp(`${dateRegExp}, ${timeRegExp} - `, `g`)

// Matches Whatsapp Date, Time, Person format
let dateTimePerson = new RegExp(`${dateTimeRegExp} ${personRegExp}: `, `g`)

// Matches all types of line break
let lineBreaksRegExp = `(\r\n|\n|\r)`
let lineBreaks = new RegExp(lineBreaksRegExp, `gm`)

// Matches some special characters
// let specialChars = /[.,'’?!]/g
let specialChars = /[ ’',()?!.,/:;&+=“”@*#%āäöšū>|£""-]/g

// Descending sort
// let sort = () => sortable.sort((a, b) =>  b[1] - a[1])

//
//
// Swear words
//
//

const swearWordsArray = [
  `arse`,
  `ass`,
  `hell`,
  `bloody`,
  `bladdy`,
  `bugger`,
  `crap`,
  `crappy`,
  `damn`,
  `goddam`,
  `goddamn`,
  `god damn`,
  `minger`,
  `sod off`,
  `arsehole`,
  `bint`,
  `bitch`,
  `bollocks`,
  `bullshit`,
  `feck`,
  `munter`,
  `piss`,
  `pissed`,
  `shit`,
  `shitting`,
  `tits`,
  `bastard`,
  `beef curtains`,
  `bellend`,
  `clunge`,
  `cock`,
  `dick`,
  `dickhead`,
  `fanny`,
  `gash`,
  `knob`,
  `minge`,
  `prick`,
  `prik`,
  `punani`,
  `pussy`,
  `snatch`,
  `twat`,
  `cunt`,
  `cunts`,
  `fuck`,
  `fuckup`,
  `fucksake`,
  `fucking`,
  `fucked`,
  `fuk`,
  `fukin`,
  `fukd`,
  `fuked`,
  `motherfucker`,
  `heck`,
  `hek`,
  `heckin`,
  `hekin`
]


const removeSpecialChars = input => input.replace(/[ ’',()?!.,/:;&+=“”@*#%āäöšū>|£""-]/g, ` `)

const getSwearWords = chat => {
  return removeSpecialChars(chat).replace(/(\r\n|\n|\r)/g, ` `)
    .split(` `)
    .filter( c=> swearWordsArray.includes(c) )
    .reduce( (a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {})
}

console.log(getSwearWords(mainChat))

const displayPersonEntries = input => {
  let output = input.replace(dateTimeRegExp, ``).split(lineBreaks)
    .filter(c => !c.match(lineBreaks))
    .map(c => {
      let matchPerson = `${c.match(person)}`
      let matchMessage = c.split(person)[1]
      let outputMatchMessage = matchMessage!==undefined?matchMessage:``
      outputMatchMessage = outputMatchMessage.replace(specialChars, ``);
      return [
        matchPerson,
        outputMatchMessage
          .split(/[\w]/g)
          .filter(c=>c!==``)
          .join('')
      ]
    })
    return output
  }
  let pushArr = []

  displayPersonEntries(mainChat).forEach(e => {
      e[1]===``?e:pushArr.push(e)
    }
  )

let theArr = pushArr.map(c=>{
    let name = c[0].slice(0, c[0].length - 2)
    let emoji = c[1]
    let obj = {
      name: name,
      emoji: emoji
    }
    return obj
  })

  let result = [];

theArr.forEach(a => {
    if (!this[a.name]) {
        this[a.name] = { name: a.name, emoji: '' };
        result.push(this[a.name]);
    }
    this[a.name].emoji += a.emoji;
}, Object.create(null))

result.map( c => {
  let str = c.emoji;
  let obj = {};
  for ( let s of str )if(!obj[s])obj[s] = 1;else obj[s] = obj[s]  + 1;
})
// console.table(result)

// Lowercase, remove date/time, "media omitted", some special chars
const displayLongString = (input) => {
  return input.toLowerCase()
    .replace(dateTimePerson, ``)
    .replace(lineBreaks,` `)
    .replace(/\(media omitted\)/g, ``)
    // .replace(specialChars, ``)
}

let toLongString = chatMolly.toLowerCase().replace(dateTimePerson, ``)
.replace(lineBreaks,` `)
.replace(specialChars, ``)

let entries = new Map(
  toLongString.split(` `)
  .filter(c => !c.match(/[$&+,:;=?@#|'<>.-^*()%!"]/g))
  .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()))

const obj = Object.fromEntries(entries)

let sortable = []
for (let word in obj) {
    sortable.push([word, obj[word]])
}

let emojiText = displayLongString(mainChat)

let graphemed = splitter.splitGraphemes(emojiText.match(emojiRegex).join(""))

let modified = graphemed.filter(c=>c!=="’")
  .filter(c=>c!=="“")
  .filter(c=>c!=="”")
  .filter(c=>c!=="‘")

let counts = {}
for (var i = 0; i < modified.length; i++) {
  let num = modified[i]
  counts[num] = counts[num] ? counts[num] + 1 : 1;
}

// console.log(Object.entries(counts).sort((a, b) =>  b[1] - a[1]))

let emojiEntries = emojiText.match(emojiRegex).reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())

const emojiObj = Object.fromEntries(emojiEntries)

const generateLeaderboard = () => {
  const leaderBoardDiv = document.getElementById("leaderboard")
  let rankings = Object.entries(counts).sort((a, b) =>  b[1] - a[1])
  let output = `
  <div class="entry">
    <h3>Top 10 Emojis</h3>
  </div>
  <div class="entry">
    <span class="rank-number">No.</span>
    <span class="rank-emoji">Emoji</span>
    <span class="rank-tally">Tally</span>
  </div>
  `
  for (i=0; i <= 9; i++) {
    let htmlString = `
      <div class="entry">
        <span class="rank-number">${i+1}</span>
        <span class="rank-emoji">${rankings[i][0]}</span>
        <span class="rank-tally">${rankings[i][1]}</span>
      </div>
    `
    output = output.concat(htmlString)
  }
  const html = `${output}`
  leaderBoardDiv.innerHTML = html
}

const displayData = (input) => {
  document.getElementById("output").innerHTML = displayLongString(input)
}

// displayData(chatSlurpy)

displayLongString(mainChat)
generateLeaderboard()