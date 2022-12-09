"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCodes_1 = __importDefault(require("@configurations/HttpStatusCodes"));
const placeService = __importStar(require("@services/place-service"));
const paths = {
    basePath: '/places',
    getById: '/:id',
    getAllByUserId: '/',
    create: '/',
    update: '/:id',
    delete: '/:id',
};
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authData = req.app.locals.auth;
        const id = parseInt(req.params.id, 10);
        const place = yield placeService.getById(authData.id, id);
        if (!place) {
            return res.status(HttpStatusCodes_1.default.NOT_FOUND).json('Place not found');
        }
        return res.status(HttpStatusCodes_1.default.OK).json(place);
    });
}
function getAllByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authData = req.app.locals.auth;
        const places = yield placeService.getAllByUserId(authData.id);
        return res.status(HttpStatusCodes_1.default.OK).json(places);
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authData = req.app.locals.auth;
        const newPlace = yield placeService.create(authData.id, req.body);
        return res.status(HttpStatusCodes_1.default.CREATED).json(newPlace);
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authData = req.app.locals.auth;
        const id = parseInt(req.params.id, 10);
        yield placeService.update(authData.id, id, req.body);
        return res.status(HttpStatusCodes_1.default.NO_CONTENT).json();
    });
}
function _delete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authData = req.app.locals.auth;
        const id = parseInt(req.params.id, 10);
        yield placeService.markAsDeleted(authData.id, id);
        return res.status(HttpStatusCodes_1.default.NO_CONTENT).json();
    });
}
exports.default = {
    paths,
    getById,
    getAllByUserId,
    create,
    update,
    delete: _delete,
};
