// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PortToken is Ownable, ERC20Capped, ERC20Burnable {
    constructor() public ERC20("Portus", "PORT") ERC20Capped(100000000 * (10**uint256(18))) {
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /// @notice The OpenZeppelin renounceOwnership() implementation is
    /// overriden to prevent ownership from being renounced accidentally.
    function renounceOwnership() public override onlyOwner {
        revert("Ownership cannot be renounced");
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override(ERC20, ERC20Capped) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
