import { Client, Databases, Account} from 'appwrite';

export const PROJECT_ID='668e90e0002859392c3f'
export const DATABASE_ID='668e98e4003cf9214b68'
export const COLLECTION_ID_MESSAGE='668e98fa002ed17acb96'

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('668e90e0002859392c3f');

export const databases = new Databases(client);
export const account = new Account(client);
export default client;
