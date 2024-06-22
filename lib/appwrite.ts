import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6675d953001d636de62c");
export const account = new Account(client);
export const databases = new Databases(client);

export { ID } from "appwrite";
