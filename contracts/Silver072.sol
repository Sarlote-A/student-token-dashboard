// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// Silver072 (SLV072) — common reward token
contract Silver072 is ERC20 {
    constructor() ERC20("Silver072", "SLV072") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}
