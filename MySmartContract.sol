// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

contract SmartContractWithFrontendInteraction {

    address payable public walletAddress;
    uint256 public balance;

    event ShowAddress(address walletAddress);
    event Deposit(uint256 depositValue, uint256 balance);
    event Withdraw(uint256 withdrawValue, uint256 balance);
    event Redeem(uint256 amount); // Add the redeem event

    constructor(uint256 initialBalance) {
        balance = initialBalance;
        walletAddress = payable(msg.sender);
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function displayAddress() public payable {
        emit ShowAddress(walletAddress);
    }

    function deposit(uint256 depositValue) public payable {
        balance += depositValue;
        emit Deposit(depositValue, balance);
    }

    error InsufficientBalance(uint256 balance, uint withdrawAmount);

    function withdraw(uint256 withdrawValue) public payable {
        if(balance < withdrawValue){
            revert InsufficientBalance({
                balance : balance,
                withdrawAmount : withdrawValue
            });
        }
        balance -= withdrawValue;
        emit Withdraw(withdrawValue, balance);
    }

    function redeem() public {
        if (balance == 0) {
            revert InsufficientBalance(0, 0); // Redeem is not allowed when the balance is zero
        } else {
            uint256 redeemAmount = balance;
            balance = 0;
            emit Redeem(redeemAmount);
        }
    }
}
