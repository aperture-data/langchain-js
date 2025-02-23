import { EmbeddingsInterface } from "@langchain/core/embeddings";
import { SaveableVectorStore } from "@langchain/core/vectorstores";
import { Document } from "@langchain/core/documents";
import { v4 as uuidv4 } from 'uuid';
import { ApertureClient } from "@coffeeblackai/aperturedb-node";


export interface ApertureDBStoreOptions {
  host: string;
  username?: string;
  password?: string;
  descriptorSet?: string;
  dimensions: number;
  engine?: 'HNSW' | 'Flat';
  metric?: 'L2' | 'IP' | 'COSINE';
  kNeighbors?: number;
  propertyPrefix?: string;
  textProperty?: string;
}

export class ApertureDBStore extends SaveableVectorStore {
  options: ApertureDBStoreOptions;
  client: ApertureClient;

  async similaritySearchVectorWithScore(query: number[], k: number, filter?: this["FilterType"] | undefined): Promise<[Document, number][]> {
      const response = await this.client.descriptors.findDescriptors(Float32Array.from(query), {
        set: this.options.descriptorSet + "",
        k_neighbors: k,
        distances: true
      });
      console.log(filter);
      return response.map((doc: any) => {
        return [doc, doc.distance]
      });
  }

  _vectorstoreType() {
    return "ApertureDBStore";
  }

  constructor(embeddings: EmbeddingsInterface, options: ApertureDBStoreOptions) {
    super(embeddings, options);
    this.client = ApertureClient.getInstance({
      host: options.host,
      username: options.username,
      password: options.password
    });

    console.log("Creating ApertureDBStore");
    this.options = options;
    this.client.descriptorSets.addDescriptorSet({
      name: this.options.descriptorSet,
      engine: this.options.engine,
      metric: this.options.metric,
      dimensions: this.options.dimensions
    }).then((response) => {
      console.log(`DescriptorSet created . ${JSON.stringify(response)}`);
    });
  }

  async addVectors(vectors: number[][], documents: Document[]): Promise<string[]> {
    console.log("Adding vectors to ApertureDB");
    let ids: string[] = [];
    for (let index = 0; index < vectors.length; index++) {
      const vector = vectors[index];
      const document = documents[index];
      const id = uuidv4();
      this.client.descriptors.addDescriptor({
        set: this.options.descriptorSet + "",
        blob: Float32Array.from(vector),
        properties: {
          id: id,
          document: document.pageContent
        }
      }).then((response) => {
        console.log(`Vector added . ${JSON.stringify(response)}`);
        ids.push(id);
      });
    }
    return ids;
  }


  async addDocuments(documents: Document[]): Promise<string[]> {
    console.log("Adding documents to ApertureDB");

    const texts = documents.map(({ pageContent }) => pageContent);
    return this.addVectors(
        await this.embeddings.embedDocuments(texts),
        documents
    )
  }

  close(){
    console.log("Closing ApertureDBStore");
    this.client.destroy();
  }

  async save(directory: string): Promise<void> {
    console.log(`Saving ApertureDBStore ${directory}`);
  }
}