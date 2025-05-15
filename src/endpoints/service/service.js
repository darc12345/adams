var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// service.ts
import { Repository } from "../repository/repository.js";
export class Service {
    constructor(db) {
        this.postRegister = (email, password) => __awaiter(this, void 0, void 0, function* () {
            yield this.repo.postRegister(email, password);
        });
        this.postLogin = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repo.postLogin(email, password);
            return user;
        });
        this.calculateDistance = (location1, location2) => {
            return Math.sqrt((location1[0] - location2[0]) ** 2 + (location1[1] - location2[1]) ** 2);
        };
        this.IDWInterpolation = (location, data) => {
            let enumerator = 0;
            let denominator = 0;
            for (const point of data) {
                const d = this.calculateDistance(location, point.location);
                enumerator += point.pollution / (d ** 3);
                denominator += 1 / (d ** 3);
            }
            return enumerator / denominator;
        };
        this.calculateMap = () => __awaiter(this, void 0, void 0, function* () {
            let start = [-7.920114, 110.022557];
            let finish = [-7.795537, 110.850264];
            let step_x = (0.124577) / 30;
            let step_y = (0.124577) / 30;
            let data = yield this.getScannerData();
            let results = [];
            for (let x = start[0]; x <= finish[0]; x += step_x) {
                for (let y = start[1]; y <= finish[1]; y += step_y) {
                    results.push({
                        pollution: this.IDWInterpolation([x, y], data),
                        coordinate: [x, y]
                    });
                    // console.log(`x = ${x}, y = ${y}`)
                }
            }
            if (results.length === 0) {
                throw new Error('No results found');
            }
            // this.repo.postDataInterpolation(results);
            return results;
        });
        this.getInterpolationData = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.getInterpolationData();
        });
        this.postScannerData = (pollution, x_coor, y_coor) => __awaiter(this, void 0, void 0, function* () {
            yield this.repo.postScannerData(pollution, x_coor, y_coor);
        });
        this.postPollutionExposure = (user_id, x_coor, y_coor, pollution) => __awaiter(this, void 0, void 0, function* () {
            yield this.repo.postPollutionExposureTable(user_id, x_coor, y_coor, pollution);
        });
        this.getExposureDataById = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repo.GetExposureDataByID(user_id);
            return data;
        });
        this.getExposureDataAndCoorById = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repo.GetExposureDataByID(user_id);
            return data;
        });
        this.getMission = (user_id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.getMission(user_id);
        });
        this.postMission = (mission, points) => __awaiter(this, void 0, void 0, function* () {
            yield this.repo.postMission(mission, points);
        });
        this.deleteMission = (mission_id) => __awaiter(this, void 0, void 0, function* () {
            yield this.repo.deleteMission(mission_id);
        });
        this.postUserMissionProgress = (user_id, mission_id, quantity) => __awaiter(this, void 0, void 0, function* () {
            yield this.repo.postUserMissionProgress(user_id, mission_id, quantity);
        });
        this.postRecordJourney = (user_id, x_coor, y_coor) => __awaiter(this, void 0, void 0, function* () {
            let data = yield this.getScannerData();
            let pollution = this.IDWInterpolation([x_coor, y_coor], data);
            yield this.repo.postRecordJourney(user_id, x_coor, y_coor, pollution);
        });
        this.repo = new Repository(db);
    }
    recordScannerData(pollution, x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.postScannerData(pollution, x, y);
        });
    }
    recordUserExposure(userId, x, y, pollution) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.postPollutionExposureTable(userId, x, y, pollution);
        });
    }
    getScannerData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.GetScannerData();
        });
    }
}
