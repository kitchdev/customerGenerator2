const Papa = require('papaparse')
const fs = require('fs')
const path = require('path')

const customerGenerator = require('./customerGenerator')

const csvParserFake = async () => {
  const csvFilePath = path.join(__dirname + '/../sample_data/addresses_for_benchmrking.csv')
  const newCsvFilePath = path.join(__dirname + '/../newAddresses.csv')
  let csvFileStream = fs.createReadStream(csvFilePath)
  csvFileStream.setEncoding('UTF8')

  let results = []
  Papa.parse(csvFileStream, {
    header: true,
    delimiter: ',',
    skipEmptyLines: true,
    step: (result) => {
      results.push(result.data)
    },
    complete: async () => {
      const fakedAddresses = await customerGenerator(results)
      const newCsv = await Papa.unparse(fakedAddresses)
      let writeStream = fs.createWriteStream(newCsvFilePath)
      writeStream.on('open', () => {
        console.log('write stream is open')
        writeStream.write(newCsv)
      })
      writeStream.on('finish', () => {
        console.log('write file should be done')
        writeStream.end()
      })
    }
  })
}

module.exports = csvParserFake