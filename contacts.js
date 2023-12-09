import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  const reedContacts = await fs.readFile(contactsPath);
  return JSON.parse(reedContacts);
}

export async function getContactById(contactId) {
  const getContacts = await listContacts();
  const result = getContacts.find((elem) => elem.id === contactId);

  return result || null;
}

export async function addContact(name, email, phone) {
  const getContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  getContacts.push(newContact);
  updateContacts(getContacts);
  return newContact;
}

export async function removeContact(contactId) {
  const getContacts = await listContacts();
  const index = getContacts.findIndex((elem) => elem.id === contactId);

  if (index === -1) {
    return;
  }
  const result = getContacts.splice(index, 1);
  updateContacts(getContacts);
  return result || null;
}
