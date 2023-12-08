import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  const reedContacts = await fs.readFile(contactsPath);
  return JSON.parse(reedContacts);
}

export async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id.
  // Повертає null, якщо контакт з таким id не знайдений.
  const getContacts = await listContacts();
  const result = getContacts.find((elem) => elem.id === contactId);

  return result || null;
}

export async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const getContacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
  };
  getContacts.push(newContact);
  updateContacts(getContacts);
  return newContact;
}

export async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту.
  // Повертає null, якщо контакт з таким id не знайдений.
  const getContacts = await listContacts();
  const index = getContacts.findIndex((elem) => elem.id === contactId);

  if (index === -1) {
    return;
  }
  const result = getContacts.splice(index, 1);
  updateContacts(getContacts);
  return result;
}
