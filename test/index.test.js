var fs = require('fs')
var test = require('tape')
var toPromise = require('../lib/index')

const dir = `${__dirname}/..`
const lsd = toPromise(fs.readdir)
const cat = toPromise(fs.readFile)
const pwd = f => `${dir}/${f}`

test('fs.readFile', function (t) {
  cat(`${__dirname}/../package.json`)
  .then(JSON.parse)
  .then(pkg => t.equal(pkg.name, 'to-promise', 'reads package.json'))
  .catch(t.fail)
  .then(t.end)
})

test('count number of lines in directory', function (t) {
  var resolve = () => Promise.resolve('')

  lsd(dir)
  .then(files => files.map(pwd))
  .then(paths => Promise.all(paths.map(f => cat(f).catch(resolve))))
  .then(buffers => buffers.filter(b => b.length).join('').trim())
  .then(concatenated => concatenated.split('\n').length)
  .then(lines => t.equal(lines, 69, `finds ${lines} lines`))
  .catch(t.fail)
  .then(t.end)
})
