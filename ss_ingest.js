import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
// import { FaissStore } from "@langchain/community/vectorstores/faiss";
import pkg from "./dist/aperturedb.cjs";
const  { ApertureDBStore, ApertureDBStoreOptions }  = pkg;

// Create a new instance of the RecursiveCharacterTextSplitter
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

// Create a new instance of the OpenAIEmbeddings
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large"
});

const loader = new PDFLoader("nke-10k-2023.pdf");

const docs = await loader.load();

const allSplits = await textSplitter.splitDocuments(docs);

const options = {
  host: "localhost",
  username: "admin",
  password: "admin",
  descriptorSet: "lcjs",
  dimensions: 3072
};

//const vectorStore = new FaissStore(embeddings, options);
const vectorStore = new ApertureDBStore(embeddings, options);

// const testSplits = allSplits.splice(0, 1);
await vectorStore.addDocuments(allSplits);

console.log(allSplits.length);

vectorStore.close();