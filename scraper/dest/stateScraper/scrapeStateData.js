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
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = __importStar(require("puppeteer"));
const scrapeStateData = () => __awaiter(void 0, void 0, void 0, function* () {
    // Get the newest CSV blob link from the CDC (https://www.cdc.gov/poxvirus/monkeypox/response/2022/us-map.html) using Puppeteer
    // We're just going to grab the link then use node-fetch to pull it down because downloading files with puppeteer is like hell on earth.
    console.log("Loading the CDC site via Puppeteer");
    // * Launch browser and go to page
    const browser = yield puppeteer.launch();
    const page = yield browser.newPage();
    yield page.goto("https://www.cdc.gov/poxvirus/monkeypox/response/2022/us-map.html");
    // * Launch browser and go to page
    // * Find the download button by the download attribute
    const link = yield page.$('[download="2022 U.S. Map & Case Count.csv"]');
    // * Get the href value - unwrap into normal string from JSHandle
    const hrefAttribute = yield (link === null || link === void 0 ? void 0 : link.getProperty('href'));
    const href = yield (hrefAttribute === null || hrefAttribute === void 0 ? void 0 : hrefAttribute.jsonValue());
    // * Open a writeStream with FS and download the file using http
    yield browser.close();
    console.log("Grabbed data, closed browser");
});
exports.default = scrapeStateData;
