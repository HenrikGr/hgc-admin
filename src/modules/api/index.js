
import { authenticate } from "./auth";
import { createClient, getClientByName } from "./client";
import { createUser } from "./users";

const API = {
  authenticate,
  createUser,
  createClient,
  getClientByName,
};


export default API;