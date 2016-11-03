# two-promise

Return a promise for a callback-based function

Read a file:

```js
var read = toPromise(fs.readFile)
read(`${__dirname}/../package.json`)
.then(JSON.parse)
.then(pkg => t.equal(pkg.name, 'two-promise'))
```

Count lines from files in directory:

```js
const dir = `${__dirname}/..`
const lsd = toPromise(fs.readdir)
const cat = toPromise(fs.readFile)
const pwd = f => `${dir}/${f}`

lsd(dir)
.then(files => files.map(pwd))
.then(paths => Promise.all(paths.map(f => cat(f).catch(resolve))))
.then(buffers => buffers.filter(b => b.length).join('').trim())
.then(concatenated => concatenated.split('\n').length)
.then(console.log)
```
