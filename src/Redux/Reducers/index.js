const initialState = {
  account: "",
  username: "",
  // isSwapDisabled: true,
  isSwapDisabled: {
    condition: true,
    SwapSymbol: "HTZ",
  },
  htZbalance: 0,
  tradeValue: 0,
  contract: null,
  htzContract: null,
  isSufficientBalance: true,
  is2FAvisable: false,
  isTransaction: false,
  transcations: null,
  isClaimReward: false,
  isTradeDisabled: true,
  isApproved: {
    isVisible: false,
    condition: false,
    success: false,
  },
  metamaskBalance: 0,
  TradeSymbol: {
    from: "HTZ",
    to: "BEP20",
  },
  isContractSwap: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Get Account details of user
    case "GET_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
        htZbalance: action.payload.balance,
        // htZbalance: 123,
      };

    // Set Trade Value
    case "SET_TRADE_FROM_TO":
      return { ...state, tradeValue: action.payload };

    // Set Swap condition
    case "SET_SWAP":
      return {
        ...state,
        isSwapDisabled: {
          ...state.isSwapDisabled,
          condition: action.payload,
        },
      };

    //Set Contract Value
    case "SET_CONTRACT":
      return {
        ...state,
        contract: action.payload.contract,
        htzContract: action.payload.htzContract,
        metamaskBalance: action.payload.metamaskBalance,
      };

    //Transfer Token
    case "TRANSFER_TOKEN":
      return {
        ...state,
        contract: action.payload,
      };

    case "GET_SUFFICIENT_BALANCE":
      return {
        ...state,
        isSufficientBalance: action.payload,
      };
    case "GET_LOGIN_DETAILS":
      return {
        ...state,
        username: action.payload.username,
        is2FAvisable: action.payload.is2FAvisable,
        isTradeDisabled: action.payload.isTradeDisabled,
      };
    case "TRANSFER_FROM_TO":
      return {
        ...state,
        isTransaction: action.payload.isTransaction,
        isTradeDisabled: action.payload.isTradeDisabled,
        isSwapDisabled: {
          ...state.isSwapDisabled,
          condition: action.payload.isSwapDisabled,
        },
        isClaimReward: action.payload.isClaimReward,
      };
    case "SWAP_CURRENCY":
      return {
        ...state,
        TradeSymbol: {
          from: action.payload.from,
          to: action.payload.to,
        },
      };
    case "APPROVE_CONTRACT":
      return {
        ...state,
        isApproved: {
          isVisible: action.payload.isVisible,
          condition: action.payload.condition,
        },
      };
    default:
      return state;
  }
};
