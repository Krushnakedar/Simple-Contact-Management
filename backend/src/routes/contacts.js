import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact
} from "../controllers/contact.js";

const router = express.Router();

router.post("/", createContact);           // POST /api/contacts
router.get("/", getAllContacts);           // GET /api/contacts
router.get("/:id", getContactById);        // GET /api/contacts/:id
router.put("/:id", updateContact);         // PUT /api/contacts/:id
router.delete("/:id", deleteContact);      // DELETE /api/contacts/:id

export default router;
