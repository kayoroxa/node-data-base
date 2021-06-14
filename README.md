# Simple data base local with JSON file

```shell
npm i node-data-base
```

or (case you have yarn):

```shell
yarn add node-data-base
```

```js
const db = require('node-data-base')
const optional = { rootPath: 'dataBase' } //folder root

const db = startNodeDataBase()
```

```js
db.save('cars', ['ferrari', 'mustang'])

db.load('cars') // ['ferrari', 'mustang']
```

```js
db.save('cars', ['ferrari', 'mustang']) // ['ferrari', 'mustang']

db.sabe('cars', prev => {
  prev[0] = 'fuscar'
})

db.load('cars') // ['fuscar', 'mustang']
```
