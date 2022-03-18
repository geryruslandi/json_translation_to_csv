import fs from 'fs';

const files = fs.readdirSync('./json').filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));

for (const fileName of files) {
    const file = fs.readFileSync(`./json/${fileName}`)
    const json = JSON.parse(file);
    const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');

    processFile(json, fileNameWithoutExtension)
}

function processFile(jsonObject, fileName) {
    const formattedCsvData = {}

    function walkThroughObject(object, path = "") {

        if(object.constructor.name != 'Object') {
            throw new Error('Only able to process Object for first level item')
        }

        for(const key in object) {

            const objectType = object[key].constructor.name;

            if(objectType != 'Object' && objectType != 'String') {
                console.log(objectType)
                throw new Error('Only able to process String or Object type for second level item')
            }

            const finalizedPath = path == '' ? key : path + `.${key}`;

            if(objectType == 'String') {
                formattedCsvData[finalizedPath] = object[key];
            }

            if(objectType == 'Object') {
                walkThroughObject(object[key], finalizedPath)
            }
        }
    }

    walkThroughObject(jsonObject);

    storeObjectAsCsv(formattedCsvData, fileName);
}

function storeObjectAsCsv(object, fileName) {
    // insert your language here to be
    let csvData = 'translation_path,english'

    for (const key in object) {
        csvData = csvData + `\n${key},${object[key]}`
    }

    fs.writeFileSync(`./csv/${fileName}.csv`, csvData)
}
