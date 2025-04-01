
const AuctionV1 = artifacts.require("AuctionV1");

module.exports = function(deployer) {
  deployer.deploy(AuctionV1, 360000, "0x0D2F40542cE3ffB76bB0C456230Cb0FC19CA6c26");
};