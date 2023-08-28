// Import necessary modules here
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap};
use near_sdk::{env, near_bindgen, AccountId, Balance};

mod user_registry;
mod user_profile;
mod jobs_market;
mod profile_nft;
mod revenue;

use user_registry::{UserRegistry, UserInfo};
use user_profile::{UserProfile, Profile};
use jobs_market::{JobsMarket, JobPost};
use profile_nft::{ProfileNFT, TokenId};
use revenue::{RevenueSplitter, NFTPurchase};

use crate::revenue::{distribute_revenue, record_revenue};

#[near_bindgen]
pub struct Contract {
    user_registry: UserRegistry,
    user_profile: UserProfile,
    jobs_market: JobsMarket,
    profile_nft: ProfileNFT,
    revenue_splitter: RevenueSplitter,
}

impl Contract {
    #[init]
    pub fn new() -> Self {
        Self {
            user_registry: UserRegistry::default(),
            user_profile: UserProfile::default(),
            jobs_market: JobsMarket::default(),
            profile_nft: ProfileNFT::default(),
            revenue_splitter: RevenueSplitter::default(),
        }
    }

    pub fn signup_user(&mut self) {
        self.user_registry.register_user();
    }

    pub fn login_user(&self) -> Option<UserInfo> {
        self.user_registry.login()
    }

    pub fn create_profile(&mut self, profile: Profile) {
        self.user_profile.create_profile(profile);
    }

    pub fn get_profile(&self, account_id: AccountId) -> Option<Profile> {
        self.user_profile.get_profile(account_id)
    }

    pub fn post_new_job(&mut self, job: JobPost) {
        self.jobs_market.post_job(job);
    }

    pub fn apply_to_job(&mut self, job_id: u64, nft: AccountId) {
        self.jobs_market.apply_to_job(job_id, nft);
    }

    pub fn buy_access(&mut self, token_id: TokenId) {
        let purchase = self.profile_nft.buy_access(token_id);
        record_revenue();
        distribute_revenue(100)
        //self.revenue_splitter.record_revenue(purchase);
        //self.revenue_splitter.distribute();
    }
}
