import React, { useEffect } from "react";
import $ from "jquery";
export default function TradePage(props) {
  function loadScript() {
    console.log("loaded ");
    // let selectedPair = $("#selectedPair").val();
    document.getElementById("swapTokeList").innerHTML = "";

    var formdata = new FormData();
    console.log(formdata);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`https://ramlogics.com:9101/get-all-tokens`, requestOptions)
      .then((response) => response.json())
      .then((data) =>
        data.result.map((result) => {
          let t = `<span class="pairsWithSymbol"  data-dismiss="modal" onclick="firstList('${
            result.tokens
          }','${result.address_type}','${result.image}')"><img src="${
            result.image
          }" class="token_img_ss" alt="eth.png"  />  ${result.tokens.toUpperCase()}</span>`;
          document.getElementById("swapTokeList").innerHTML += t;
        })
      )
      .catch((error) => console.log("error", error));
  }
  useEffect(() => {
    loadScript();
  }, []);
  return (
    <>
      <section class="total_wsum_main">
        <div class="container">
          <div class="row WSUM_value justify-content-center">
            <div class="col-md-8 col-12">
              <div class="row WSUM_value_02">
                <div class="col-md-12">
                  <div class="text-center" style={{ padding: "14px 0" }}>
                    <img
                      src="https://defi.hertz-network.com/wp-content/themes/twentytwenty/assets/images/logo-with-rubik-text-2.png"
                      class="w-75"
                      alt=""
                    ></img>
                  </div>

                  <hr class="mb-0" style={{ borderColor: "#26c5eb" }} />
                  <div class="row py-3">
                    <div class="col-auto">
                      <div
                        class="kfn_i"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      >
                        <i
                          class="far fa-cog"
                          data-toggle="tooltip"
                          data-placement="left"
                          title="Slippage"
                        ></i>
                      </div>
                    </div>
                    <div class="col">
                      <div class="kfn_h6 text-center">
                        <h5>Trade</h5>
                      </div>
                    </div>
                    <div class="col-auto">
                      <div
                        class="swapbox"
                        data-toggle="modal"
                        data-target="#swappingModelView"
                        id="showSwappingDetails"
                        onClick="showSwappingDetailsByUser()"
                      >
                        <i
                          class="fal fa-clock"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Transaction status"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div class="farm-tool">
                    <div class="tab-content" id="pills-tabContent">
                      <div
                        class="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <div class="fnlfgj_">
                          <div class="row pb-3">
                            <div class="col">
                              <div class="kfn_h6">
                                <h6>Your Trade</h6>
                              </div>
                            </div>
                            <div class="col-auto"></div>
                          </div>
                          <div class="swap_tab_0_1 py-md-3 py-2">
                            <div class="form_area_01">
                              <span> </span>
                              <div class="form-group">
                                <div class="row">
                                  <span class="col">From</span>
                                  <small class="col text-right"></small>
                                </div>
                                <div class="btn_in__put">
                                  <input
                                    type="text"
                                    class="form-control form_token"
                                    id="fromBalance"
                                    id="inputbal"
                                    placeholder="0.0"
                                  />
                                  <button
                                    type="button"
                                    class="btn btn-primary angle_down  d-flex align-items-center justify-content-center"
                                    style={{ lineHeight: "2" }}
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter5"
                                    id="pairArea1"
                                  >
                                    <span id="symbolImage1">
                                      <img
                                        src="https://ramlogics.com/Defi_Hertz/wp-content/themes/twentytwenty/assets/images/HTZ-NEW.png"
                                        class=""
                                        alt="htz-new.png"
                                        style={{ width: "35px" }}
                                      />
                                    </span>
                                    &nbsp;<span id="currencySymbol1">HTZ</span>{" "}
                                    &nbsp;
                                    <i class="far fa-angle-down"></i>
                                  </button>
                                </div>
                                <p id="errorMessage"></p>
                              </div>
                            </div>
                          </div>
                          <div class="swap_tab_02 py-md-2 py-2">
                            <div class="form_area_02">
                              <a href="javascript:void(0)" id="arrowPairChange">
                                <i class="fad fa-arrow-alt-circle-down text-center text-white"></i>
                              </a>
                            </div>
                          </div>
                          <div class="swap_tab_03 py-md-3 py-2">
                            <div class="form_area_03">
                              <span> </span>
                              <div class="form-group">
                                <div class="row">
                                  <span class="col">To (estimated)</span>
                                  <small class="col text-right"></small>
                                </div>
                                <input
                                  type="text"
                                  class="form-control form_token amountGet"
                                  id="recipientAddress"
                                  placeholder="0.0"
                                  disabled
                                />
                                <button
                                  type="button"
                                  class="btn btn-primary angle_down1  d-flex align-items-center justify-content-center"
                                  style={{ lineHeight: "2" }}
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter2"
                                  id="pairArea2"
                                >
                                  <span id="symbolImage2">
                                    <p class="mb-0">Select a token</p>
                                  </span>
                                  &nbsp;<span id="currencySymbol2"></span>{" "}
                                  &nbsp; <i class="far fa-angle-down"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="pt-2 text-center">
                            <label id="swapErrorMessage"></label>
                          </div>
                          <div class="">
                            <div class="d-flex justify-content-between flex-direction-row">
                              <p class="mb-1">Swap Fees</p>
                              <p class="mb-1" id="Fees">
                                0
                              </p>
                            </div>
                            <div class="d-flex justify-content-between flex-direction-row">
                              <p class="mb-1">Price Impact</p>
                              <p class="mb-1" id="tokenPriceImpact">
                                0
                              </p>
                            </div>
                            <div class="d-flex justify-content-between flex-direction-row">
                              <p class="mb-1">Price</p>
                              <p class="mb-1" id="tokenPrice">
                                0
                              </p>
                            </div>
                          </div>
                          <div class="swap_tab_04 md-3 py-3">
                            <div class="form_area_btn">
                              <button
                                class="btn_outline_light w-100"
                                id="swappingBtn"
                                onClick={() => window.swapping()}
                              >
                                Swap
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content WSUM_value_02">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Setting
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i class="fal fa-times-circle text-white"></i>
                </button>
              </div>
              <div class="modal-body">
                <div class="setting_modal">
                  <h6>Slippage Tolerance</h6>
                  <div class="row">
                    <div class="col">
                      <div class="setting_modal_area">
                        <button
                          type="button"
                          class="btn btn_Connect_light w-100 slippagePercentage"
                          data-value="0.1"
                        >
                          0.1%
                        </button>
                      </div>
                    </div>
                    <div class="col">
                      <div class="setting_modal_area">
                        <button
                          type="button"
                          class="btn btn_Connect_light w-100 slippagePercentage"
                          data-value="0.5"
                        >
                          0.5%
                        </button>
                      </div>
                    </div>
                    <div class="col">
                      <div class="setting_modal_area">
                        <button
                          type="button"
                          class="btn btn_Connect_light w-100 slippagePercentage"
                          data-value="1.0"
                        >
                          1.0%
                        </button>
                      </div>
                    </div>
                    <div class="col">
                      <div class="setting_modal_area d-flex align-items-center">
                        <input
                          type="text"
                          class="form-control text-white w-100"
                          placeholder="0.10"
                          id="slippage"
                        />{" "}
                        <span class="pl-1">%</span>
                      </div>
                    </div>
                  </div>
                  <p
                    class="text-danger py-3 font-weight-bold"
                    id="slippageError"
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <input type="hidden" id="selectedPair" value=""></input>
        <input type="hidden" id="firstSymbol" value="htz"></input>
        <input type="hidden" id="firstAddressType" value="hertz"></input>
        <input type="hidden" id="secondSymbol" value=""></input>
        <input type="hidden" id="addressTypes" value=""></input>
        <input type="hidden" id="currencyAddressType" value=""></input>
        <input type="hidden" id="feeAmount" value=""></input>
      </section>
      {/* Modal  */}
      <div
        class="modal fade"
        id="exampleModalCenter5"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content WSUM_value_02">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Select a token
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="fal fa-times-circle text-white"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="sid_ebar mx-2">
                <div class="sc-bEjcJn jLJzwT">
                  <input
                    type="text"
                    placeholder="search token name"
                    class="form-control address_search"
                    id="filterLiquidity"
                  />
                </div>

                {/* <!--Token Select options div start--> */}
                <div
                  id="swapTokeList"
                  class="token_list_all scrollbar_width"
                  style={{ display: "flex", flexDirection: "column" }}
                ></div>
                {/* <!--Token Select options div end--> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--Show Liquidity pairs Start--> */}
      <div
        class="modal fade"
        id="exampleModalCenter5"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content WSUM_value_02">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Select a token
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="fal fa-times-circle text-white"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="sid_ebar mx-2">
                <div class="sc-bEjcJn jLJzwT">
                  <input
                    type="text"
                    placeholder="search token name"
                    class="form-control address_search"
                    id="filterLiquidity"
                  />
                </div>

                {/* <!--Token Select options div start--> */}
                <div
                  id="swapTokeList"
                  class="token_list_all scrollbar_width"
                  style={{ display: "flex", flexDirection: "column" }}
                ></div>
                {/* <!--Token Select options div end--> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--swapping second model--> */}
      <div
        class="modal fade"
        id="exampleModalCenter2"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content WSUM_value_02">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Select a token
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="fal fa-times-circle text-white"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="sid_ebar mx-2">
                <div class="sc-bEjcJn jLJzwT">
                  <input
                    type="text"
                    id="filterSwap1"
                    placeholder="search token name"
                    class="form-control address_search"
                  />
                </div>

                {/* <!--Token Select options div start--> */}
                <div
                  id="symbol2"
                  class="token_list_all scrollbar_width"
                  style={{ display: "flex", flexDirection: "column" }}
                ></div>
                {/* <!--Token Select options div end--> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--swapping second model--> */}
      {/* <!--View all transaction--> */}

      <div
        class="modal fade viewall"
        id="swappingModelView"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content WSUM_value_02">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                All Transactions
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="fal fa-times-circle text-white"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class=" mt-3 table-responsive">
                <h5 id="totalSwappingAmount"></h5>

                <table class="table table-condensed">
                  <thead>
                    <tr>
                      <th>Pair</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Txn #</th>
                      <th>Txn #</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="swappingDetails"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--LIQUIDITY FIRST MODEL SYMBOL--> */}
      <div
        class="modal fade"
        id="exampleModalCenter3"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content WSUM_value_02">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Select a token
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="fal fa-times-circle text-white"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="sid_ebar mx-2">
                <div class="sc-bEjcJn jLJzwT">
                  <input
                    type="text"
                    id="filterLiq2"
                    placeholder="search token name"
                    class="form-control address_search"
                  />
                </div>

                {/* <!--Token Select options div start--> */}
                <div
                  id="liquiditySymbol2"
                  class="token_list_all scrollbar_width scrollbar_width"
                  style={{ display: "flex", flexDirection: "column" }}
                ></div>
                {/* <!--Token Select options div end--> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
