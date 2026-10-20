// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// Gold072 (GLD072) — BIS coursework token
contract Gold072 is ERC20 {
    constructor() ERC20("Gold072", "GLD072") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}
