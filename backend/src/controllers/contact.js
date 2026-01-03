import { Contact } from "../model/contact.js";

// Add new contact
const createContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Check if contact already exists
    const existingContact = await Contact.findOne({
      $or: [{ phone }, { email }],
    });
    if (existingContact) {
      return res.status(409).json({ message: "Contact already exists" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ message: "New contact created", contact: newContact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts); // return as array
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

// Get single contact
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact" });
  }
};
 
// Update contact
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, message } = req.body;

  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;
    contact.message = message || contact.message;

    await contact.save();
    res.json({ message: "Contact updated", contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update contact" });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.json({ message: "Contact deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete contact" });
  }
};

export { createContact, getAllContacts, getContactById, updateContact, deleteContact };
