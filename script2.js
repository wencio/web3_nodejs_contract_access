const Web3 = require ('Web3');
const Provider = require('@truffle/hdwallet-provider')
const MyContract = require ('./build/contracts/MyContract.json');
const address = '0xeA62eD3F31aED00690D38FB81de9642b43d00eA7';
const privateKey = '07271efaddf22ad6f3b2c65435a2cd78eecac05c385321377512488265359d5d';
const infuraUrl ='https://rinkeby.infura.io/v3/550dd3ed604f4342aaf4aa938937a274';

const init3 = async() =>{
    const provider = new Provider(privateKey, infuraUrl)

    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address   
    );


    console.log (`Old data value: ${await myContract.methods.data().call()}`);
    const receipt = await myContract.methods.setData(3).send({from:address});
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(`New date value: ${await myContract.methods.data().call()}`);


}

init3();
