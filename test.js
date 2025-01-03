import { ApertureClient } from "@coffeeblackai/aperturedb-node";
import { DescriptorClient } from "@coffeeblackai/aperturedb-node/descriptor";
// import { CreateDescriptorInput } from "@coffeeblackai/aperturedb-node/types";
// const fs = require('node:fs/promises');
import { promises as fs } from 'fs';

const client = new ApertureClient({host: "localhost", username: "admin", password: "admin"});
const descriptor = new DescriptorClient(client);

// const query = [{
//     "FindEntity": {
//       "with_class": "test",
//       "results": {
//         "all_properties": true
//       }
//     }
//   }];

//   const [response, blobs] = await client.rawQuery(query);
//   console.log(response);




const blob = await fs.readFile('test1.txt');
const desc = new Float32Array(blob.buffer);
console.log(desc);

const info = await descriptor.addDescriptor({
    set: "lcjs",
    blob: desc,
    label: "test",
    properties: {
        "test": "test1"
    }
});

console.log(info);
client.destroy();