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
import userDataService from "./users";
import bikeDataService from "./bikes";

class ReservationDataService {
  constructor() {
    this.db = db;
    this.cId = "reservations";
  }

  getItemFromDoc(docRef, usersRef, bikesRef) {
    const reservation = docRef.data({ serverTimestamps: "estimate" });
    return {
      id: docRef.id,
      ...reservation,
      user: usersRef[reservation.user_id],
      bike: bikesRef[reservation.bike_id],
      createdAt: reservation.createdAt.toDate().toISOString(),
      updatedAt: reservation.updatedAt.toDate().toISOString(),
    };
  }

  async getAll() {
    const usersRef = await userDataService.getUsersRef();
    const bikesRef = await bikeDataService.getBikesRef();

    const docRefs = await getDocs(collection(this.db, this.cId));
    const reservations = [];

    docRefs.forEach((docRef) => {
      const item = this.getItemFromDoc(docRef, usersRef, bikesRef);
      reservations.push(item);
    });
    return reservations;
  }

  async getByBikeId(bikeId) {
    const usersRef = await userDataService.getUsersRef();
    const bikesRef = await bikeDataService.getBikesRef();

    const q = query(
      collection(this.db, this.cId),
      where("bike_id", "==", bikeId)
    );

    const reservations = [];
    const docRefs = await getDocs(q);
    docRefs.forEach((docRef) => {
      const item = this.getItemFromDoc(docRef, usersRef, bikesRef);
      reservations.push(item);
    });
    return reservations;
  }

  async getByUserId(userId) {
    const usersRef = await userDataService.getUsersRef();
    const bikesRef = await bikeDataService.getBikesRef();

    const q = query(
      collection(this.db, this.cId),
      where("user_id", "==", userId)
    );

    const reservations = [];
    const docRefs = await getDocs(q);
    docRefs.forEach((docRef) => {
      const item = this.getItemFromDoc(docRef, usersRef, bikesRef);
      reservations.push(item);
    });
    return reservations;
  }

  async get(id) {
    const usersRef = await userDataService.getUsersRef();
    const bikesRef = await bikeDataService.getBikesRef();

    const docRef = await getDoc(doc(this.db, this.cId, id));
    if (docRef.exists()) {
      const item = this.getItemFromDoc(docRef, usersRef, bikesRef);
      return item;
    } else {
      throw new Error(`Reservation not found: id=${id}`);
    }
  }

  async create(reservation) {
    const docRef = await addDoc(collection(this.db, this.cId), {
      ...reservation,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return await this.get(docRef.id);
  }

  async createWithId(id, reservation) {
    await setDoc(doc(this.db, this.cId, id), {
      ...reservation,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return await this.get(id);
  }

  async update(id, reservation) {
    await updateDoc(doc(this.db, this.cId, id), {
      ...reservation,
      updatedAt: serverTimestamp(),
    });
    return await this.get(id);
  }

  async delete(id) {
    await deleteDoc(doc(this.db, this.cId, id));
  }

  async deleteByUserId(userId) {
    const q = query(
      collection(this.db, this.cId),
      where("user_id", "==", userId)
    );

    const docRefs = await getDocs(q);
    docRefs.forEach(async (docRef) => {
      await this.delete(docRef.id);
    });
  }

  async deleteByBikeId(bikeId) {
    const q = query(
      collection(this.db, this.cId),
      where("bike_id", "==", bikeId)
    );

    const docRefs = await getDocs(q);
    docRefs.forEach(async (docRef) => {
      await this.delete(docRef.id);
    });
  }

  async cancel(id) {
    await updateDoc(doc(this.db, this.cId, id), {
      status: "canceled",
      updatedAt: serverTimestamp(),
    });
    return await this.get(id);
  }
}

export default new ReservationDataService();
