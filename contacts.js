const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}
async function getContactById(contactId) {
  try {
    if (contactId !== -1) {
      const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data);
      const contact = contacts.find((c) => c.id === contactId);
      return contact || null;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((el) => el.id === contactId);
    const removedContact = contacts.find((el) => el.id === contactId);
    if (contactIndex === -1) {
      console.log(null);
    }
    contacts.splice(contactIndex, 1);
    console.log(removedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(error);
  }
}

async function addContact() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = {
      name: "Mango",
      email: "mango@gmail.com",
      phone: "322-22-22",
    };
    contacts.push(newContact);
    const result = await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(newContact);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
