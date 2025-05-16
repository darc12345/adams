var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Service } from '../service/service.js';
import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
export class Controller {
    constructor(db) {
        this.postRegister = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body) {
                res.status(400).json({ message: 'The request body is empty' });
                return;
            }
            try {
                const { email, password } = req.body;
                yield this.service.postRegister(email, password);
                return res.status(201).json({ message: 'User registered successfully' });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        });
        this.postLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var user_id;
            try {
                const { email, password } = req.body;
                user_id = yield this.service.postLogin(email, password);
                if (!user_id) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }
                req.session.user_id = user_id;
                yield req.session.save();
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
            ;
            return res.status(200).json({ message: 'logged in' });
        });
        this.getScannerData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.getScannerData();
                res.json(data);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to fetch scanner data' });
            }
        });
        this.postScannerData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { pollution, x_coor, y_coor } = req.body;
                yield this.service.postScannerData(pollution, x_coor, y_coor);
                return res.status(201).json({ message: 'Scanner data posted successfully' });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        });
        this.postPollutionExposure = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { x_coor, y_coor, pollution } = req.body;
                if (!req.session.user_id) {
                    return res.status(400).json({ message: 'unauthenticated' });
                }
                const user_id = req.session.user_id;
                yield this.service.postPollutionExposure(user_id, x_coor, y_coor, pollution);
                return res.status(201).json({ message: 'Pollution exposure data recorded' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: error.message });
            }
        });
        this.getExposureDataById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = req.session.user_id;
            if (!user_id) {
                res.status(400).json({ message: 'unauthenticated' });
                return;
            }
            try {
                const data = yield this.service.getExposureDataById(user_id);
                return res.status(200).json(data);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        });
        this.calculateMap = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield this.service.calculateMap());
            }
            catch (error) {
                console.error(error);
                return res.status(500).json(error);
            }
        });
        this.getMission = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var user_id = req.session.user_id;
            if (!user_id) {
                res.status(400).json({ message: 'unauthenticated' });
                return;
            }
            try {
                return res.status(200).json(yield this.service.getMission(user_id));
            }
            catch (error) {
                console.error(error);
                return res.status(500).json(error);
            }
        });
        this.generateGemini = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = req.session.user_id;
            if (!user_id) {
                res.status(400).json({ message: 'unauthenticated' });
                return;
            }
            try {
                var exposure_data = JSON.stringify(yield this.service.getExposureDataById(user_id));
                var response = yield ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: `Analyze the provided ${exposure_data.toString()} (containing driving duration, distance, and pollution exposure percentages) and generate a concise, friendly summary of the driver's air quality exposure. Your response should:

Interpret the Data:

Calculate total drive time and distance.

Break down the percentage of time spent in green (good), yellow (moderate), and red (poor) air quality zones.

Compare Trends (if historical data exists):

Highlight improvements (e.g., "You spent 10% less time in red zones than last week!").

Note regressions (e.g., "More time in yellow zones today—let’s check routes.").

Provide Feedback:

If mostly green: Reinforce good habits ("Great job—clean air for 80% of your drive!").

If significant red/yellow:

Briefly mention health impacts ("High pollution exposure can cause fatigue or irritation.").

Suggest an actionable tip ("Try leaving 15 mins earlier to avoid traffic-related pollution.").

Tone & Format:

Friendly, supportive, and personalized.

No chatbot phrases—output the summary directly.

Max 4-5 sentences.

Do not give the user any hint that this is AI or chatbot generated. So, do not say things such as "ok, here is.."
Example Output:
"You drove 30 miles (50 mins), with 60% in clean air—well done! The 25% in red zones (up 5% from last week) may cause mild throat irritation. Try using [Road X] to cut pollution exposure.`,
                    config: {
                        maxOutputTokens: 500,
                        temperature: 0.7,
                    },
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json(error);
            }
            res.status(200).json({ message: response.text });
        });
        this.postMission = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var { mission, points } = req.body;
            try {
                yield this.service.postMission(mission, points);
                return res.status(201).json({
                    message: 'Mission created successfully',
                });
            }
            catch (error) {
                console.error('Error creating mission:', error);
                return res.status(500).json({
                    error: 'Failed to create mission',
                    details: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.deleteMission = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { mission_id } = req.body;
                yield this.service.deleteMission(mission_id);
                return res.status(200).json({
                    message: 'Mission deleted successfully',
                    mission_id
                });
            }
            catch (error) {
                console.error('Error deleting mission:', error);
                return res.status(500).json({
                    error: 'Failed to delete mission',
                    details: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.postUserMissionProgress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { mission_id, quantity } = req.body;
                if (!req.session.user_id) {
                    return res.status(400).json({ message: 'unauthenticated' });
                }
                const user_id = req.session.user_id;
                yield this.service.postUserMissionProgress(user_id, mission_id, quantity);
                return res.status(201).json({
                    message: 'User mission progress recorded successfully',
                    user_id,
                    mission_id,
                    quantity
                });
            }
            catch (error) {
                console.error('Error recording user mission progress:', error);
                return res.status(500).json({
                    error: 'Failed to record user mission progress',
                    details: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.postGoogleSignIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                var { token, email, uid } = req.body;
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
            if (uid != null) {
                req.session.user_id = uid;
                yield req.session.save();
            }
            res.status(201).json({ message: 'User signed in successfully' });
        });
        this.postLogout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            req.session.user_id = null;
            yield req.session.save();
            res.status(200).json({ message: 'User logged out successfully' });
        });
        this.postRecordJourney = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.session.user_id) {
                    return res.status(400).json({ message: 'unauthenticated' });
                }
                const { x_coor, y_coor } = req.body;
                const user_id = req.session.user_id;
                yield this.service.postRecordJourney(user_id, x_coor, y_coor);
                return res.status(201).json({
                    message: 'Session path recorded successfully'
                });
            }
            catch (error) {
                console.error('Error recording session path:', error);
                return res.status(500).json({
                    error: 'Failed to record session path',
                    details: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.service = new Service(db);
    }
}
