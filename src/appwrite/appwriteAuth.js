import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client(); //initialising client
  account; //initialising account
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // login after register
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updateNameAndPassword({ name, password, oldPassword }) {
    try {
      if (name) {
        await this.account.updateName(name);
      }
      if (password) {
        await this.account.updatePassword(password, oldPassword);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updatePrefs(prefs) {
    try {
      await this.account.updatePrefs(prefs);
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

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions("current");
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();
// authService.createAccount
export default authService;
