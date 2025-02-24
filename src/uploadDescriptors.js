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

let a = await client.descriptorSets.addDescriptorSet({
    name: `${options.descriptorSet}_upload`,
    dimensions: parseInt(options.dimensions)});

const files = await fs.readdir(options.descriptorSet);
for (const file of files) {
    if (file.endsWith(".json")) {
        let descriptor = JSON.parse(await fs.readFile(path.join(options.descriptorSet, file)));
        let {document, id, ...rest} = descriptor;
        let blob = await fs.readFile(path.join(options.descriptorSet, file.replace(".json", ".blob")));
        let info = await client.descriptors.addDescriptor({
            set: `${options.descriptorSet}_upload`,
            blob: new Float32Array(blob.buffer),
            label: descriptor._label,
            properties: {document, id}
        });
    }
}


client.destroy();