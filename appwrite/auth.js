import config from "../src/conf/config";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  // appwrite snippet for email and passowrd authentication
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectid);
    this.account = new Account(this.client);
  }

  async createaccount({ email, password, name }) {
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (useraccount) {
        // call another method
        // return useraccount;
        return this.login({ email, password });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async getcurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}

const authservice = new Authservice();
export default authservice;
