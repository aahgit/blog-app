import config from "../config/config";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  dataBases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.dataBases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredimg, status, userid }) {
    try {
      return await this.dataBases.createDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug, //this is an unique val
        {
          title,
          content,
          featuredimg,
          status,
          userid,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, content, featuredimg, status }) {
    try {
      return await this.dataBases.updateDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimg,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug) {
    try {
      await this.dataBases.deleteDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.dataBases.getDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getallPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.dataBases.listDocuments(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        // queries
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getallUsersPosts() {
    try {
      return await this.dataBases.listDocuments(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async uploadFlie(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
    }
  }
  async deleteFlie(fileid) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileid);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async getFilePreview(fileId) {
    try {
      return await this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log(error);
    }
  }
}

const service = new Service();

export default service;
