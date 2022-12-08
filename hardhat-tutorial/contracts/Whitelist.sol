//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Whitelist is Ownable {

    uint32 private constant _ENFP_ORDER = 0;
    uint32 private constant _INTJ_ORDER = 1;
    uint32 private constant _ENFJ_ORDER = 2;
    uint32 private constant _ISTJ_ORDER = 3;
    uint32 private constant _ESTJ_ORDER = 4;
    uint32 private constant _ISFJ_ORDER = 5;
    uint32 private constant _ENTP_ORDER = 6;
    uint32 private constant _ISTP_ORDER = 7;
    uint32 private constant _ESTP_ORDER = 8;
    uint32 private constant _ENTJ_ORDER = 9;
    uint32 private constant _ISFP_ORDER = 10;
    uint32 private constant _ESFP_ORDER = 11;
    uint32 private constant _INFJ_ORDER = 12;
    uint32 private constant _INFP_ORDER = 13;
    uint32 private constant _ESFJ_ORDER = 14;
    uint32 private constant _INTP_ORDER = 15;

    // Max number of whitelisted addresses allowed
    uint32 private maxWhitelistedAddresses;

    // Create a mapping of whitelistedAddresses
    // if an address is whitelisted, we would set it to true, it is false my default for all other addresses.
    // mapping(address => bool) public whitelistedAddresses;
    mapping(address => bool)[16] public whitelistedAddressMaps;

    // numAddressesWhitelisted would be used to keep track of how many addresses have been whitelisted
    // uint256 public numAddressesWhitelisted;
    uint32[16] private numAddressWhitelistedList;

    constructor(uint32 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses =  _maxWhitelistedAddresses;
    }

    /**
        addAddressToWhitelist - This function adds the address of the sender to the
        whitelist
     */
    // function addAddressToWhitelist() public {
    //     // check if the user has already been whitelisted
    //     require(!whitelistedAddresses[msg.sender], "Sender has already been whitelisted");
    //     // check if the numAddressesWhitelisted < maxWhitelistedAddresses, if not then throw an error.
    //     require(numAddressesWhitelisted < maxWhitelistedAddresses, "More addresses cant be added, limit reached");
    //     // Add the address which called the function to the whitelistedAddress array
    //     whitelistedAddresses[msg.sender] = true;
    //     // Increase the number of whitelisted addresses
    //     numAddressesWhitelisted += 1;
    // }

    function getMaxWhitelistedAddresses() public view returns (uint32) {
        return maxWhitelistedAddresses;
    }

    function getAllMaxWhitelistedAddresses() public view returns (uint32) {
        return maxWhitelistedAddresses * 16;
    }

    function setMaxWhitelistedAdderesses(uint32 value) public onlyOwner {
        maxWhitelistedAddresses = value;
    }

    function getNumAddressesWhitelisted(uint32 mbtiOrder) public view returns (uint32) {
        return numAddressWhitelistedList[mbtiOrder];
    }

    function getAllNumAddressesWhitelisted() public view returns (uint32) {
        uint32 count = 0;
        for (uint256 i=0; i<16; i++) {
            count += numAddressWhitelistedList[i];
        }
        return count;
    }

    function addAddressToWhitelist(uint32 mbtiOrder, address targetAddress) public onlyOwner {
        require(!whitelistedAddressMaps[mbtiOrder][targetAddress], "Target address has already been whitelisted." );
        require(numAddressWhitelistedList[mbtiOrder] < maxWhitelistedAddresses, "More addresses cant be added, limit reached");
        whitelistedAddressMaps[mbtiOrder][targetAddress] = true;
        numAddressWhitelistedList[mbtiOrder] += 1;
    }

    function removeAddressFromWhitelist(uint32 mbtiOrder, address targetAddress) public onlyOwner {
        require(whitelistedAddressMaps[mbtiOrder][targetAddress], "Target address has already been removed from the whitelist.");
        whitelistedAddressMaps[mbtiOrder][targetAddress] = false;
        numAddressWhitelistedList[mbtiOrder] -= 1;
    }

    function containsAddressToWhitelist(uint32 mbtiOrder, address targetAddress) public view returns (bool) {
        return whitelistedAddressMaps[mbtiOrder][targetAddress];
    }

    function addMyAddressToWhitelist(uint32 mbtiOrder) public {
        require(!whitelistedAddressMaps[mbtiOrder][msg.sender], "Sender address has already been whitelisted.");
        require(numAddressWhitelistedList[mbtiOrder] < maxWhitelistedAddresses, "More addressses cant be added, limit reached.");
        whitelistedAddressMaps[mbtiOrder][msg.sender] = true;
        numAddressWhitelistedList[mbtiOrder] += 1;
    }

    function removeMyAddressFromWhitelist(uint32 mbtiOrder) public {
        require(whitelistedAddressMaps[mbtiOrder][msg.sender], "Sender address has already been removed from the whitelist.");
        whitelistedAddressMaps[mbtiOrder][msg.sender] = false;
        numAddressWhitelistedList[mbtiOrder] -= 1;
    }

    function containsMyAddressToWhitelist(uint32 mbtiOrder) public view returns (bool) {
        return whitelistedAddressMaps[mbtiOrder][msg.sender];
    }
}