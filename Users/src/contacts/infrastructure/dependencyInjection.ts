import { pool } from "../../_config/db.config";

import { SaveContact } from "../application/use-cases/SaveContact";
import { FindAllContacts } from "../application/use-cases/FindAllContacts";
import { FindContactById } from "../application/use-cases/FindContactById";
import { FindContactByEmail } from "../application/use-cases/FindContactByEmail";
import { DeleteContactById } from "../application/use-cases/DeleteContactById";

import { SaveContactController } from "./controllers/saveContactController";
import { FindAllContactsController } from "./controllers/findAllContactsController";
import { FindContactByIdController } from "./controllers/findContactByIdController";
import { FindContactByEmailController } from "./controllers/findContactByEmailController";
import { DeleteContactByIdController } from "./controllers/deleteContactByIdController";

import { PostgresContactRepository } from "./persistence/PostgresContactRepository";

import { rabbitmqEventPublisher } from "../../_shared/infrastructure/eventPublishers/rabbitmqEventPublisher";

const contactRepository = new PostgresContactRepository(pool);

const findContactById = new FindContactById(contactRepository);
const findContactByEmail = new FindContactByEmail(contactRepository);
const deleteContactById = new DeleteContactById(contactRepository);
const saveContact = new SaveContact(contactRepository, rabbitmqEventPublisher);
const findAllContacts = new FindAllContacts(contactRepository);

const saveContactController = new SaveContactController(saveContact);
const findAllContactsController = new FindAllContactsController(
  findAllContacts
);
const findContactByIdController = new FindContactByIdController(
  findContactById
);
const findContactByEmailController = new FindContactByEmailController(
  findContactByEmail
);
const deleteContactByIdController = new DeleteContactByIdController(
  deleteContactById
);

export {
  contactRepository,
  saveContactController,
  findAllContactsController,
  findContactByIdController,
  findContactByEmailController,
  deleteContactByIdController,
};
