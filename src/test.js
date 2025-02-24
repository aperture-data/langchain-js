import { ApertureClient, LogLevel } from "@coffeeblackai/aperturedb-node";
import 'dotenv/config';

const options = {
    host: process.env.APERTURE_HOST,
    username: process.env.APERTURE_USER,
    password: process.env.APERTURE_PASSWORD,
    descriptorSet: "lcjs",
    dimensions: 3072
  };

let client = ApertureClient.getInstance(options);
// client.setLogLevel(LogLevel.DEBUG);

// client
let descriptors = await client.descriptors.findDescriptors(undefined, { set: "lcjs", blobs: true});
console.log(descriptors.length);
console.log(descriptors[0]);



// const blob = await fs.readFile('test1.txt');
// const desc = new Float32Array(blob.buffer);
// console.log(desc);

// const info = await descriptor.addDescriptor({
//     set: "lcjs",
//     blob: desc,
//     label: "test",
//     properties: {
//         "test": "test1"
//     }
// });

// console.log(info);
client.destroy();