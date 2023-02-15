export const QUICKNODE_HTTP_URL =
  'https://delicate-cool-firefly.matic-testnet.discover.quiknode.pro/dbcca083d8775dc1f2dd9540c63768d0f55a6f68/'
export const SMART_CONTRACT_ADDRESS =
  '0xc68C6b31fB76D75BAaBDA03Cb86eE9D9c12B652A'
export const OWNER_ADDRESS = '0xc8A81E39a7c656Be15FA062e5D57daD60304fE0D'

export const SMART_CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'header',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'hash',
        type: 'string',
      },
    ],
    name: 'ArticleCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'ArticleDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'header',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'hash',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'published',
        type: 'bool',
      },
    ],
    name: 'ArticleUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'ArticlesDeleted',
    type: 'event',
  },
  {
    inputs: [],
    name: '_paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'header',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'hash',
        type: 'string',
      },
    ],
    name: 'createArticle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'articleId',
        type: 'uint256',
      },
    ],
    name: 'deleteArticle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'editor',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'articleId',
        type: 'uint256',
      },
    ],
    name: 'emergencyDeleteArticle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'hash',
        type: 'string',
      },
    ],
    name: 'fetchArticle',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'header',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'body',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'published',
            type: 'bool',
          },
        ],
        internalType: 'struct Clicq.Article',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fetchArticles',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'header',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'body',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'published',
            type: 'bool',
          },
        ],
        internalType: 'struct Clicq.Article[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'emergency',
        type: 'bool',
      },
    ],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'articleId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'header',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'hash',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'published',
        type: 'bool',
      },
    ],
    name: 'updateArticle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
