// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PredictionGame {
    address public agentOracle; // devnads AI ajanının cüzdan adresi
    uint256 public endTime;
    uint256 public targetPrice;
    bool public isResolved;

    struct Prediction {
        uint256 predictedPrice;
        uint256 wagerAmount;
        bool claimed;
    }

    mapping(address => Prediction) public predictions;
    address[] public players;

    event PredictionSubmitted(address indexed player, uint256 price, uint256 amount);
    event GameResolved(uint256 targetPrice, address winner);

    constructor(address _agentOracle, uint256 _durationMinutes) {
        agentOracle = _agentOracle;
        endTime = block.timestamp + (_durationMinutes * 1 minutes);
    }

    function submitPrediction(uint256 _price) external payable {
        require(block.timestamp < endTime, "Tahmin suresi doldu");
        require(msg.value > 0, "Bakiye gondermelisin");

        predictions[msg.sender] = Prediction({
            predictedPrice: _price,
            wagerAmount: msg.value,
            claimed: false
        });
        players.push(msg.sender);

        emit PredictionSubmitted(msg.sender, _price, msg.value);
    }

    // AI Ajanının fiyatı girip oyunu sonuçlandırdığı fonksiyon
    function resolve(uint256 _actualPrice) external {
        require(msg.sender == agentOracle, "Sadece yapay zeka ajani cozebilir");
        require(block.timestamp >= endTime, "Oyun henuz bitmedi");
        require(!isResolved, "Oyun zaten cozuldu");

        targetPrice = _actualPrice;
        isResolved = true;

        address winner = address(0);
        uint256 minDifference = type(uint256).max;

        // En yakın tahmini yapan oyuncuyu bulma matematiği
        for (uint256 i = 0; i < players.length; i++) {
            address player = players[i];
            uint256 predicted = predictions[player].predictedPrice;
            
            uint256 diff = predicted > _actualPrice ? predicted - _actualPrice : _actualPrice - predicted;

            if (diff < minDifference) {
                minDifference = diff;
                winner = player;
            }
        }

        emit GameResolved(_actualPrice, winner);
    }

    // Kazananın ödülü çekmesi için fonksiyon
    function claimReward() external {
        require(isResolved, "Oyun henuz cozulmedi");
        Prediction storage userPred = predictions[msg.sender];
        require(!userPred.claimed, "Odul zaten alindi");

        // Basit mantıkla tüm havuzu kazanan oyuncuya aktarıyoruz
        // İleride buraya kademeli lig puanı eklenebilir
        userPred.claimed = true;
        
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success, "Transfer basarisiz");
    }
}