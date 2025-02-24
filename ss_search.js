import { ApertureDBStore } from "./dist/aperturedb.js"
import { OpenAIEmbeddings } from "@langchain/openai";


const options = {
  host: process.env.APERTURE_HOST,
  username: process.env.APERTURE_USER,
  password: process.env.APERTURE_PASSWORD,
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