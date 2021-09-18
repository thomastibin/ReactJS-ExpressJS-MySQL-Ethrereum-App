const Migrations = artifacts.require("Evidence.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
