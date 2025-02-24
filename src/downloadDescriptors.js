import { ApertureClient, LogLevel } from "@coffeeblackai/aperturedb-node";
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';

const options = {
  host: process.env.APERTURE_HOST,
  username: process.env.APERTURE_USER,
  password: process.env.APERTURE_PASSWORD,
  descriptorSet: process.env.LANGCHAIN_DESCCRIPTOR_SET,
  dimensions: process.env.LANGCHAIN_DESCCRIPTOR_DIMENSIONS
};

let client = ApertureClient.getInstance(options);
client.setLogLevel(LogLevel[process.env.APERTURE_LOG_LEVEL]);

// client
let descriptors = await client.descriptors.findDescriptors(undefined, { set: options.descriptorSet, blobs: true });


// console.log(descriptors.length);
console.log(descriptors[0]);

fs.mkdir(options.descriptorSet);
await descriptors.forEach(async descriptor=>{
  let {_blob, ...rest} = descriptor;
  await fs.writeFile(path.join(options.descriptorSet, descriptor._uniqueid + ".blob"), descriptor._blob);

  await fs.writeFile(path.join(options.descriptorSet, descriptor._uniqueid + ".json"),
    JSON.stringify(rest, null, 2));
});


client.destroy();