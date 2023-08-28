use near_sdk::{AccountId, env, testing_env, MockedBlockchain};
use near_sdk::test_utils::{accounts, VMContextBuilder};
use crate::*;

// Deploy the contracts
fn deploy_contract() -> Contract {
    let context = VMContextBuilder::new()
        .current_account_id(accounts(0))
        .finish();
    testing_env!(context.build());
    Contract::default()
}

#[test]
fn test_register_user() {
    let mut contract = deploy_contract();
    testing_env!(context_with_account_id(accounts(1)));
    
    contract.signup_user();
    let registered_user = contract.login_user();
    assert!(registered_user.is_some());
}

#[test]
fn test_create_and_get_profile() {
    let mut contract = deploy_contract();
    testing_env!(context_with_account_id(accounts(1)));

    let profile = Profile {
        name: "John Doe".to_string(),
        username: "johndoe".to_string(),
        email: "john@example.com".to_string(),
        skills: vec!["React".to_string(), "JavaScript".to_string()],
        experience: vec![
            WorkEntry {
                company: "Acme Corp".to_string(),
                role: "Software Engineer".to_string(),
                year: 2022,
            }
        ],
        // Add other profile fields
    };

    contract.create_profile(profile.clone());

    let fetched_profile = contract.get_profile(accounts(1));
    assert_eq!(fetched_profile, Some(profile));
}

#[test]
fn test_post_and_apply_to_job() {
    let mut contract = deploy_contract();
    testing_env!(context_with_account_id(accounts(1)));
    
    let job_post = JobPost {
        title: "Frontend Developer".to_string(),
        description: "Exciting opportunity for a frontend developer!".to_string(),
        location: "Remote".to_string(),
        // Add other job details
    };

    contract.post_new_job(job_post.clone());

    testing_env!(context_with_account_id(accounts(2)));
    contract.apply_to_job(1, accounts(1));

    let job_application = contract.get_job_application(1, accounts(1));
    assert!(job_application.is_some());
}

#[test]
fn test_buy_access() {
    let mut contract = deploy_contract();
    testing_env!(context_with_account_id(accounts(1)));

    // Mint an NFT and list it for sale
    let token_id = contract.nft_mint(TokenMetadata {
        title: "My NFT".to_string(),
        owner_id: accounts(1),
        // Add other token metadata
    });
    contract.nft_list_for_sale(token_id.clone(), U128::from(10));

    testing_env!(context_with_account_id(accounts(2)));
    let purchase = contract.buy_access(token_id.clone(), U128::from(10));
    
    assert_eq!(purchase.owner_id, accounts(2));
    assert_eq!(purchase.seller_id, accounts(1));
    // Add more assertions
}

// Helper function to set context with a specific account ID
fn context_with_account_id(account_id: AccountId) -> VMContextBuilder<MockedBlockchain> {
    VMContextBuilder::new()
        .current_account_id(account_id)
        .predecessor_account_id(account_id)
}
