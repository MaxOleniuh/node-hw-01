const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        listContacts()
          .then((contacts) => console.table(contacts))
          .catch(console.error);
        break;

      case "get":
        getContactById(id)
          .then((contact) => console.log(contact))
          .catch(console.error);
        break;

      case "add":
        addContact(name, email, phone).then(() =>
          console.log("Contact added successfully")
        );
        break;

      case "remove":
        removeContact(id).then(() => {
          console.log("Contact removed successfully");
        });
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (err) {
    console.log(err);
  }
}

invokeAction(argv);
