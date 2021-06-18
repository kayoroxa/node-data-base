const fs = require('fs')

function startNodeDataBase(options) {
  const rootPath = options?.rootPath || 'dataBase'
  let _value
  let _key = undefined
  const methods = () => {
    return { save, value: () => _value, setValue }
  }

  function tryLoad(key) {
    _key = key
    const contentFilePath = `${rootPath}/${key}.json`
    try {
      const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
      const contentJson = JSON.parse(fileBuffer)
      _value = contentJson
      return {
        orStartWith: () => methods(),
        ...methods(),
      }
    } catch (error) {
      _value = null
      return {
        orStartWith: newValue => {
          _value = newValue
          return methods()
        },
        ...methods(),
      }
    }
  }
  function save(newData) {
    const contentFilePath = `${rootPath}/${_key}.json`

    const valueString = newData
      ? JSON.stringify(newData, null, 2)
      : JSON.stringify(_value, null, 2)
    try {
      fs.writeFileSync(contentFilePath, valueString)
    } catch (error) {
      fs.mkdirSync(rootPath)
      fs.writeFileSync(contentFilePath, valueString)
    }
  }
  function setValue(prop) {
    const isPropFunc = typeof prop === 'function'
    const content = isPropFunc ? false : prop
    const callback = isPropFunc ? prop : false

    if (isPropFunc) {
      try {
        const retorno = callback(_value)
        if (retorno) {
          _value = retorno
          // console.log('value igual a ', _value)
        } else console.log('[ERROR] Precisa Retornar')
      } catch (error) {
        const funcError = error.message.match(/\.\w*/g).join()
        console.error(
          `[ERROR] O value: ${_value} é um (${typeof _value}) e não tem a função ${funcError}`
        )
        return
      }
    } else {
      _value = JSON.stringify(content)
    }
    return methods()
  }
  return {
    tryLoad,
  }
}

module.exports = startNodeDataBase
