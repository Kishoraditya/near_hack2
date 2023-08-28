use near_contract_standards::non_fungible_token::metadata::{
  NFTContractMetadata, NonFungibleTokenMetadataProvider, TokenMetadata, NFT_METADATA_SPEC,
};
use near_contract_standards::non_fungible_token::{NonFungibleToken, TokenId};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LazyOption;
use near_sdk::json_types::ValidAccountId;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, AccountId, Balance, Promise, ext_contract};

near_contract_standards::impl_non_fungible_token_core!(ProfileNFT, tokens);
near_contract_standards::impl_non_fungible_token_approval!(ProfileNFT, tokens);
near_contract_standards::impl_non_fungible_token_enumeration!(ProfileNFT, tokens);

const GAS_FOR_DISTRIBUTE: u64 = 10_000_000_000_000;

#[ext_contract(ext_self)]
trait ExtProfileNFT {
  fn distribute_revenue(&mut self, receiver_id: AccountId, amount: Balance);
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct ProfileNFT {
  tokens: NonFungibleToken,
  metadata: LazyOption<NFTContractMetadata>,
  // Add other fields here
}

impl ProfileNFT {
  #[init]
  pub fn new(metadata: NFTContractMetadata) -> Self {
      Self {
          tokens: NonFungibleToken::new(b"token".to_vec()),
          metadata: LazyOption::new("m".to_string(), Some(metadata)),
          // Initialize other fields here
      }
  }

  pub fn nft_mint(&mut self, token_metadata: TokenMetadata) -> TokenId {
      let token_id = self.tokens.mint(token_metadata);
      token_id
  }

  pub fn nft_transfer(&mut self, receiver_id: ValidAccountId, token_id: TokenId) {
      self.tokens
          .transfer_from(env::predecessor_account_id(), receiver_id.clone().into(), token_id);
  }

  pub fn buy_access(&mut self, token_id: TokenId, price: Balance) {
      let sender_id = env::predecessor_account_id();
      self.tokens
          .transfer_from(sender_id.clone(), sender_id.clone().into(), token_id);

      let refund_amount = price - 10_000_000_000_000_000_000_000_000; // Subtract fee
      Promise::new(sender_id.clone())
          .transfer(refund_amount)
          .then(ext_self::distribute_revenue(
              sender_id,
              10_000_000_000_000_000_000_000_000, // Fee to distribute
              &env::current_account_id(),
              0,
              GAS_FOR_DISTRIBUTE,
          ));
  }
}

#[ext_contract(ext_self)]
trait ExtProfileNFT {
    fn distribute_revenue(&mut self, receiver_id: AccountId, amount: Balance);
    fn grant_temp_access(&mut self, applicant: AccountId);
}

#[near_bindgen]
impl ExtProfileNFT for ProfileNFT {
    fn distribute_revenue(&mut self, receiver_id: AccountId, amount: Balance) {
        let user_share = amount * 60 / 100; // 60% to the user
        let protocol_share = amount - user_share; // 40% to the protocol

        Promise::new(receiver_id.clone()).transfer(user_share);
        Promise::new(env::current_account_id()).transfer(protocol_share);

        // You can add additional logic or state updates here if needed
    }
    fn grant_temp_access(&mut self, applicant: AccountId) {
      // Here you can implement the logic to grant temporary access to the
      // applicant's private profile. For simplicity, let's just print a message.
      env::log(format!("Granted temporary access to {}", applicant).as_bytes());
  }
}
