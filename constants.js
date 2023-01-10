export const QUICKNODE_HTTP_URL =
  'https://delicate-cool-firefly.matic-testnet.discover.quiknode.pro/dbcca083d8775dc1f2dd9540c63768d0f55a6f68/'
export const SMART_CONTRACT_ADDRESS =
  '0xF249b348eB89084078CDfb02168974D21599B2aD'
export const OWNER_ADDRESS = '0xc8A81E39a7c656Be15FA062e5D57daD60304fE0D'

export const SMART_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
    ],
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
        name: 'title',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'hash',
        type: 'string',
      },
    ],
    name: 'PostCreated',
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
        name: 'title',
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
    name: 'PostUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'hash',
        type: 'string',
      },
    ],
    name: 'createPost',
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
    name: 'fetchPost',
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
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'content',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'published',
            type: 'bool',
          },
        ],
        internalType: 'struct Blog.Post',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fetchPosts',
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
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'content',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'published',
            type: 'bool',
          },
        ],
        internalType: 'struct Blog.Post[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
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
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
    ],
    name: 'updateName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'title',
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
    name: 'updatePost',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
