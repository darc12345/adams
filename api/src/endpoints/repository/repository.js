var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { scannerDataTable, pollutionExposureTable, DataInterpretationTable, MissionTable, UserMissionTable } from '../../db/schema.js';
import { sql, and, eq, or, isNull } from "drizzle-orm";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJm2mG6WU2ItwKf2lQDP286QojYnPh50Q",
    authDomain: "adams-db415.firebaseapp.com",
    projectId: "adams-db415",
    storageBucket: "adams-db415.firebasestorage.app",
    messagingSenderId: "117026430120",
    appId: "1:117026430120:web:875a4e9078683e37d0769d",
    measurementId: "G-1ZGBXZ1DEK"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export class Repository {
    constructor(db) {
        this.postRegister = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield createUserWithEmailAndPassword(auth, email, password);
            }
            catch (error) {
                console.error(`error code = ${error.code} error = ${error.message}`);
                throw error;
            }
        });
        this.postLogin = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                var userCredential = yield signInWithEmailAndPassword(auth, email, password);
            }
            catch (error) {
                console.error(`error code = ${error.code} error = ${error.message}`);
                throw error;
            }
            return userCredential.user.uid;
        });
        this.postScannerData = (pollution, x_coor, y_coor) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db
                    .insert(scannerDataTable)
                    .values({
                    pollution: pollution,
                    coordinate: [x_coor, y_coor],
                });
            }
            catch (error) {
                console.log(error);
                throw new Error("An error occured during database call.");
            }
            return;
        });
        this.postPollutionExposureTable = (user_id, x_coor, y_coor, pollution) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db
                    .insert(pollutionExposureTable)
                    .values({
                    user_id: user_id,
                    coordinate: [x_coor, y_coor],
                    pollution: pollution
                });
            }
            catch (error) {
                console.log(error);
                throw new Error("An error occured during database call.");
            }
            return;
        });
        this.GetExposureDataByID = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.select({
                    timestamp: pollutionExposureTable.timestamp,
                    pollution: pollutionExposureTable.pollution,
                    coordinate: pollutionExposureTable.coordinate
                })
                    .from(pollutionExposureTable)
                    .where(and(eq(sql `DATE(${pollutionExposureTable.timestamp})`, sql `DATE(NOW())`), eq(pollutionExposureTable.user_id, user)));
            }
            catch (error) {
                console.log(error);
                throw new Error("An error occured during database call.");
            }
        });
        this.GetScannerData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db.select({
                    location: scannerDataTable.coordinate,
                    pollution: scannerDataTable.pollution
                })
                    .from(scannerDataTable)
                    .where(eq(sql `DATE(${scannerDataTable.timestamp})`, sql `DATE(NOW())`));
            }
            catch (error) {
                console.log(error);
                throw new Error("An error occured during database call.");
            }
        });
        this.postDataInterpolation = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db
                    .insert(DataInterpretationTable)
                    .values(data);
            }
            catch (error) {
                console.log(error);
                throw new Error("An error occured during database call.");
            }
            return;
        });
        this.getInterpolationData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db
                    .select({
                    pollution: DataInterpretationTable.pollution,
                    coordinate: DataInterpretationTable.coordinate
                })
                    .from(DataInterpretationTable);
            }
            catch (error) {
                console.log(error);
                throw new Error("An error occured during database call.");
            }
        });
        this.getMission = (user_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db
                    .select({
                    mission_id: MissionTable.mission_id,
                    mission: MissionTable.mission,
                    points: MissionTable.points,
                    quantity: UserMissionTable.quantity
                })
                    .from(MissionTable)
                    .leftJoin(UserMissionTable, eq(UserMissionTable.mission_id, MissionTable.mission_id))
                    .where(and(eq(MissionTable.isDeleted, false), or(eq(UserMissionTable.user_id, user_id), isNull(UserMissionTable.user_id))));
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
        this.postMission = (mission, points) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db
                    .insert(MissionTable)
                    .values({
                    mission: mission,
                    points: points
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
        this.postUserMissionProgress = (user_id, mission_id, quantity) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db
                    .insert(UserMissionTable)
                    .values({
                    user_id: user_id,
                    mission_id: mission_id,
                    quantity: quantity
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
        this.deleteMission = (mission_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db
                    .update(MissionTable)
                    .set({ isDeleted: true });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
        this.postRecordJourney = (user_id, x_coor, y_coor, pollution) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db
                    .insert(pollutionExposureTable)
                    .values({
                    user_id: user_id,
                    coordinate: [x_coor, y_coor],
                    pollution: pollution
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
        this.db = db;
    }
}
