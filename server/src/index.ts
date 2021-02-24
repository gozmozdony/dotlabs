import {Octokit} from "@octokit/rest";
import Ajv from "ajv";

import searchHandlerFactory from "./handlers/searchHandler";
import SearchServiceFactory from "./business-service/searchService";
import { ENV_AUTH_TOKEN, ENV_USER_AGENT } from "./constants/environment";

const octokit = new Octokit({
    auth: process.env[ENV_AUTH_TOKEN],
    userAgent: process.env[ENV_USER_AGENT]
})

const searchService = SearchServiceFactory(octokit);
const validator = new Ajv();

export const searchHandler = searchHandlerFactory(searchService, validator);
