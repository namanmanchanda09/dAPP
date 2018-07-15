// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

import one from "../../build/contracts/one.json"



// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);

var One = contract(one);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      console.log(account);

      // self.refreshBalance();
    });
  },


};



window.App2 = {
  start: function() {
    var self = this;

    One.setProvider(web3.currentProvider);
  },

  claim_intimation: function() {
    var self = this;
    var claimdate = $("#claimdate").val();
    var dischargedate = $("#discharge").val();

    var claimdatee = claimdate.split("-", 3);
    var discharge = dischargedate.split("-", 3);

    console.log(claimdatee[0]);
    console.log(claimdatee[1]);
    console.log(claimdatee[2]);
    let d1 = claimdatee[2];
    let m1 = claimdatee[1];
    let y1 = claimdatee[0];

    let d2 = discharge[2];
    let m2 = discharge[1];
    let y2 = discharge[0];

    // document.getElementById("demo2").innerHTML = res2;

    var instance;

    One.deployed()
      .then(function(Instance) {
        instance = Instance;
        return instance.claim_intimation(d1, m1, y1, d2, m2, y2, {
          from: account,
          gas: 3500000
        });
      })
      .then(function() {
        console.log("one complete");
      })
      .catch(function(e) {
        console.log(e);
      });

    console.log(claimdate);
  },

  Hospitalcharges: function() {
    var self = this;
    var Instance;
    let nursing = $("#nursing").val();
    let room = $("#room").val();
    let misc = $("#misc").val();
    let surgery = $("#surgery").val();

    One.deployed()
      .then(function(Instance) {
        var instance = Instance;
        return instance.Hospitalcharges(nursing, room, misc, surgery, {
          from: account,
          gas: 3500000
        });
      })
      .then(function() {
        console.log("one complete");
      })
      .catch(function(e) {
        console.log(e);
      });

    // self.display();

    // this.setStatus("Initiating transaction... (please wait)");
  },

  PharmacyCharges: function() {
    var self = this;
    var Instance;
    let medicine = $("#medicine").val();

    One.deployed()
      .then(function(Instance) {
        var instance = Instance;
        return instance.PharmacyCharges(medicine, {
          from: account,
          gas: 3500000
        });
      })
      .then(function() {
        console.log("one complete");
      })
      .catch(function(e) {
        console.log(e);
      });

    // self.display();

    // this.setStatus("Initiating transaction... (please wait)");
  },

  TotalCharges: function() {
    var self = this;
    var Instance;

    var total = $("#total").val();
    var claimedamt = $('#claimed').val();

    One.deployed()
      .then(function(Instance) {
        var instance = Instance;
        return instance.TotalCharges(total,claimedamt, {
          from: account,
          gas: 3500000
        });
      })
      .then(function() {
        console.log("one complete");
      })
      .catch(function(e) {
        console.log(e);
      });

    // self.display();

    // this.setStatus("Initiating transaction... (please wait)");
  },

  CheckConditions: function() {
    var self = this;
    var Instance;
    var total = $("#total").val();
    window.App2.TotalCharges();
    window.App2.Hospitalcharges();
    window.App2.PharmacyCharges();

    One.deployed()
      .then(function(Instance) {
        var instance = Instance;
        return instance.CheckConditions({
          from: account,
          gas: 3500000
        });
      })
      .then(function() {
        console.log("one complete");
      })
      .catch(function(e) {
        console.log(e);
      });

    // self.display();

    // this.setStatus("Initiating transaction... (please wait)");
  },

  Type_of_claim: function() {
    var self = this;
    var Instance;
    let claimtype = $("#claim-type").val();

    One.deployed()
      .then(function(Instance) {
        var instance = Instance;
        return instance.Type_of_claim(claimtype, {
          from: account,
          gas: 3500000
        });
      })
      .then(function() {
        console.log("one complete");
      })
      .catch(function(e) {
        console.log(e);
      });

    // self.display();

    // this.setStatus("Initiating transaction... (please wait)");
  },

  final_Check: function() {
    var self = this;
    var Instance;
    // let claimtype = $("#claim-type").val();

    window.App2.CheckConditions();
    window.App2.claim_intimation();

    One.deployed()
      .then(function(Instance) {
        var instance = Instance;
        return instance.final_Check({ from: account, gas: 3500000 });
      })
      .then(function(msg) {
        console.log("one complete");
        console.log("hello:", msg);
      })
      .catch(function(e) {
        console.log(e);
      });

    // self.display();

    // this.setStatus("Initiating transaction... (please wait)");
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  LabCharges: function() {
    var self = this;
    var no2;
    var investigation = parseInt(
      document.getElementById("investigation").value
    );

    One.deployed()
      .then(function(instance) {
        no2 = instance;
        return no2.LabCharges(investigation, { from: account });
      })
      .then(function() {
        console.log("one complete");
      })
      .catch(function(e) {
        console.log(e);
      });

    // self.display();

    this.setStatus("Initiating transaction... (please wait)");
  },

  display: function() {
    var self = this;

    var no3;

    One.deployed()
      .then(function(instance) {
        no3 = instance;
        return no3.print({ from: account });
      })
      .then(function(msg) {
        console.log(msg.c[0]);
        $("#naman").html(msg.c[0]);
      })
      .catch(function(e) {
        console.log(e);
      });

    this.setStatus("Initiating transaction... (please wait)");
  },

  myFun: function() {
    var self = this;
    console.log("iiasd");
  },
  submitForm: function() {
    event.preventDefault();

    console.log($(form).serializeArray());

    window.App2.claim_intimation();
    window.App2.CheckConditions();
    window.App2.final_Check();
  },

  checkapi: function() {
    var authorizationToken = "Bearer rx7pdL9IpEktjit02qILsi5rOG4Vv61T4z/uvGXkJyLL6dqqpDCKZf/a4FDyZ2T8P1LOoQo0j9IyTWg974ESxQ==";
     
    var yourdata = {
      Inputs: {
        input1: [
          {
            Fraud_Flag: "",
            Claimno: 100,
            TypeofClaim: "Cashless Claim",
            PolicyNumber: "777775555A100000100",
            Policytype: "Retail",
            ProductName: "ABC family policy",
            planname: "Bronze",
            PolicyStartDate: 42625,
            PolicyEndDate: 42989,
            premium: 7107,
            SI: 200000,
            InsuranceCompany: "DD",
            DateOfBirth: 33251,
            Gender: "Female",
            Dateof_ClaimIntimation: 42645,
            Diagnosis_Code_Level_I: "N39",
            Procedure_Code_Level_I: "N39",
            HospitalCode: 112004,
            Name_Of_The_Hospital: "JMC",
            Hospital_Address: "DLF",
            Hospital_State: "HARYANA",
            Hospital_City: "GURGAON",
            Registration_Number_of_Hospital: 1123004,
            Pan_of_Hospital: "JJDDB004",
            Pincode_of_Hospital: 121004,
            Date_of_Discharge: 42648,
            ClaimedAmount: 90000,
            NursingCharges: 4905,
            RoomCharges: 6867,
            SurgeryCharges: 10900,
            InvestigationCharges: 9810,
            MedicineCharges: 14715,
            MiscellaneousCharges: 9000,
            "Total Charges": 87000
          }
        ]
      },
      GlobalParameters: {}
    };  
    var url = "https://ussouthcentral.services.azureml.net/workspaces/935fad7d57da46d88f0caf34ed89a9c6/services/c4f2e83c1b8444ba829b62f5202db6c7/execute?api-version=2.0&format=swagger";

  

    $.ajax({
      url: url,
      Headers: {
        "Authorization": authorizationToken,
        "Content-Type": "application/json"
      },
      method: "POST",
      dataType: "jsonp",
      data: yourdata,
      success: function(data) {
        console.log("succes: " + data);
      },
      error: function() {
        alert("Failed!");
      }
    });


  }
};





window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  }

  App.start();
  App2.start();
});
