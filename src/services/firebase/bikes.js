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

class BikeDataService {
  constructor() {
    this.db = db;
    this.cId = "bikes";
  }

  async getBikesRef() {
    const bikes = await this.getAll();
    const bikesRef = {};
    bikes.forEach((bike) => (bikesRef[bike.id] = bike));
    return bikesRef;
  }

  getItemFromDoc(docRef) {
    const item = docRef.data({ serverTimestamps: "estimate" });
    return {
      id: docRef.id,
      ...item,
      createdAt: item.createdAt.toDate().toISOString(),
      updatedAt: item.updatedAt.toDate().toISOString(),
    };
  }
  async getAll() {
    const docRefs = await getDocs(collection(this.db, this.cId));
    const items = [];

    docRefs.forEach(async (docRef) => {
      const item = this.getItemFromDoc(docRef);
      items.push(item);
    });
    return items;
  }

  async get(id) {
    const docRef = await getDoc(doc(this.db, this.cId, id));
    if (docRef.exists()) {
      const item = this.getItemFromDoc(docRef);
      return item;
    } else {
      throw new Error(`Bike not found: id=${id}`);
    }
  }

  async create(bike) {
    const bikeRef = await addDoc(collection(this.db, this.cId), {
      ...bike,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return await this.get(bikeRef.id);
  }

  async createWithId(id, bike) {
    await setDoc(doc(this.db, this.cId, id), {
      ...bike,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return await this.get(id);
  }

  async update(id, bike) {
    await updateDoc(doc(this.db, this.cId, id), {
      ...bike,
      updatedAt: serverTimestamp(),
    });
    return await this.get(id);
  }

  async delete(id) {
    await reservationDataService.deleteByBikeId(id);
    await deleteDoc(doc(this.db, this.cId, id));
  }

  async getByDateRange(startDate, endDate) {
    const bikes = await this.getAll();
    const availabilities = {};
    bikes.forEach((bike) => (availabilities[bike.id] = true));

    const reservations = await reservationDataService.getAll();
    reservations.forEach((reservation) => {
      if (availabilities[reservation.bike_id]) {
        const start_date = new Date(reservation.start_date);
        const end_date = new Date(reservation.end_date);
        // Mark as unavailable if reserved range is out of date range
        if (start_date <= startDate && end_date >= endDate)
          availabilities[reservation.bike_id] = false;
      }
    });

    const availableBikes = bikes.filter((bike) => availabilities[bike.id]);
    return availableBikes;
  }
}

export default new BikeDataService();
