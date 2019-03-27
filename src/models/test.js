// @ts-check
const CosmosClient = require("@azure/cosmos").CosmosClient;
const debug = require("debug")("test");
class Test {
  /**
   * Manages reading, adding, and updating Tests in Cosmos DB
   * @param {CosmosClient} cosmosClient
   * @param {string} databaseId
   * @param {string} containerId
   */
  constructor(cosmosClient, databaseId, containerId) {
    this.client = cosmosClient;
    this.databaseId = databaseId;
    this.collectionId = containerId;

    this.database = null;
    this.container = null;
  }

  async init() {
    console.log("Setting up the database...");
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId
    });
    this.database = dbResponse.database;
    console.log("Setting up the database...done! DBId = " + this.databaseId);

    console.log("Setting up the container...");
    const coResponse = await this.database.containers.createIfNotExists({
      id: this.collectionId
    });
    this.container = coResponse.container;
    console.log("Setting up the container...done!");
  }

  async find(querySpec) {
    console.log("Querying for items from the database");
    if (!this.container) {
      throw new Error("Collection is not initialized.");
    }
    const { result: results } = await this.container.items
     .query(querySpec)
     .toArray();
   return results;
 }

 async addItem(item) {
   debug("Adding an item to the database");
   const { body: doc } = await this.container.items.create(item);
   return doc;
 }

 async getItem(itemId) {
   debug("Getting an item from the database");
   const { body } = await this.container.item(itemId).read();
   return body;
 }
}

module.exports = Test;