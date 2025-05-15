import { foreignKey } from "drizzle-orm/gel-core";
import { point, decimal, serial,integer, pgTable, varchar, uuid, timestamp, date, pgEnum, smallint, boolean} from "drizzle-orm/pg-core";

export const pollutionExposureTable = pgTable("pollution_exposure",
    {
        id : serial().primaryKey(),
        user_id: varchar().notNull(),
        timestamp: timestamp().notNull().defaultNow(),
        coordinate: point().notNull(),
        pollution: decimal().$type<number>().notNull()
    }
);
export const scannerDataTable = pgTable('scanner_data',
    {
        id: serial().primaryKey(),
        pollution: decimal().notNull().$type<number>(),
        timestamp: timestamp().notNull().defaultNow(),
        coordinate: point().notNull(),
    }
)
export const DataInterpretationTable = pgTable('interpretation_table',
    {
        id: serial().primaryKey(),
        pollution: decimal().notNull().$type<number>(),
        coordinate: point().notNull(),
    }
)
export const MissionTable = pgTable('mission-table',
    {
        mission_id:serial().primaryKey(),
        mission:varchar().notNull(),
        points:integer().notNull(),
        isDeleted:boolean().notNull().default(false)
    }
)
export const UserMissionTable = pgTable('user-mission-table',
    {   
        id:serial().primaryKey(),
        user_id:varchar().notNull(),
        mission_id:integer().references(()=>MissionTable.mission_id).notNull(),
        quantity:smallint().notNull()

    }
)
