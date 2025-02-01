export const projectABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_investToken',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: '_multiSigAddresses',
        type: 'address[]',
      },
      {
        internalType: 'uint256[2]',
        name: '_amountTarget',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256',
        name: '_amountForReturn',
        type: 'uint256',
      },
      {
        internalType: 'uint256[2]',
        name: '_fundingTime',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256',
        name: '_returnIntervalAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_returnIntervalDays',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_returnTermDays',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_allReturnFromDays',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_platformRate',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_platformRateWallet',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
    signature: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
    signature:
      '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
    ],
    name: 'ProjectReturnStarted',
    type: 'event',
    signature:
      '0xcb3b6f9505238c83f56e72f7c84d528945aa29d5207957b017fa073f4edecbde',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'TransactionCreated',
    type: 'event',
    signature:
      '0x20249019acac6e99959366f842671611cd943aa8071804678030725f38bc787e',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'TransactionExecuted',
    type: 'event',
    signature:
      '0x15ed165a284872ea7017f03df402a0cadfbfab588320ffaf83f160c2f82781c7',
  },
  {
    inputs: [],
    name: 'InvestToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xde27dd37',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
    ],
    name: '_initPaymentToOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xa76f8806',
  },
  {
    inputs: [],
    name: 'active',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x02fb0c5e',
  },
  {
    inputs: [],
    name: 'allReturnFromDays',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x7e4ad09b',
  },
  {
    inputs: [],
    name: 'amountForReturn',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x29029ce9',
  },
  {
    inputs: [],
    name: 'amountMaxTarget',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xe820f1f8',
  },
  {
    inputs: [],
    name: 'amountMinTarget',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x67b91b66',
  },
  {
    inputs: [],
    name: 'amountRaised',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x7b3e5e7b',
  },
  {
    inputs: [],
    name: 'amountReturned',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xdc24cfa6',
  },
  {
    inputs: [],
    name: 'countUsers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xf8fb1d0f',
  },
  {
    inputs: [],
    name: 'endFundingTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xe4693e98',
  },
  {
    inputs: [],
    name: 'investmentRoundClosed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xb6da389b',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'multiSigAddresses',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x81468d28',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x8da5cb5b',
  },
  {
    inputs: [],
    name: 'platformRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x36e0cac6',
  },
  {
    inputs: [],
    name: 'platformRateWallet',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x04ca4109',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x715018a6',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'returnCompleteTimes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x3b85e36e',
  },
  {
    inputs: [],
    name: 'returnIntervalAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x8be7c1ab',
  },
  {
    inputs: [],
    name: 'returnIntervalDays',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xfe9d5103',
  },
  {
    inputs: [],
    name: 'returnStartTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xb345e73f',
  },
  {
    inputs: [],
    name: 'returnTermDays',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xea88c9b4',
  },
  {
    inputs: [],
    name: 'startFundingTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xb75ece9c',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xf2fde38b',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userBalances',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x26224c64',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userIds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x4081db51',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'users',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x365b98b2',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'addFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xbe999705',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'getUserBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x47734892',
  },
  {
    inputs: [],
    name: 'returnFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x1eb5ea2e',
  },
  {
    inputs: [],
    name: 'getCountReturns',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x1512628b',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_n',
        type: 'uint256',
      },
    ],
    name: 'getReturnItem',
    outputs: [
      {
        internalType: 'uint256',
        name: 'time',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'completed',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x34f6da1f',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
    ],
    name: 'initPaymentToOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xedc9935b',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'createTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x1e7f8f0f',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_txId',
        type: 'uint256',
      },
    ],
    name: 'approveTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x242232d1',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_txId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'isApprovedTx',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xb2db5a29',
  },
  {
    inputs: [],
    name: 'getCountTransactions',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xa527aa6a',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_txId',
        type: 'uint256',
      },
    ],
    name: 'getTransaction',
    outputs: [
      {
        internalType: 'uint256',
        name: 'created_at',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'executed',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x33ea3dc8',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_txId',
        type: 'uint256',
      },
    ],
    name: 'approvePaymentToOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x68776858',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'addressIsMultisig',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xaafa2671',
  },
  {
    inputs: [],
    name: 'makeReturnForAllUsers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xbda353d0',
  },
  {
    inputs: [],
    name: 'makeReturnForAllUsersAllAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x210488ae',
  },
  {
    inputs: [],
    name: 'getNow',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xbbe4fd50',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_time',
        type: 'uint256',
      },
    ],
    name: 'setNow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xe380ae96',
  },
]
