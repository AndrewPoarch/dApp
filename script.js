const contractAddress = "0x8d87d1069Ef30Bcf7459065FB39522fdb4DA254a";
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "option",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "result",
				"type": "uint256"
			}
		],
		"name": "rockPaper",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_option",
				"type": "uint8"
			}
		],
		"name": "rockPaperScissors",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const provider = new ethers.providers.Web3Provider(window.ethereum, 97)
let signer;
let contract;


const event = "RockPaperScissors";

provider.send("eth_requestAccounts", []).then(()=>{
    provider.listAccounts().then( (accounts) => {
        signer = provider.getSigner(accounts[0]); //account in metamask
        
        contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        )
     
    }
    )
}
)

async function RockPaperScissors(_option){
    let amountInEth = document.getElementById("amountInEth").value;
    let amountInWei = ethers.utils.parseEther(amountInEth.toString())
    console.log(amountInWei);
    
    let resultGame = await contract.rockPaperScissors(_option, {value: amountInWei});
    const res = await resultGame.wait();
    console.log(res);

    let queryResult =  await contract.queryFilter('rockPaper', await provider.getBlockNumber() - 10000, await provider.getBlockNumber());
    let queryResultRecent = queryResult[queryResult.length-1]
    //console.log(queryResult[queryResult.length-1].args);

    let amount = await queryResultRecent.args.amount.toString();
    let player = await queryResultRecent.args.player.toString();
    let option = await queryResultRecent.args.option.toString();
    let result = await queryResultRecent.args.result.toString();
	

	let variants = ["Rock", "Paper", "Scissors"]
	let results = ["Draw", "Win", "Lose"]

	console.log(`Player chose: ${variants[option]}`)
	console.log(`Result of the game: ${results[result]}`)

	let resultLogs = `
	Player: ${player}
	You chose: ${variants[option]}
	Result of the game: ${results[result]}
	`


    let resultLog = document.getElementById("resultLog");
    resultLog.innerText = resultLogs;








    // handleEvent();
}

// async function handleEvent(){

//     console.log(await contract.filters.RockPaperScissors());
//     let queryResult =  await contract.queryFilter('rockPaper', await provider.getBlockNumber() - 10000, await provider.getBlockNumber());
//     let queryResultRecent = queryResult[queryResult.length-1]
//     let amount = await queryResultRecent.args.amount.toString();
//     let player = await queryResultRecent.args.player.toString();
//     let option = await queryResultRecent.args.option.toString();
//     let result = await queryResultRecent.args.result.toString();


//     let resultLogs = `
//     stake amount: ${ethers.utils.formatEther(amount.toString())} BNB, 
//     player: ${player}, 
//     player chose: ${variants[option]}, 
//     result: ${results[result]}`;

//     let resultLog = document.getElementById("resultLog");
//     resultLog.innerText = resultLogs;
    
// }
