# eip712-launchpad

#### This project is used to create, validate and sign a presale operation based on Ethereum.

## Functions
### 1. Presale Interface
   The structure where parameters for presale operations are defined. This structure includes the following fields:

* currency: The token to be used in the presale.
* presale_rate: The rate at which tokens will be sold during the presale.
* softcap: The minimum amount required for the presale to be considered successful.
* hardcap: The maximum amount that can be collected during the presale.
* min_buy: The minimum amount a participant can purchase during the presale.
* max_buy: The maximum amount a participant can purchase during the presale.
* liquidity_rate: The percentage of the collected funds that will be allocated to the liquidity pool.
* listing_rate: The rate at which tokens will be listed on the exchange after the presale.
* start_time: The start time of the presale.
* end_time: The end time of the presale.
* lock_end_time: The time when the lock on the collected funds will be released.
* is_vesting: Whether the tokens will be subject to vesting.
* is_lock: Whether the collected funds are locked.
* refund: Whether participants can request a refund if the softcap is not reached.
* auto_listing: Whether the token will be automatically listed on the exchange after the presale.
### 2. check_params()
   This function validates the given Presale instance. If all parameters are correct, it returns Null; otherwise, it returns the respective error.

### 3. calculate_amount()
   This function calculates the total token amount based on pre-established presale and listing rates.

### 4. get_token_info()
   This function checks the token amount owned by the given address. If the specified amount of balance and allowance are available, it returns Null; otherwise, it returns an error.

###5. sign()
   This function signs the given Presale instance and returns the result of the signature. If the signature is successful, it returns the string representation of the signature; otherwise, it returns an error message.

## Usage
You can control and sign a presale operation on Ethereum using this library. First, create a presale operation using the Presale structure, 
then validate the parameters using the check_params() function. Then, calculate necessary amounts and check the balance using the 
calculate_amount() and get_token_info() functions. Finally, you can sign the presale operation using the sign() function.

#### This repository handles the signing of EIP-721 transactions, generating signatures of a type that the contract located in the repository at https://github.com/guvenemirhan/ERC20-launchpad can validate.