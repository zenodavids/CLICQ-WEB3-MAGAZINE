//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// Clicq Magazine Contract
contract Clicq {
  using Counters for Counters.Counter;
// _paused is used to pause the contract in case of an emergency
bool public _paused; // boolean used to pause the contract if needed
address public editor; // address of the editor

// private counter used to increment whenever a new article is created
Counters.Counter private _articleIds;

// struct containing information about the article
struct Article {
  // article id
  uint id; // uint used to store the article's id
  // article header
  string header; // string used to store the article's header
  // Article hash containing the article body
  string body; // string used to store the article's body
  uint timestamp;
  // wether published or not
  bool published; // boolean used to store if the article has been published
}

// Events for when an article is created, deleted, or updated
event ArticlesDeleted(); // event triggered when an article has been deleted
event ArticleDeleted(uint id); // event triggered when an article has been deleted, with the id of the deleted article
event ArticleCreated(uint id, string header, string hash); // event triggered when an article has been created, with the id, header, and hash of the new article
event ArticleUpdated(uint id, string header, string hash, bool published); // event triggered when an article has been updated, with the id, header, hash, and published status of the updated article

// mappings used to store data about the articles
mapping(uint => Article) private idToArticle; // mapping from article id to article struct
mapping(string => Article) private hashToArticle; // mapping from article body hash to article struct

// modifier used to prevent functions from being invoked when the contract is paused
modifier onlyWhenNotPaused {
  require(!_paused, "Contract currently paused"); // check if the contract is paused
  _; // proceed if the contract is not paused
}

// constructor, used to set the editor address
constructor() {
  editor = msg.sender; // set the editor address to the message sender
}

// function used to pause or unpause the contract
function setPaused(bool emergency) public onlyOwner {
  _paused = emergency; // set the _paused boolean to the given parameter
}

// function used to create a new article, only available to the editor
function createArticle(string memory header, string memory hash) public onlyOwner {
  _articleIds.increment(); // increment the article id counter
  uint articleId = _articleIds.current(); // get the current article id
  // create a new article using the struct above
  Article storage article = idToArticle[articleId];
  article.id = articleId; // set the article's id
  article.header = header; // set the article's header
  article.published = true; // set the article's published status to true
  article.body = hash; // set the article's body
  hashToArticle[hash] = article; // store the article in the hashToArticle mapping
  emit ArticleCreated(articleId, header, hash); // emit the ArticleCreated event
}

// modifier used to prevent functions from being invoked by anyone but the editor
modifier onlyOwner() {
  require(msg.sender == editor); // check if the message sender is the editor
  _; // proceed if the message sender is the editor
}

// function used to fetch an article by its body hash
function fetchArticle(string memory hash) public view returns(Article memory){
  return hashToArticle[hash]; // return the article with the given hash from the hashToArticle mapping
}

// function used to delete an article, only available to the editor
function deleteArticle(uint articleId) public onlyOwner {
  Article storage article = idToArticle[articleId]; // get the article with the given id from the idToArticle mapping
  delete hashToArticle[article.body]; // delete the article from the hashToArticle mapping
  delete idToArticle[articleId]; // delete the article from the idToArticle mapping
  emit ArticleDeleted(articleId); // emit the ArticleDeleted event
}

// function used to delete an article in an emergency, only available to the editor
function emergencyDeleteArticle(uint articleId) public onlyOwner {
  delete idToArticle[articleId]; // delete the article with the given id from the idToArticle mapping
}

// function used to update an article, only available to the editor
function updateArticle(uint articleId, string memory header, string memory hash, bool published) public onlyOwner {
  Article storage article =  idToArticle[articleId]; // get the article with the given id from the idToArticle mapping
  article.header = header; // set the article's header
  article.published = published; // set the article's published status
  article.body = hash; // set the article's body
  idToArticle[articleId] = article; // store the article in the idToArticle mapping
  hashToArticle[hash] = article; // store the article in the hashToArticle mapping
  emit ArticleUpdated(article.id, header, hash, published); // emit the ArticleUpdated event
}

// function used to fetch all articles
function fetchArticles() public view returns (Article[] memory) {
  uint itemCount = _articleIds.current(); // get the number of articles from the article id counter

  Article[] memory articles = new Article[](itemCount); // create an array of articles

  // loop through all the articles
  for (uint i = 0; i < itemCount; i++) {
    uint currentId = i + 1; // get the current article's id
    Article storage currentItem = idToArticle[currentId]; // get the current article from the idToArticle mapping
    articles[i] = currentItem; // add the current article to the articles array
  }
  return articles; // return the articles array
}
}

// used account 1 to deploy