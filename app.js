

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



walkThroughObject(json)

console.log(formattedCsvData)
