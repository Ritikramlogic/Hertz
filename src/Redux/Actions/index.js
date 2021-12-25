import {
  getAccount,
  transferToken,
  getLoginResponse,
  do2FAuthentication,
  transferHertzToUser,
  getTransactionhistory,
  transferHertzFromAdminToUser,
} from "../../Api/index";
import Web3 from "web3";
import { ethers } from "ethers";
import {
  ContractAddress,
  ContractABI,
  HTZContractAddress,
  HTZContractAbi,
  HTZSwapContractAbi,
  HTZSwapContractAddress,
} from "../../Contract/config";

//Get user account details
export const GetAccount = () => async (dispatch) => {
  const data = await getAccount();
  console.log(data);
  dispatch({
    type: "GET_ACCOUNT",
    payload: {
      account: data.account,
      balance: data.balance,
    },
  });
};

//Get user account details
export const TradeFromTO = (tradeValue) => (dispatch) => {
  dispatch({
    type: "SET_TRADE_FROM_TO",
    payload: tradeValue,
  });
};

// set Swap Button Value
export const SetSwap = (value) => (dispatch) => {
  dispatch({
    type: "SET_SWAP",
    payload: value,
  });
};

//Check sufficient amount
export const GetsufficientBalance = (value) => (dispatch) => {
  dispatch({
    type: "GET_SUFFICIENT_BALANCE",
    payload: value,
  });
};

//Set Contract data
export const SetContract = () => async (dispatch) => {
  //When metamask is Installed
  let data, htzContract, metamaskBalance, htzSwapContract;
  if (typeof window.ethereum !== "undefined") {
    alert("MetaMask is installed!");

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    var web3 = new Web3(window.ethereum);

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }],
    });

    window.account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }],
    });
    if ((await web3.eth.getChainId()) === 56) {
      //   console.log(this.state.changed);
      // Account Balance Check
    } else {
      alert("Please switch Network ");
    }

    const signer = await provider.getSigner();

    //Get Account details from metamask
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    data = new ethers.Contract(ContractAddress, ContractABI, signer);

    var web3 = new Web3(window.ethereum);

    htzContract = await new web3.eth.Contract(
      HTZContractAbi,
      HTZContractAddress
    );

    htzSwapContract = new ethers.Contract(
      HTZSwapContractAddress,
      HTZSwapContractAbi,
      signer
    );

    metamaskBalance =
      (await htzContract.methods.balanceOf(account[0]).call()) / 10 ** 4;
  } else {
    alert("MetaMask is not installed!");
  }
  dispatch({
    type: "SET_CONTRACT",
    payload: {
      contract: data,
      htzContract: htzContract,
      metamaskBalance: metamaskBalance,
      htzSwapContract: htzSwapContract,
    },
  });
};

//Tranfer Token
export const TransferToken = () => async (dispatch) => {
  const data = await transferToken();
  dispatch({
    type: "TRANSFER_TOKEN",
    payload: true,
  });
};

// Get User account details
export const GetLoginDetails = (username, password) => async (dispatch) => {
  const Value = await getLoginResponse(username, password);
  if (Value.error !== "User not found") {
    dispatch({
      type: "GET_LOGIN_DETAILS",
      payload: {
        username: true,
        is2FAvisable: true,
        code: null,
        isTradeDisabled: false,
      },
    });
  } else {
    document.getElementById("usernotfound").innerHTML = "User not found";
    document.getElementById("usernotfound").style.color = "red";
    dispatch({
      type: "GET_LOGIN_DETAILS",
      payload: {
        username: "",
        code: null,
        is2FAvisable: false,
      },
    });
  }
};

// user 2 Factor Authentication
export const TwoFactorAuthentication = (code) => async (dispatch) => {
  let value = await do2FAuthentication(code);
  console.log(value);
  if (value.error !== false) {
    const data = await getAccount();
    console.log(data);
    dispatch({
      type: "GET_ACCOUNT",
      payload: {
        account: data.account,
        balance: data.balance,
      },
    });
  } else {
    console.log("kjhkjhk");
  }
};

//HERTZ Trasfer to user
export const TransferHertzToUser =
  (account, symbol, amount) => async (dispatch) => {
    let data = await transferHertzToUser(account, symbol, amount);
    if (data.error === "Transaction failed") {
      alert("Please add sufficient ammount ");
      dispatch({
        type: "TRANSFER_FROM_TO",
        payload: {
          isTransaction: false,
          isSwapDisabled: false,
          isClaimReward: false,
          isTradeDisabled: false,
        },
      });
    } else {
      alert("Transaction is successfully complete");
      dispatch({
        type: "TRANSFER_FROM_TO",
        payload: {
          isTransaction: true,
          isSwapDisabled: true,
          isClaimReward: true,
          isTradeDisabled: true,
        },
      });
    }
  };

export const ClaimHertz = (contract, amount) => async (dispatch) => {
  console.log(await contract.buyToken(amount * 10 ** 4));
  dispatch({ type: "CLAIM_HERTZ", payload: {} });
};

//Check transcation hgistory of payment
export const TranscationStatus = () => async (dispatch) => {
  let data = await getTransactionhistory();
  return data;
};

// Swap Currency
export const SwapCurrency = (fromSymbol, toSymbol) => async (dispatch) => {
  dispatch({
    type: "SWAP_CURRENCY",
    payload: { from: fromSymbol, to: toSymbol },
  });
};

//Contract Approive Check

export const ApproversCheck = (HTZcontract, amount) => async (dispatch) => {
  const account = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log(account[0]);
  await HTZcontract.methods
    .approve(HTZSwapContractAddress, amount * 10 ** 4)
    .send({ from: account[0] })
    .then((data) => console.log(data))
    .catch((err) => {
      if (err.code === 4001) {
        alert("denied transaction");
      }
    });

  //     blockHash: "0xff76d68fb582c823e03cf02614f2519fa868c7217a7f000fc670949f3ec8d449"
  // blockNumber: 13784627
  // contractAddress: null
  // cumulativeGasUsed: 34267151
  // ->events: {Approval: {…}}
  // from: "0xaf80db1b7ce3247275fe98bb007b1165bfa98acf"
  // gasUsed: 44116
  // logsBloom: "0x00000000000001000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000020000000400000040000000000000000000000000000000000000000800000000000000000000000000000000000000000000000010000000000000000000040000000000000000000000000000000000000000"
  // status: true
  // to: "0xb5bba78b4df2d47dd46078514a3e296ab3c344fe"
  // transactionHash: "0xeb6f879abd952818aafdba9a3aa343456df7d3a95f7bf67cfdee6557522606a2"
  // transactionIndex: 300
  // type: "0x0"
  if (true) {
    dispatch({
      type: "APPROVE_CHECK",
      payload: { condition: false, success: true, isApprovedSwap: true },
    });
  } else {
    dispatch({
      type: "APPROVE_CHECK",
      payload: { condition: false, success: false, isApprovedSwap: false },
    });
  }
};

export const ApproveCondition = (value) => async (dispatch) => {
  dispatch({
    type: "APPROVE_CONDITION",
    payload: value,
  });
};

export const HertzSwap = (contract, amount) => async (dispatch) => {
  const account = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log(account[0]);
  console.log(
    await contract
      .hertzSwap(amount * 10 ** 4)
      .then((data) => alert(`This is the Transaction Hash: ${data.hash}`))
      .catch((e) => console.log(e))
  );
  console.log(contract);

  dispatch({
    type: "HERTZ_SWAP",
    payload: { success: false, isClaim: true, isClaimVisible: true },
  });
};

export const SwapClaimHertz = (username, amount) => async (dispatch) => {
  let data = await transferHertzFromAdminToUser(username, "HTZ", amount);
  console.log(data);
  if (data.error === "Transaction failed") {
    alert("Transaction failed");
  } else {
    alert("Transaction is successfully complete");
    dispatch({
      type: "SWAP_CLAIM_HERTZ",
      payload: { isClaim: false },
    });
  }
};
// ritik.chhipa@ramlogics.com
// Rit@9001586400
