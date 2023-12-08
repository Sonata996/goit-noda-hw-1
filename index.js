import * as serviseContacts from "./contacts.js";
import yargs from "yargs";
import { nanoid } from "nanoid";

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      const getAllContacts = await serviseContacts.listContacts();
      console.log(getAllContacts);
      break;

    case "get":
      // ... id
      const getContactOne = await serviseContacts.getContactById(id);
      console.log(getContactOne);
      break;

    case "add":
      // ... name email phone
      const addContactOne = await serviseContacts.addContact(
        name,
        email,
        phone
      );
      console.log(addContactOne);
      break;

    case "remove":
      // ... id
      const removeContact = await serviseContacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const { argv } = yargs(process.argv.slice(2));
invokeAction(argv);

