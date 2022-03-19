const VotingGame = artifacts.require("VotingGame");

module.exports = function (deployer) {
  deployer.deploy(VotingGame);
};
