import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

import { db } from "./config";
import reservationDataService from "./reservations";

class UserDataService {
  constructor() {
    this.db = db;
    this.collectionId = "users";
  }

  getItemFromDoc(docRef) {
    const user = docRef.data({ serverTimestamps: "estimate" });
    return {
      id: docRef.id,
      ...user,
      createdAt: user.createdAt.toDate().toISOString(),
      updatedAt: user.updatedAt.toDate().toISOString(),
    };
  }

  async getUsersRef() {
    const users = await this.getAll();
    const usersRef = {};
    users.forEach((user) => (usersRef[user.id] = user));
    return usersRef;
  }

  async getAll() {
    const docRefs = await getDocs(collection(this.db, this.collectionId));
    const users = [];

    docRefs.forEach(async (docRef) => {
      const item = this.getItemFromDoc(docRef);
      users.push(item);
    });
    return users;
  }

  async get(id) {
    const docRef = await getDoc(doc(this.db, this.collectionId, id));
    if (docRef.exists()) {
      const item = this.getItemFromDoc(docRef);
      return item;
    } else {
      throw new Error(`User not found: id=${id}`);
    }
  }

  async create(user) {
    const docRef = await addDoc(collection(this.db, this.collectionId), {
      ...user,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return await this.get(docRef.id);
  }

  async createWithId(id, user) {
    await setDoc(doc(this.db, this.collectionId, id), {
      ...user,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return await this.get(id);
  }

  async update(id, user) {
    await updateDoc(doc(this.db, this.collectionId, id), {
      ...user,
      updatedAt: serverTimestamp(),
    });
    return await this.get(id);
  }

  async delete(id) {
    await reservationDataService.deleteByUserId(id);
    await deleteDoc(doc(this.db, this.collectionId, id));
  }
}

export default new UserDataService();
