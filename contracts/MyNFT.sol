// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MyNFT is ERC721URIStorage, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(ADMIN_ROLE, admin);
    }

    function mint(
        address to,
        uint256 tokenId,
        string memory TOKEN_URI
    ) public onlyRole(ADMIN_ROLE) {
       
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, TOKEN_URI);
    }

    function burn(uint256 burnTokenId) public onlyRole(ADMIN_ROLE) {
        _burn(burnTokenId);
    }

    function supportsInterface(bytes4 _interfaceId)
        public
        view
        virtual
        override(ERC721, AccessControl)
        returns (bool)
    {
        return
            _interfaceId == type(IERC721).interfaceId ||
            super.supportsInterface(_interfaceId);
    }
}
