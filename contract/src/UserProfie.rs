use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId, collections::LookupMap}; // Added missing import for LookupMap

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct UserProfile {
    records: LookupMap<AccountId, Profile>,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct Profile {
    pub name: String,
    pub username: String,
    pub email: String,
    pub skills: Vec<String>,
    pub experience: Vec<WorkEntry>,
    priv_contact: String,
    priv_id_docs: Vec<IDDoc>,
}

// Define WorkEntry and IDDoc structs here
#[derive(BorshSerialize, BorshDeserialize)]
pub struct WorkEntry {
    // Define fields for WorkEntry
    pub job_title: String,
    pub company: String,
    pub start_date: String,
    pub end_date: Option<String>, // Optional end date
    // Add more fields as needed
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct IDDoc {
    // Define fields for IDDoc
    pub document_type: String,
    pub document_number: String,
    // Add more fields as needed
}

#[near_bindgen]
impl UserProfile {
    pub fn create_profile(&mut self, profile: Profile) {
        let account_id = env::signer_account_id();
        self.records.insert(&account_id, &profile);
    }

    pub fn get_profile(&self, account_id: AccountId) -> Option<Profile> {
        return self.records.get(&account_id);
    }
}
