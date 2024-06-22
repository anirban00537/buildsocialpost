// lib/appwrite.ts
import { Client, Account, Databases, ID } from "node-appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6675d953001d636de62c")
  .setKey(
    "3d9acba2a9476b3eaf37da1e4e1e6b4c0c4b0bd8235e1de4ed47a0516dc0912603affea82d3e705c30e3aae1e857883ea16fa8ad3a272bd0aa5e6a3997173b2d50188bd9962362778dd9c41568ce80b2153dc511cb6143c4bf21c1c78831beea5faaa1ec0d6700a3ca1998ef0b4bb05257e854e7f4252951f9a92edf1328805d"
  );

const account = new Account(client);
export const databases = new Databases(client);
export { client, account, ID };
