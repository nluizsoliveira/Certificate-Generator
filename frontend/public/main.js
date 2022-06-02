const validateCodes = function(e){
    e.preventDefault();
    const codeInputs = document.getElementsByClassName("codeInput")
    const [filledCodeValues, filledQty] = getFilledCodeValues(codeInputs)

    alertAllFilledNull(filledQty)

    const email = getEmail()
    const name = getName()

    if(email && name && filledQty) {
        sendForm(filledCodeValues, email, name)
    }
    return false;
}

const getFilledCodeValues = function(codeInputs){
    filledCodeValues = {}
    let index = 1;
    let filledQty = 0; 
    for (const codeInput of codeInputs) {
        if (codeInput.value == ""){
            filledCodeValues[index] = "000000"
        } else{
            filledCodeValues[index] = codeInput.value
            filledQty+=1;
        }
        index++;
    }
    return [filledCodeValues, filledQty]
}

const alertAllFilledNull = (filledQty) => {
    const ERROR_MSG = "ERRO: Preencher ao menos um código."
    if(!filledQty) {
        alert(ERROR_MSG)
    }
}


const getDictLen = (dict) =>{
    return Object.keys(dict).length 
}

const getEmail = () => {
    const email = document.getElementById("email").value
    return email
}

const getName = () => {
    const name = document.getElementById("name").value
    return name
}

const sendForm = (filledCodeValues, email, name) =>{
    const port = '3000'
    const url = "http://localhost:" + port + "/"

    const data = JSON.stringify(
        {
            filledCodeValues: filledCodeValues,
            email: email,
            name: name
        }
    )

    fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((res) => res.json())
        .then((processedData) => {
            alertAllFilledInvalid(processedData.validValuesQty)
            const dataString = JSON.stringify(processedData);
            if(processedData.validValuesQty > 0){
                console.log("DATA STRING ", dataString)
                const downloadUrl = url + "download";
                fetch(downloadUrl, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: dataString,
                  })
                .then((res2) => 
                    res2.blob()
                )
                .then((blob)=>{
                    const newBlob = new Blob([blob]);
                    const newUrl = window.URL.createObjectURL(newBlob);

                    const link = document.createElement('a');
                    link.href = newUrl;
                    link.setAttribute('download', 'certificate.pdf');
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);

                    window.URL.revokeObjectURL(newBlob);
                })
            }
        })
}

const alertAllFilledInvalid = (validValuesQty) => {
    const ERROR_MSG = "ERRO: Nenhum código está correto."
    if(!validValuesQty){
        alert(ERROR_MSG)
    }
}