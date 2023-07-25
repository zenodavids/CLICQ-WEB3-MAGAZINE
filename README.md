### Project Title

# CLICQ

A fullstack decentralized blog built with Next.js, Polygon, Solidity, IPFS, and Hardhat.

### Project Description

CLICQ is a decentralized Magazine that allows users to create, edit, and update posts only if they are the owner of the contract (this can be manipulated to a specific number of authorized wallet addresses from the fron-end).

The blog utilizes blockchain technology and smart contracts to ensure the security and integrity of the content on the platform. Additionally, the blog is built with modern technologies such as Next.js, Polygon, and IPFS, making it fast and efficient.

Clicq can also be used by companies, countries, and any other organizations to create announcement boards.

For example, a company can use Clicq to create an announcement board for their employees. The board can be customized with a company logo, color scheme, and layout. It can also be set up to include various categories for employees to post announcements, such as upcoming events, job openings, and other announcements. Employees can easily access the board from any device, as it is hosted on the blockchain.

Countries can also use Clicq to create announcement boards for their citizens. The boards can be used to announce new laws, policies, and public events. They can also be used to post important updates and news.

Finally, any other organization can use Clicq to create announcement boards. This could include schools, universities, hospitals, and other organizations. They can use the boards to post announcements related to the organization, such as upcoming classes, events, or job openings.

### What the Project aims to solve

Clicq aims to solve the following;

- Enable peer-to-peer sharing of content and content-creation
- Eliminate the need for a central authority to store and distribute content
- Connect readers directly to the authors and publishers of content
- Enable collaboration between authors and publishers from around the world
- Give authors and publishers the ability to set their own pricing for their content
- Increase the speed of content distribution and updates
- Reduce the cost of content distribution and enable authors and publishers to keep more of their profits
- Increase the transparency of content to readers
- Allow readers to interact directly with authors and publishers
- Create an open, democratic platform for content creation and distribution

All these that are not added yet will be added as my knowledge increases.

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

### Attribution

Some parts of the code were adapted from OpenZeppelin

