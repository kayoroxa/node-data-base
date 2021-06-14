const fs = require('fs')

function startNodeDataBase(options) {
  const rootPath = options?.rootPath || 'dataBase'
  function set(key, prop) {
    const isPropFunc = typeof prop === 'function'
    const content = isPropFunc ? false : prop
    const callback = isPropFunc ? prop : false

    const contentFilePath = `${rootPath}/${key}.json`

    let contentString
    if (isPropFunc) {
      const prev = load(key)
      const retorno = callback(prev)
      if (retorno) contentString = JSON.stringify(retorno)
      else contentString = JSON.stringify(prev)
    } else {
      contentString = JSON.stringify(content)
    }
    try {
      fs.writeFileSync(contentFilePath, contentString)
    } catch {
      fs.mkdirSync(rootPath)
      fs.writeFileSync(contentFilePath, contentString)
    }
  }
  function load(key) {
    const contentFilePath = `${rootPath}/${key}.json`
    try {
      const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
      const contentJson = JSON.parse(fileBuffer)
      return contentJson
    } catch (error) {
      return null
    }
  }
  return {
    set,
    save: set,
    load,
  }
}

module.exports = startNodeDataBase
