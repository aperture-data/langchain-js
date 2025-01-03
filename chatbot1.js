import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

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
const vectorStore = new FaissStore(embeddings, {});

await vectorStore.addDocuments(allSplits);

// console.log(allSplits.length);

const results1 = await vectorStore.similaritySearch(
  "When was Nike incorporated?"
);

console.log(results1[0]);