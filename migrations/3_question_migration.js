const Question = artifacts.require("Question");

module.exports = function (deployer) {
  deployer.deploy(Question);
};
