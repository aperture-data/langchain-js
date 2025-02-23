// import pkg from "./dist/aperturedb.cjs";
// const  { ApertureDBStore, ApertureDBStoreOptions }  = pkg;

import { ApertureDBStore, ApertureDBStoreOptions } from "@aperture.io/aperturedb";
import { OpenAIEmbeddings } from "@langchain/openai";


const options = {
    host: "wft-mc4gg0eu.farm0000.cloud.aperturedata.dev",
    username: "admin",
    password: "workflowtest@135",
    descriptorSet: "lcjs",
    dimensions: 3072
  };


// Create a new instance of the OpenAIEmbeddings
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large"
});

const vectorStore = new ApertureDBStore(embeddings, options);


const results1 = await vectorStore.similaritySearch(
    "When was Nike incorporated?"
  );

console.log(results1[0]);

vectorStore.close();