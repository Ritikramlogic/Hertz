import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

// Header Componenet Start

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loginHandle = this.loginHandle.bind(this);
  }

  async loginHandle(e) {
    // login user after authentication
    e.preventDefault();

    var username = $("[name=username]").val();
    var password = $("[name=password]").val();
    var _code = $("[name=_Code]").val();
    window.username = username;
    $("#message").empty("");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      username: username,
      password: password,
    });
    console.log(raw);
    console.log(_code);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`https://api.hertz-network.com/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.error) {
          window.token = result.token;
          //send data to session file

          //2FA Verification
          fetch("https://api.hertz-network.com/2fa/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${result.token}`,
            },
            body: JSON.stringify({
              code: _code,
            }),
          })
            .then((data) => data.json())
            .then((d) => {
              console.log(d);
              document.getElementById("username").value = window.username;
              document.getElementById("token").value = window.token;

              fetch("https://api.hertz-network.com/accounts/accounts", {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${window.token}`,
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  document.getElementById("account").value = data[0].account;
                  $("#hertzBalance").text(data[0].balance);
                  $("#hertzAccount").removeClass("text-danger");
                  $("#hertzAccount").addClass("text-success");
                });
            })
            .catch((e) => console.log(e));

          // console.log(document.getElementById("account").value);
        } else {
          $("#message").append(
            `<div class="alert alert-danger text-center">${result.error}</div>`
          );
        }
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <>
        <div
          class="section_bar sticky-top"
          style={{ backgroundColor: "#002853" }}
        >
          <div class="container-fluid px-md-2" style={{ overflowX: "hidden" }}>
            <div class="row">
              <div class="col-md-12 col-12">
                <nav class="navbar navbar-expand-lg navbar-light">
                  <a class="navbar-brand" href="https://defi.hertz-network.com">
                    <img
                      src="https://defi.hertz-network.com/wp-content/themes/twentytwenty/assets/images/logo-with-rubik-text-2.png"
                      class="rubik_logo"
                      alt=""
                    ></img>
                  </a>
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon"></span>
                  </button>

                  <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item active d-none">
                        <a class="nav-link" href="#">
                          Home <span class="sr-only">(current)</span>
                        </a>
                      </li>
                      <li class="nav-item d-none">
                        <a class="nav-link" href="#">
                          Swap
                        </a>
                      </li>

                      <li class="nav-item">
                        <Link class="nav-link  " to="/trade" class="text-white">
                          Trade
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link
                          class="nav-link "
                          to="/liquidity"
                          class="text-white"
                        >
                          Liquidity
                        </Link>
                      </li>

                      <li class="nav-item">
                        <Link
                          class="nav-link active"
                          to="/farms"
                          class="text-white"
                        >
                          Farms
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link " to="/info" class="text-white">
                          Info
                        </Link>
                      </li>

                      <li class="nav-item d-none">
                        <a class="nav-link" href="#">
                          Bridge
                        </a>
                      </li>
                    </ul>
                    <div class="form-inline my-2 pl-md-3 pl-0">
                      <div class="haertxwallets d-flex align-items-center">
                        <div class="network_type_area">
                          <div class="mx-2 text-danger" id="hertzAccount">
                            <span>Hertz</span> &nbsp;
                            <i class="fal fa-wallet"></i>
                          </div>
                        </div>
                        <div class="show_balance_area">
                          <div class="mx-2 text-white">
                            <span id="hertzBalance">Balance</span>
                          </div>
                        </div>
                      </div>

                      <div class="two_btn_area">
                        <div class="BNB_0 mx-2 text-danger">
                          <div class="text-danger" id="ethNetwork">
                            <span id="showNetworkType">BNB/ETH</span>&nbsp;
                            <i class="fal fa-wallet"></i>
                          </div>
                        </div>
                        <div class="BNB_0 mx-2">
                          <span id="showBalance">0.0000</span>
                        </div>
                        <div class="mx-2 bh65cx">
                          <span id="walletAddress"> No Wallet Connect</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        id="btn-connect"
                        class="btn btn_Connect_light mx-2"
                        data-toggle="modal"
                        data-target="#exampleModalCenterAA"
                      >
                        Connect to a wallet
                      </button>
                      <button
                        class="btn btn_Connect_light mx-2"
                        id="btn-disconnect"
                        onClick="onDisconnect()"
                        style={{ display: "none" }}
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}

        <div
          class="modal fade"
          id="exampleModalCenterAA"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content WSUM_value_02">
              <div class="modal-header">
                <h5 class="modal-title m-auto" id="exampleModalCenterTitle">
                  Connect wallet
                </h5>
                <button
                  type="button"
                  class="close p-0 m-0"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i class="fal fa-times-circle text-white"></i>
                </button>
              </div>
              <div class="modal-body">
                <div class="py-2">
                  <button
                    type="button"
                    class="btn btn_metamask w-100 my-3"
                    data-toggle="modal"
                    data-target="#exampleModalCenterLonin"
                  >
                    <span class=""> Hertz Network</span>{" "}
                    <span class="d-grid">
                      <img
                        src="https://ramlogics.com/Defi_Hertz/wp-content/themes/twentytwenty/assets/images/HTZ-ERC-20-NEW.png"
                        class=""
                        alt="eth.png"
                        style={{ width: "32px" }}
                      ></img>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.connectMetaMask()}
                    class="btn btn_metamask w-100 my-3"
                    data-dismiss="modal"
                    id="metamask"
                  >
                    <span class=""> Metamask</span> <span class="d-grid"></span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.connectWalletConnect()}
                    class="btn btn_metamask w-100 my-3"
                    id="trustWallet"
                  >
                    <span class=""> WalletConnect</span>{" "}
                    <span class="d-grid"></span>{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* hertz Modal  */}

        <div
          class="modal fade"
          id="exampleModalCenterLonin"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered"
            role="document"
            style={{ position: "absolute", left: "0", right: "17px" }}
          >
            <div class="modal-content WSUM_value_02">
              <div class="modal-body">
                <div class="">
                  <div class="text-center text-white">
                    <img
                      src="https://ramlogics.com/Defi_Hertz/wp-content/themes/twentytwenty/assets/images/logo-with-rubik-text-2.png"
                      class="w-50"
                      alt=""
                    ></img>

                    {/* <!--<h3 class="font-weight-normal">Login</h3>--> */}
                  </div>

                  <form
                    id="loginForm"
                    method="post"
                    onSubmit={this.loginHandle}
                  >
                    <div id="message" class="mt-2"></div>
                    <div class="row align-items-center">
                      <div class="col-12 mt-4">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Username / email"
                          name="username"
                          required
                        ></input>
                      </div>
                    </div>
                    <div class="row align-items-center mt-4">
                      <div class="col-12">
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Password"
                          name="password"
                          required
                        ></input>
                      </div>
                    </div>
                    <div class="row align-items-center mt-4">
                      <div class="col-12">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="_Code"
                          name="_Code"
                          required
                        ></input>
                      </div>
                    </div>
                    <div class="my-4">
                      <div class="text-center">
                        <button
                          class="btn btn-primary mt-4 w-100"
                          type="submit"
                          id="login"
                          name="login"
                          // onClick={this.loginHandle}
                        >
                          Login
                        </button>
                      </div>
                    </div>

                    <div class="text-center">
                      <a
                        href="https://hertz-network.com/register/"
                        target="_blank"
                      >
                        Register Your Account
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!--TRANSACTION LOADER END--> */}

        <input type="hidden" id="token" value=""></input>
        <input type="hidden" id="username" value=""></input>
        <input type="hidden" id="account" value=""></input>
        <input type="hidden" id="metaMaskAccount" value=""></input>
        <input type="hidden" id="currentPrice" value=""></input>
      </>
    );
  }
}

export default Header;
