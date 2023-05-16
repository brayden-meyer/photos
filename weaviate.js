import weaviate from 'weaviate-ts-client'
import fs from 'fs'

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080'
});

const schema = await client.schema.getter().do();

console.log(schema);

const schemaConfig = {
    'class': 'Photo',
    'vectorizer': 'img2vec-neural',
    'vectorIndexType': 'hnsw',
    'moduleConfig': {
        'img2vec-neural': {
            'imageFields': [
                'image'
            ]
        }
    },
    'properties': [
        {
            'name': 'image',
            'dataType': ['blob']
        },
        {
            'name': 'text',
            'dataType': ['string']
        }
    ]
}

await client.schema.classCreator().withClass(schemaConfig).do();

/*const files = fs.readdirSync('./library');
const promises = files.map(async (file) => {
    const imageBase64 = fs.readFileSync(`./library/${file}`).toString('base64');
    fs.writeFileSync('./copytest.jpg', imageBase64, 'base64');


    await client.data.creator()
        .withClassName('Photo')
        .withProperties({
            image: imageBase64,
            text: "file"
        })
        .do();
})

await Promise.all(promises);*/


const testImage = Buffer.from(fs.readFileSync('./test.jpg')).toString('base64');

const response = await client.graphql.get()
                    .withClassName('Photo')
                    .withFields(['image'])
                    .withNearImage({image: testImage})
                    .withLimit(1)
                    .do();

console.log(response.data);
const resultImage = response.data.Get.Photo[0].image;
fs.writeFileSync('./result.jpg', resultImage, 'base64');
