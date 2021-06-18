# Simple data base local with JSON file

```shell
npm i node-data-base
```

or (case you have yarn):

```shell
yarn add node-data-base
```

```js
const startNodeDataBase = require('node-data-base')

const db = startNodeDataBase()
```

```js
const dbBooks = db.tryLoad('books').orStartWith([])

dbBooks.setValue(v => [...v, { autor: 'platão', sells: 10000 }])

dbBooks.setValue(v => v.map(v => ({ ...v, sells: 99999 })))

dbBooks.save()

console.log(dbBooks.value())
```

if you want to change the root path use this:

```js
const startNodeDataBase = require('node-data-base')

const db = startNodeDataBase({ rootPath: 'dataBase' })
```
