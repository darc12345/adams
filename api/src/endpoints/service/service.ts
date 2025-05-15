// service.ts
import { DbType, Repository } from "../repository/repository.js";
export class Service {
  private repo: Repository;

  constructor(db: DbType) {
    this.repo = new Repository(db)
  }
  postRegister = async (email: string, password: string) => {
    await this.repo.postRegister(email, password);
  };

  postLogin = async (email: string, password: string) => {
    const user = await this.repo.postLogin(email, password);
    return user;
  };

  async recordScannerData(pollution: number, x: number, y: number): Promise<void> {
    await this.repo.postScannerData(pollution, x, y);
  }

  async recordUserExposure(userId: string, x: number, y: number, pollution: number): Promise<void> {
    await this.repo.postPollutionExposureTable(userId, x, y, pollution);
  }
  async getScannerData() {
    return this.repo.GetScannerData();
  }
  private calculateDistance = (location1: [number, number], location2: [number, number]): number => {
    return Math.sqrt((location1[0] - location2[0]) ** 2 + (location1[1] - location2[1]) ** 2)
  }

  private IDWInterpolation = (location: [number, number], data: { location: [number, number], pollution: number }[]): number => {
    let enumerator: number = 0;
    let denominator: number = 0;

    for (const point of data) {
      const d = this.calculateDistance(location, point.location);
      enumerator += point.pollution / (d ** 3);
      denominator += 1 / (d ** 3);
    }

    return enumerator / denominator;
};
calculateMap = async () => {
  let start: [number, number] = [-7.920114, 110.022557];
  let finish: [number, number] = [-7.795537, 110.850264];  
  let step_x: number = (0.124577)/30;
  let step_y: number = (0.124577)/30;
  let data = await this.getScannerData();
  let results: Array<{ pollution: number, coordinate: [number, number] }> = [];
 
  for (let x = start[0]; x <= finish[0]; x += step_x) {
    for (let y = start[1]; y <= finish[1]; y += step_y) {
      results.push({
        pollution: this.IDWInterpolation([x, y], data),
        coordinate: [x, y] as [number, number]
      });
      // console.log(`x = ${x}, y = ${y}`)
    }
  }

    if (results.length === 0) {
      throw new Error('No results found');
    }

    // this.repo.postDataInterpolation(results);
    return results;
  }
  getInterpolationData = async () => {
    return await this.repo.getInterpolationData();
  }
  postScannerData = async (pollution: number, x_coor: number, y_coor: number) => {
    await this.repo.postScannerData(pollution, x_coor, y_coor);
  };

  postPollutionExposure = async (
    user_id: string,
    x_coor: number,
    y_coor: number,
    pollution: number
  ) => {
    await this.repo.postPollutionExposureTable(user_id, x_coor, y_coor, pollution);
  };
  getExposureDataById = async (user_id: string) => {
    const data = await this.repo.GetExposureDataByID(user_id);
    return data;
  };
  getExposureDataAndCoorById = async (user_id: string) => {
    const data = await this.repo.GetExposureDataByID(user_id);
    return data;
  };
  getMission = async (user_id: string) => {
    return await this.repo.getMission(user_id);
  }
  postMission = async (mission: string, points: number) => {
    await this.repo.postMission(mission, points)
  }
  deleteMission = async (mission_id: number) => {
    await this.repo.deleteMission(mission_id);
  }
  postUserMissionProgress = async (user_id: string, mission_id: number, quantity: number) => {
    await this.repo.postUserMissionProgress(user_id, mission_id, quantity);
  }
  postRecordJourney = async (user_id: string, x_coor: number, y_coor: number) => {
    let data = await this.getScannerData();
    let pollution = this.IDWInterpolation([x_coor, y_coor], data);
    await this.repo.postRecordJourney(user_id, x_coor, y_coor, pollution);
  }
}