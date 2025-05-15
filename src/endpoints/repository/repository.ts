import { NeonQueryFunction } from "@neondatabase/serverless";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { scannerDataTable, pollutionExposureTable, DataInterpretationTable, MissionTable, UserMissionTable} from '../../db/schema.js'
import { NeonDbError } from "@neondatabase/serverless";
import { sql, and, eq, or, isNull } from "drizzle-orm";
import { timestamp } from "drizzle-orm/gel-core";
import { GoogleGenAI } from "@google/genai";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
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



export type DbType = NeonHttpDatabase<Record<string, never>> & {
    $client: NeonQueryFunction<false, false>;
}
export class Repository{
    db:DbType;
    constructor(db:DbType){
        this.db=db;
    }
    postRegister = async (email: string, password:string)=>{
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        } catch(error:any){
            console.error(`error code = ${error.code} error = ${error.message}`);
            throw error;
        }
    }
    postLogin = async (email: string, password:string)=>{
        try{
            var userCredential = await signInWithEmailAndPassword(auth, email, password);
        } catch(error:any){
            console.error(`error code = ${error.code} error = ${error.message}`);
            throw error;
        }
        return userCredential.user.uid;
    }
    postScannerData = async (pollution:number, x_coor:number, y_coor:number):Promise<void> => {
        try{
            await this.db
            .insert(scannerDataTable)
            .values({
                pollution: pollution,
                coordinate: [x_coor, y_coor], 
            })
        } catch(error){
            console.log(error);
            throw new Error("An error occured during database call."); 
        }
        return;
    }
    postPollutionExposureTable = async (user_id:string, x_coor:number, y_coor:number, pollution:number):Promise<void>=>{
        try{
            await this.db
            .insert(pollutionExposureTable)
            .values({
                user_id : user_id,
                coordinate: [x_coor, y_coor],
                pollution: pollution

            })
        }
        catch(error){
            console.log(error);
            throw new Error("An error occured during database call."); 
        }
        return;    
    }
    GetExposureDataByID = async (user:string)=>{
        try{
            return await this.db.select({
                timestamp: pollutionExposureTable.timestamp,
                pollution: pollutionExposureTable.pollution,
                coordinate: pollutionExposureTable.coordinate
            })
            .from(pollutionExposureTable)
            .where(
            and(
                eq(
                sql`DATE(${pollutionExposureTable.timestamp})`, 
                sql`DATE(NOW())`
                ),
                eq(pollutionExposureTable.user_id, user)
            ));
            } catch(error){
                console.log(error);
                throw new Error("An error occured during database call."); 
                }
        }
    GetScannerData = async ()=>{
        try{
            return await this.db.select({
                location: scannerDataTable.coordinate,
                pollution: scannerDataTable.pollution
            })
            .from(scannerDataTable)
            .where(eq(
                sql`DATE(${scannerDataTable.timestamp})`, 
                sql`DATE(NOW())`
            ));
            } catch(error){
            console.log(error);
            throw new Error("An error occured during database call."); 
            }
    }
    postDataInterpolation = async (data:{pollution:number, coordinate:[number, number]}[])=>{
        try{
            await this.db
            .insert(DataInterpretationTable)
            .values(data)
        } catch(error){
            console.log(error);
            throw new Error("An error occured during database call."); 
        }
        return;
    }
    getInterpolationData = async()=>{
        try{
            return await this.db
            .select(
                {
                    pollution:DataInterpretationTable.pollution, 
                    coordinate:DataInterpretationTable.coordinate
                }
            )
            .from(DataInterpretationTable)
        }catch(error){
            console.log(error);
            throw new Error("An error occured during database call."); 
            }
    }
    getMission = async(user_id:string)=>{
        try{
        return await this.db
                    .select({
                        mission_id:MissionTable.mission_id,
                        mission: MissionTable.mission,
                        points: MissionTable.points,
                        quantity: UserMissionTable.quantity
                    })
                    .from(MissionTable)
                    .leftJoin(UserMissionTable, eq(UserMissionTable.mission_id, MissionTable.mission_id))
                    .where(
                        and(
                            eq(MissionTable.isDeleted, false),
                            or(
                                eq(UserMissionTable.user_id, user_id),
                                isNull(UserMissionTable.user_id)
                            )
                        )
                    );
        } catch (error){
            console.error(error)
            throw error;
        }
    };
    postMission = async (mission:string, points: number)=>{
        try{
            await this.db
            .insert(MissionTable)
            .values({
                mission: mission,
                points: points
            })
        } catch (error){
            console.error(error)
            throw error;
        }
    }
    postUserMissionProgress = async (user_id:string, mission_id:number, quantity:number)=>{
        try{
            await this.db
            .insert(UserMissionTable)
            .values({
                user_id: user_id,
                mission_id: mission_id,
                quantity: quantity
            })
        } catch(error){
            console.error(error)
            throw error;
        }
    }
    deleteMission = async (mission_id:number)=>{
        try{
            await this.db
            .update(MissionTable)
            .set({isDeleted:true})
        } catch(error){
            console.error(error)
            throw error;
        }
    }
    postRecordJourney = async (user_id:string, x_coor:number, y_coor:number, pollution:number)=>{
        try{
            await this.db
            .insert(pollutionExposureTable)
            .values({
                user_id: user_id,
                coordinate: [x_coor, y_coor],
                pollution: pollution
            })
        } catch(error){
            console.error(error)
            throw error;
        }
    }
}
