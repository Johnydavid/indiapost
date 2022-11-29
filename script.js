// Title of the Webpage

const pageDiv = document.createElement("div");
document.body.append(pageDiv);

const titleDiv = document.createElement("div");
pageDiv.append(titleDiv);
titleDiv.className = "titleClass";

const emblem = document.createElement("div");
emblem.className = "emblemClass";
titleDiv.append(emblem);

//  Search Div

const searchDiv = document.createElement("div");
searchDiv.className = "searchClass";

const search = document.createElement("input");

search.id = "search";
search.type = "text";

search.placeholder = "Enter your Pincode";
search.className = "searchClass";
search.maxLength = 6;

// Function to validate numeric input

function numeralsOnly(event) {
  //getting key code of pressed key

  var key = event.key;

  var search = document.getElementById("search");
  //comparing pressed keycodes
  if (
    !(
      key === 8 ||
      key === 46 ||
      key === 13 ||
      key < 48 ||
      key > 57 ||
      key > 95 ||
      key < 105
    )
  ) {
    {
      alert("Enter numerals only in this field.");

      return false;
    }
  }
}

search.addEventListener("keypress", numeralsOnly);

searchDiv.append(search);

btnDiv = document.createElement("div");
btnDiv.className = "btnClass";

const submit = document.createElement("button");
submit.innerText = "Search";
submit.id = "submit";
submit.className = "btn btn-success";

btnDiv.append(submit);

document.body.append(searchDiv, btnDiv);

//  Main DIV
const mainDiv = document.createElement("div");

mainDiv.className = "table-responsive";

document.body.append(mainDiv);

// ---------------------

const showData = (event) => {
  event.preventDefault();

  mainDiv.innerText = "";

  const getData = async () => {
    try {
      var data = [];

      const code = search.value;
      const api = await fetch("https://api.postalpincode.in/pincode/" + code);
      const pin = await api.json();

      for (i = 0; i < pin.length; i++) {
        const post = pin[i].PostOffice;
        data = post;
      }

      if (data == null) {
        alert("Enter Valid Pincode");
      } else {
        // // Creating Table Elements
        const tableEle = document.createElement("table");
        tableEle.className = " table table-info";

        tableEle.id = "table";

        // Creating Table Head Elements
        const theadEle = document.createElement("thead");
        theadEle.className = "table-dark";

        // Creating Table Tr Elements
        const trEle = document.createElement("tr");

        ["PostOffice Name", "Block", "District", "State", "Pincode"].forEach(
          (columnName) => {
            // Creating Table Head Elements
            const thEle = document.createElement("th");
            thEle.innerText = columnName;
            trEle.appendChild(thEle);
          }
        );

        theadEle.appendChild(trEle);

        // Creating Table Body Elements
        const tbodyEle = document.createElement("tbody");

        const innerTr = document.createElement("tr");
        tbodyEle.appendChild(innerTr);
        tableEle.append(theadEle, tbodyEle);

        mainDiv.appendChild(tableEle);

        let names = data.map((item) => item.Name);

        let districts = data.map((item) => item.District);

        let blocks = data.map((item) => item.Block);

        let states = data.map((item) => item.State);

        let pincodes = data.map((item) => item.Pincode);

        const bodyNameTd = document.createElement("td");
        const bodyDistTd = document.createElement("td");
        const bodyBlockTd = document.createElement("td");
        const bodyStateTd = document.createElement("td");
        const bodyPinTd = document.createElement("td");
        innerTr.append(
          bodyNameTd,
          bodyDistTd,
          bodyBlockTd,
          bodyStateTd,
          bodyPinTd
        );

        names.forEach((name) => {
          const bodyTr = document.createElement("tr");
          const nameTd = document.createElement("td");
          nameTd.innerText = name;

          bodyTr.append(nameTd);
          bodyNameTd.append(bodyTr);
        });

        districts.forEach((dist) => {
          const bodyTr = document.createElement("tr");

          const distTd = document.createElement("td");
          distTd.innerText = dist;
          bodyTr.append(distTd);
          bodyDistTd.append(bodyTr);
        });

        blocks.forEach((blk) => {
          const bodyTr = document.createElement("tr");

          const blkTd = document.createElement("td");
          blkTd.innerText = blk;
          bodyTr.append(blkTd);
          bodyBlockTd.append(bodyTr);
        });

        states.forEach((state) => {
          const bodyTr = document.createElement("tr");

          const stateTd = document.createElement("td");
          stateTd.innerText = state;
          bodyTr.append(stateTd);
          bodyStateTd.append(bodyTr);
        });

        pincodes.forEach((pincode) => {
          const bodyTr = document.createElement("tr");

          const pincodeTd = document.createElement("td");
          pincodeTd.innerText = pincode;
          bodyTr.append(pincodeTd);
          bodyPinTd.append(bodyTr);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getData();
  document.getElementById("search").value = "";
  // }
};

const get = (event) => {
  if (event.keyCode == 13) {
    event.preventDefault();
    document.getElementById("submit").click();
  }
};

submit.addEventListener("click", showData);

search.addEventListener("keydown", get);
