const startNodeDataBase = require('./index.js')

const db = startNodeDataBase()

const dbLivros = db.tryLoad('abreu').orStartWith([])

// dbLivros.value.map(v => ({ ...v, minListening: 5 }))
dbLivros.setValue(v => [...v, { autor: 'caiosinho', minListening: 5 }])

dbLivros.setValue(v => v.map(v => ({ ...v, minListening: 8 })))
// dbLivros.setValue(v => v.map(v => ({ ...v, minListening: 8 })))
dbLivros.save()
console.log(dbLivros.value())
