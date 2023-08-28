use crate::profile_nft::{NFTContract, NFTPurchase};
use near_sdk::{env, near_bindgen, Balance};
use near_sdk::json_types::U128;

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct RevenueSplitter {
    user_percentage: u8, // Percentage for users (e.g., 60%)
    protocol_percentage: u8, // Percentage for protocol (e.g., 40%)
}

#[near_bindgen]
impl RevenueSplitter {

    pub fn set_percentages(&mut self, user_percent: u8, protocol_percent: u8) {
        assert!(user_percent + protocol_percent == 100, "Percentages must sum up to 100");
        self.user_percentage = user_percent;
        self.protocol_percentage = protocol_percent;
    }

    pub fn record_revenue(&mut self, purchase: NFTPurchase) {
        // Log purchase details
        env::log(format!("Purchase recorded: {:?}", purchase).as_bytes());
    }

    pub fn distribute(&mut self, total_revenue: U128) {
        let user_share = (total_revenue * self.user_percentage as Balance) / 100;
        let protocol_share = total_revenue - user_share;

        // Implement logic to distribute revenue to users and protocol
        // For simplicity, let's just print messages
        env::log(format!("Distributed {} to users", user_share).as_bytes());
        env::log(format!("Distributed {} to protocol", protocol_share).as_bytes());
    }
}
