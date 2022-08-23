import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

import { db } from "./config";
import bikeDataService from "./bikes";

class BikeRatingDataService {
  constructor() {
    this.db = db;
    this.cId = "bike_ratings";
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

  async get(id) {
    const docRef = await getDoc(doc(this.db, this.cId, id));
    if (docRef.exists()) {
      const item = this.getItemFromDoc(docRef);
      return item;
    } else {
      throw new Error(`Bike rating not found: id=${id}`);
    }
  }

  async getByBikeId(bikeId) {
    const items = [];
    const q = query(
      collection(this.db, this.cId),
      where("bike_id", "==", bikeId)
    );
    const docRefs = await getDocs(q);
    docRefs.forEach((docRef) => {
      const item = this.getItemFromDoc(docRef);
      items.push(item);
    });
    return items;
  }

  async create(bikeRating) {
    const docRef = await addDoc(collection(this.db, this.cId), {
      ...bikeRating,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    let sum = 0;
    const bikeRatings = await this.getByBikeId(bikeRating.bike_id);
    bikeRatings.forEach((rating) => (sum += rating.rating));

    const avgRating = (sum / bikeRatings.length).toFixed(2);

    await bikeDataService.update(bikeRating.bike_id, { rating: avgRating });

    return this.get(docRef.id);
  }

  async update(id, bikeRating) {
    await updateDoc(doc(this.db, this.cId, id), {
      ...bikeRating,
      updatedAt: serverTimestamp(),
    });
    return await this.get(id);
  }

  async delete(id) {
    await deleteDoc(doc(this.db, this.cId, id));
  }
}

export default new BikeRatingDataService();
