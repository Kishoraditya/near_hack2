use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId};
use near_sdk::collections::LookupMap;

// Import the correct Ceramic SDK crate
// Make sure to update this import to match the actual Ceramic SDK crate
// For example: use ceramic_sdk::Client;
use ceramic_sdk::Client;

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct UserRegistry {
    records: LookupMap<AccountId, UserInfo>,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct UserInfo {
    ceramic_id: String,
}

#[near_bindgen]
impl UserRegistry {
    pub fn register_user(&mut self) -> Result<(), String> {
        let account_id = env::signer_account_id();

        // Initialize the Ceramic client (adjust the URL as needed)
        let ceramic = Client::new("https://ceramic.network");

        // Handle potential errors during document creation
        let ceramic_id = match ceramic.create_document(&account_id) {
            Ok(ceramic_id) => ceramic_id,
            Err(err) => return Err(format!("Failed to create Ceramic document: {}", err)),
        };

        let user_info = UserInfo {
            ceramic_id,
        };

        self.records.insert(&account_id, &user_info);
        Ok(())
    }

    pub fn login(&self) -> Result<Option<UserInfo>, String> {
        let account_id = env::signer_account_id();
        match self.records.get(&account_id) {
            Some(user_info) => Ok(Some(user_info)),
            None => Ok(None),
        }
    }
}
