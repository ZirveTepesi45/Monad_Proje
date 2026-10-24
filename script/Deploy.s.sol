// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/PredictionGame.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();
        
        // Cüzdan adresin ve süre (5 dakika)
        address agentOracle = 0x268933D88AE628208cf4934F2cb1E1f128e13bE1;
        uint256 duration = 0;

        new PredictionGame(agentOracle, duration);

        vm.stopBroadcast();
    }
}