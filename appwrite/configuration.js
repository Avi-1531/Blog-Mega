import config from "../src/conf/config";
import {
  Client,
  // Users,
  Account,
  ID,
  Databases,
  Storage,
  Query,
} from "appwrite";

export class Service {
  client = new Client();
  // users;
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectid);
    // .setKey(
    //   "b4e2ded6f4c54c79e4dd9f3b434f0e0832cd1c3f414a508094f5ae8771397dbc30d9bfa0aa081d55a86244e268a6cb21e26acb326fed7eaba62a1a1c4560cd346fdb4232b7763d6c7f53605ade4c2fab4242b5713a44cbd384d86125f4e31d879ebfe610dcf16f8b462fa4b7fcc3f08866fb2905b0c3509dd1640d3079aaff07"
    // );
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    // this.users = new Users(this.client);
    this.bucket = new Storage(this.client);
  }

  async createpost({ title, slug, content, featuredimage, status, userid }) {
    try {
      await this.databases.createDocument(
        config.appwriteDatabaseid,
        config.appwriteCollectionid,
        slug,
        { title, content, featuredimage, status, userid }
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updatepost(slug, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseid,
        config.appwriteCollectionid,
        slug,
        { title, content, featuredimage, status }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletepost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseid,
        config.appwriteCollectionid,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getpost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseid,
        config.appwriteCollectionid,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // async listusers() {
  //   try {
  //     const response = await this.users.list();
  //     return response.users;
  //   } catch (error) {
  //     console.error("Error fetching users: ", error);
  //     return [];
  //   }
  // }
  async getposts(queries = [Query.equal("status", "active")]) {
    try {
      // queries.push(Query.equal("userid", userid));
      return await this.databases.listDocuments(
        config.appwriteDatabaseid,
        config.appwriteCollectionid,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async uploadfile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketid,
        ID.unique(),
        file
      );
      // return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deletefile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketid, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getfilepreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketid, fileId);
  }
}

const service = new Service();

export default service;
