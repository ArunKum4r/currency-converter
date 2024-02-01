window.addEventListener('load', async() => {
    const from = document.querySelector('#from')
    const to = document.querySelector('#to')
    const form = document.querySelector('.hero--form')
    const disph2 = document.querySelector('.disp-ansh2')
    const disph4 = document.querySelector('.disp-ansh4')
    const dispp = document.querySelector('.disp-ansp')
    const button = document.querySelector('.form-button')
    const swap = document.querySelector('.fa-arrow-right-arrow-left')
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('.nav--links')
    const amt = document.querySelector("#amount");

    amt.addEventListener("keydown", (e) => {
      let arr = ["e", "E", "-", "+"];
      console.log(e.key);
      if (arr.includes(e.key)) {
        e.preventDefault();
        return false;
      }
    });

    burger.addEventListener("touchstart", () => {
      nav.classList.toggle("nav--links");
      nav.classList.toggle("nav--links__open");
    });

    let fromdata;
    let amount;
    let toData;
    let formdata;

    const response = await fetch(
      "https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_oP3o9coOxPrLTWSgr7MdOOwuWQmN0ZvCWt0gJ4LX&currencies=&base_currency=INR"
    );
    const currency = await response.json();
    const currencies = await currency.data;
    console.log(currencies);

    for (let key in currencies) {
      if (currencies.hasOwnProperty(key)) {
        let code = currencies[key].code;
        let name = currencies[key].name;

        const option = document.createElement("option");
        option.setAttribute("value", code);
        option.innerText = `${code} - ${name}`;
        from.appendChild(option);
      }
    }

    for (let key in currencies) {
      if (currencies.hasOwnProperty(key)) {
        let code = currencies[key].code;
        let name = currencies[key].name;

        const option = document.createElement("option");
        option.setAttribute("value", code);
        option.innerText = `${code} - ${name}`;
        to.appendChild(option);
      }
    }

    form.onsubmit = async function (e) {
      e.preventDefault();
      formdata = new FormData(form);
      fromdata = formdata.get("from");
      amount = formdata.get("amount");
      toData = formdata.get("to");

      const convert = await fetch(
        `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_oP3o9coOxPrLTWSgr7MdOOwuWQmN0ZvCWt0gJ4LX&currencies=${toData}&base_currency=${fromdata}`
      );
      const data = await convert.json();
      button.innerText = "Converting...";
      let answer = amount * data.data[toData];
      let fromName;
      let toName;

      if (amount <= 1) {
        fromName = currencies[fromdata].name;
      } else {
        fromName = currencies[fromdata].name_plural;
      }

      if (answer <= 1) {
        toName = currencies[toData].name;
      } else {
        toName = currencies[toData].name_plural;
      }

      if (answer) {
        button.innerText = "Convert";
      }

      // disp.innerText = `${amount} ${fromdata} = ${answer.toFixed(2)}${toData}`

      disph4.innerText = `${amount}.00 ${fromName} =`;
      disph2.innerText = `${answer.toFixed(2)} ${toName}`;
      dispp.innerText = `1 ${fromdata} = ${data.data[toData]} ${toData}`;
    };
    

    swap.addEventListener('click', () => {
        let temp = to.value
        to.value = from.value
        from.value = temp
    })
})