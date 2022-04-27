const Web3 = require ('Web3');
const MyContract = require ('./build/contracts/MyContract.json');
const address = '0xeA62eD3F31aED00690D38FB81de9642b43d00eA7';
const privateKey = '07271efaddf22ad6f3b2c65435a2cd78eecac05c385321377512488265359d5d';
const infuraUrl ='https://rinkeby.infura.io/v3/550dd3ed604f4342aaf4aa938937a274';

const init = async() =>{

    const web3 = new Web3(infuraUrl);
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address   
    );

    web3.eth.accounts.wallet.add(privateKey);

    const tx = myContract.methods.setData(2);
    const gas = await tx.estimateGas({from:address});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);
    const txData =  {
        from: address,
        to:myContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chain: 'rinkeby',
        hardfork: 'istanbul'
        };
       
  
    console.log (`Old data value: ${await myContract.methods.data().call()}`);
    const receipt = await web3.eth.sendTransaction(txData);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(`New date value: ${await myContract.methods.data().call()}`);


}

init();
