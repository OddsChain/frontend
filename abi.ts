export const ODDS_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_gateway",
        type: "address",
      },
      {
        internalType: "address",
        name: "_gasReceiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_oddsTokenAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_destinationAddress",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_estimatedCrossChainGasAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "NotApprovedByGateway",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "betID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "winnings",
        type: "uint256",
      },
    ],
    name: "BetWinnings_Claimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "betID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "choice",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "validator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betEndTime",
        type: "uint256",
      },
    ],
    name: "Bet_Accepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "betID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "choice",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "validator",
        type: "address",
      },
    ],
    name: "Bet_Denied",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "betID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "participants",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "yesPool",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "noPool",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalPool",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "yesParticipants",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "noParticipants",
        type: "uint256",
      },
    ],
    name: "Bet_Joined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "betID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refundAmount",
        type: "uint256",
      },
    ],
    name: "Bet_Refunded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "betID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "outcome",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "validator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "claimWaitTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "validationCount",
        type: "uint256",
      },
    ],
    name: "Bet_Validated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "betID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "betType",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betEndTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "validators",
        type: "address[]",
      },
    ],
    name: "SingleBet_Created",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "reportOutcome",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betID",
        type: "uint256",
      },
    ],
    name: "ValidatorReportDecided",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "betID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "betType",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "randomNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "validator",
        type: "address",
      },
    ],
    name: "Validator_Assigned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "validator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "validatorId",
        type: "uint256",
      },
    ],
    name: "Validator_Joined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "reporter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "validator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "voteTime",
        type: "uint256",
      },
    ],
    name: "Validator_Reported",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "choice",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "support",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oppose",
        type: "uint256",
      },
    ],
    name: "supportValidator",
    type: "event",
  },
  {
    inputs: [],
    name: "CLAIM_WINNING_WAIT_TIME",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VALIDATOR_STAKE_AMOUNT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VALIDATOR_VOTE_TIME",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_canValidate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_hasValidated",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_hasVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_isValidator",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_refundClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_singleBetClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_singleBetDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "betID",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "bool",
        name: "betType",
        type: "bool",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "betEndTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "outcome",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "accepted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "validationCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimWaitTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "toBeSetTime",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "yesPool",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "noPool",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalPool",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "yesPartcipants",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "noParticipants",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "yesOutcomeCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "noOutcomeCount",
            type: "uint256",
          },
        ],
        internalType: "struct Odds.BetStatistics",
        name: "betStatistics",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "reporter",
            type: "address",
          },
          {
            internalType: "address",
            name: "maliciousValidator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "betId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "bool",
            name: "currentlyChallenged",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "voteTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "support",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "oppose",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reportOutcome",
            type: "uint256",
          },
        ],
        internalType: "struct Odds.Report",
        name: "betReport",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_userBetAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_userBetChoice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_userDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "totalWinnings",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalBetsParticipated",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_userParticipation",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_validators",
    outputs: [
      {
        internalType: "uint256",
        name: "validatorId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "validator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "betsRejected",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "betsAccepted",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "betsValidated",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalReports",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betID",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_choice",
        type: "bool",
      },
    ],
    name: "acceptOrDenyBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betID",
        type: "uint256",
      },
    ],
    name: "claimBetRefund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betID",
        type: "uint256",
      },
    ],
    name: "claimSingleBetWinnings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "bool",
            name: "betType",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "betEndTime",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "validators",
            type: "address[]",
          },
        ],
        internalType: "struct DataTypes.CreateSingleBetParams",
        name: "_createSingleBetParams",
        type: "tuple",
      },
    ],
    name: "createSingleBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "deployer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "destinationAddress",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "destinationChain",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "estimatedCrossChainGasAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commandId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "sourceChain",
        type: "string",
      },
      {
        internalType: "string",
        name: "sourceAddress",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commandId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "sourceChain",
        type: "string",
      },
      {
        internalType: "string",
        name: "sourceAddress",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "payload",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "tokenSymbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "executeWithToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "fundAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "gasService",
    outputs: [
      {
        internalType: "contract IAxelarGasService",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gateway",
    outputs: [
      {
        internalType: "contract IAxelarGateway",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentTimeStamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getIsValidator",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getIsWinner",
    outputs: [
      {
        internalType: "bool",
        name: "isWinner",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRequiredNumberOfValidators",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserDetails",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "totalWinnings",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalBetsParticipated",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
        ],
        internalType: "struct Odds.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserOddsBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_betID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_choice",
        type: "uint256",
      },
    ],
    name: "getUserPossibleRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "usersShareInRewardPool",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_betID",
        type: "uint256",
      },
    ],
    name: "getUserStakeAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserWinnings",
    outputs: [
      {
        internalType: "uint256",
        name: "userWinnings",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betID",
        type: "uint256",
      },
    ],
    name: "hasVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_choice",
        type: "bool",
      },
    ],
    name: "joinSingleBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "joinValidators",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "oddsTokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betID",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
    ],
    name: "reportValidator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "singleBetIDCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_destinationAddress",
        type: "string",
      },
    ],
    name: "updateDestinationAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_outcome",
        type: "uint256",
      },
    ],
    name: "validateBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "validators",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betID",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_choice",
        type: "bool",
      },
    ],
    name: "voteValidator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAllFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawFromAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

export const ODDS_TOKEN_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mintFree",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
