import Dexie from 'dexie';
import { getCurrentDateTime, getJSONdata } from '../utils/functions';

// Define an interface for the Dexie database
interface VetDB extends Dexie {
  docData: Dexie.Table<any>;
  preference: Dexie.Table<any>;
}

// Create a new Dexie database
const db = new Dexie('vetDB') as VetDB;

// Define a table for documents
db.version(3).stores({
  docData: '++id,title,transcript,isFileUsed,note,summary,date,duration,email',
  preference:'++id,email,settings'
});

// Open the database asynchronously
async function openDatabase() {
  try {
    await db.open();
    //console.log('Database opened successfully');
  } catch (err) {
    console.error('Error opening database: ', err);
  }
}

// Call the openDatabase function to open the database

// Define the transcript data interface
interface TranscriptData {
  title: string;
  transcript: string;
  isFileUsed: string;
  note: string;
  summary: string;
  date: string;
}

// Define the insertTranscript function with async
export async function insertTranscriptDB(
  title: string,
  transcript: string,
  isFileUsed: string,
  note: string,
  summary: string,
  date: string
): Promise<void> {
  // Create a new instance of the TranscriptData interface
  await openDatabase();
  const transcriptData: TranscriptData = {
    title,
    transcript,
    isFileUsed,
    note,
    summary,
    date,
  };

  try {
    // Use the Dexie 'docData' table to add the transcript data asynchronously
    const id = await db.docData.add(transcriptData);
    //console.log(`Transcript with ID ${id} inserted successfully!`);

  } catch (error) {
    //console.error('Error inserting transcript: ', error);
    throw error; // Rethrow the error for the caller to handle if needed
  }
}

export async function createNewEncounterDB()
  {
    // Create a new instance of the TranscriptData interface
    const userData= await getJSONdata("profile")
    await openDatabase();
    const tr = {
      title:"Encounter",
      date:getCurrentDateTime(),
      email:userData.email
    };
  
    try {
      // Use the Dexie 'docData' table to add the transcript data asynchronously
      const id = await db.docData.add(tr);
      return id;
  
    } catch (error) {
      //console.error('Error inserting transcript: ', error);
      throw error; // Rethrow the error for the caller to handle if needed
    }
  }

  export async function getAllEncouterDB(): Promise<any[]> {
    try {
        await openDatabase();
        const userData= await getJSONdata("profile")
      // Use the Dexie 'docData' table to retrieve all encounters asynchronously
      const encounters = await db.docData.where({email:userData.email}).toArray();
      return encounters;
    } catch (error) {
      //console.error('Error retrieving encounters: ', error);
      throw error; // Rethrow the error for the caller to handle if needed
    }
  }
  
  export async function getEncouterDB(id: any): Promise<any | null> {
    try {
        await openDatabase();
      // Use the Dexie 'docData' table to retrieve a specific encounter by ID asynchronously
      const encounter = await db.docData.get(id);
      return encounter || null; // Return null if the encounter is not found
    } catch (error) {
      //console.error(`Error retrieving encounter with ID ${id}: `, error);
      throw error; // Rethrow the error for the caller to handle if needed
    }
  }

  export async function updateEncounterDB(id: any, field: string, value: any): Promise<void> {
    try {
      await openDatabase();
  
      // Ensure the field is a valid property of the TranscriptData interface
      const validFields: any = ['title', 'transcript', 'isFileUsed', 'note', 'summary', 'date'];
  
      if (!validFields.includes(field)) {
        //console.error('Invalid field for update:', field);
        throw new Error('Invalid field for update');
      }
  
      // Use the Dexie 'docData' table to update the specified field asynchronously
      await db.docData.update(id, { [field]: value });
  
      //console.log(`Encounter with ID ${id} updated successfully!`);
  
    } catch (error) {
      //console.error(`Error updating encounter with ID ${id}: `, error);
      throw error; // Rethrow the error for the caller to handle if needed
    }
  }

  export async function deleteEncounterDB(id: any): Promise<void> {
    try {
      await openDatabase();
  
      // Use the Dexie 'docData' table to delete the specified encounter by ID asynchronously
      const deleteCount = await db.docData.where({ id }).delete();
  
      if (deleteCount > 0) {
        //console.log(`Encounter with ID ${id} deleted successfully!`);
      } else {
        //console.log(`No encounter found with ID ${id}. Nothing deleted.`);
      }
    } catch (error) {
      //console.error(`Error deleting encounter with ID ${id}: `, error);
      throw error; // Rethrow the error for the caller to handle if needed
    }
  }

  export async function createDefaultPreference(): Promise<void> {
    try {
      
      await openDatabase();
      const userData= await getJSONdata("profile");
  
      // Check if a preference already exists for the given email
      const existingPreference = await db.preference.where({ email:userData.email }).first();
  
      if (!existingPreference) {
        // If no preference exists, create a default preference for the user
        const defaultPreference = {
          email:userData.email,
          settings: {
            pronoun: "",
            template: "SOAP",
            style: "AUTO",
            customInstruction: "",
          },
        };
  
        // Use the Dexie 'preference' table to add the default preference asynchronously
        await db.preference.add(defaultPreference);
  
       // console.log(`Default preference created for email: ${userData.email}`);
      } else {
       // console.log(`Preference already exists for email: ${userData.email}. Skipping creation.`);
      }
    } catch (error) {
      console.error('Error creating default preference: ', error);
      throw error; // Rethrow the error for the caller to handle if needed
    }
  }
  
  export async function editPreference(set: any): Promise<void> {
    try {
      await openDatabase();
      const userData= await getJSONdata("profile");
      // Check if a preference exists for the given email
      const existingPreference = await db.preference.where({ email:userData.email }).first();
  
      if (existingPreference) {
        // If preference exists, update the settings
        await db.preference.update(existingPreference.id, {settings:{
          template:set.template || existingPreference.settings.template,
          style:set.style || existingPreference.settings.style,
          customInstruction:set.customInstruction || existingPreference.settings.customInstruction,
          pronoun:set.pronoun || existingPreference.settings.pronoun,
        }});
  
        //console.log(`Preference updated for email: ${userData.email}`);
      } else {
        //console.log(`No preference found for email: ${userData.email}. Cannot update.`);
      }
    } catch (error) {
      console.error(`Error editing preference for email : `, error);
      throw error; // Rethrow the error for the caller to handle if needed
    }
  }

  export async function getPreference(): Promise<any | null> {
    try {
      await openDatabase();
      const userData = await getJSONdata("profile");
  
      // Use the Dexie 'preference' table to retrieve the preference for the user's email asynchronously
      const preference = await db.preference.where({ email: userData.email }).first();
      
      return preference || null; // Return null if no preference is found
    } catch (error) {
      console.error(`Error retrieving preference: `, error);
      throw error; // Rethrow the error for the caller to handle if needed
    }
  }