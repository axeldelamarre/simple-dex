import React from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

export const App = () => {
  const [storageValue, setStorageValue] = React.useState(0);
  const [web3, setWeb3] = React.useState();
  const [accounts, setAccounts] = React.useState();
  const [contract, setContract] = React.useState();

  const updateValue = React.useCallback(async (contract) => {
    setStorageValue(parseInt(await contract.methods.get().call()));
  }, []);

  React.useEffect(() => {
    (async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const address = deployedNetwork && deployedNetwork.address;
      const contract = new web3.eth.Contract(SimpleStorageContract.abi, address);

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
      updateValue(contract);
    })();
  }, [updateValue]);

  const handleClick = async () => {
    await contract.methods.set(storageValue + 1).send({ from: accounts[0] });
    updateValue(contract);
  };

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <p>
        If your contracts compiled and migrated successfully, below will show
        a stored value of 5 (by default).
      </p>
      <p>
        <button onClick={handleClick}>Increment</button>
      </p>
      <div>The stored value is: {storageValue}</div>
    </div>
  );
};