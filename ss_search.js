import pkg from "./dist/aperturedb.cjs";
const  { ApertureDBStore, ApertureDBStoreOptions }  = pkg;

import { OpenAIEmbeddings } from "@langchain/openai";


const options = {
    host: "localhost",
    username: "admin",
    password: "admin",
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