### Project Title

# CLICQ

A fullstack decentralized blog built with Next.js, Polygon, Solidity, IPFS, and Hardhat.

### Project Description

CLICQ is a decentralized blog that allows users to create, edit, and update posts only if they are the owner of the contract (this can be manipulated to a specific number of authorized wallet addresses from the fron-end). The blog utilizes blockchain technology and smart contracts to ensure the security and integrity of the content on the platform. Additionally, the blog is built with modern technologies such as Next.js, Polygon, and IPFS, making it fast and efficient.

### Project Snapshot

![HomePage view](https://media.licdn.com/dms/image/D4D2CAQHtA-RYTB8tiw/comment-image-shrink_8192_1280/0/1674243142221?e=1674849600&v=beta&t=FAafD6VR4BchMuM5YoFs1FF4ZSgFF9Nsp7D-oi15I4M)

### Project Website Link

[Click here to view the blog live.](https://clicq-web3-magazine.vercel.app/)

### Project Author

- Ezeanekwe Chidozie Zeno
- [Portofolio Website](https://chidozietech.netlify.app/)
- [GitHub Repo](https://github.com/zenodavids)

### How to Install and Run the Project

- Clone the repository:

```s
git clone https://github.com/zenodavids/CLICQ-WEB3-MAGAZINE.git
```

- Install dependencies:

```s
npm install
```

- Run the development environment:

```s
npx hardhat
```

- Create a **.env** file in the root directory and supply the following information:

```js
// to interact your posts
INFURA_API_KEY_ = ''
INFURA_API_KEY_SECRET = ''
// get alternative RPCs from https://chainlist.org/
QUICKNODE_HTTP_URL = ''
// wallet address private key to deploy the smart contract
PRIVATE_KEY = ''
```

- Compile and deploy the smart contracts:

```s
npx hardhat run scripts/deploy.js
```

- Start the application:

```s
npm run dev
```

### Usage

- Connect your wallet to the application by clicking on the **Connect** Button at the top - right corner of the page.
- Create a new post by clicking on the **Create Article** Button also at the top - right corner of the page(_This only shows up if you own the contract_).
- Fill in the form with the title, content, and picture Banner for your post.
- Click on the "Save" button to submit your post.
- The post will be visible to on the homepage and can be edited or updated only by the owner of the contract.

### Dependencies

**hardhat**: Ethereum development environment
**web3modal**: An easy-to-use library that allows users to connect their wallets to your app
**react-markdown** and **simplemde**: Markdown editor and markdown renderer for the CMS
**@emotion/css**: A great CSS in JS library
**@openzeppelin/contracts**: Open source implementations of useful smart contract standards and functionality

### License

- This project is licensed under the **MIT** License.
- **Grandida** is a License partner.

### Attribution

Some parts of the code were adapted from OpenZeppelin

> **DO NOT USE WITHOUT THE PERMISSION OF GRANDIDA**
