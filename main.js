const grossAnnualIncome = document.getElementById('gross-annual-income');
const extraIncome = document.getElementById('extra-income');
const ageGroup = document.getElementById('age-group');
const applicableDeductions = document.getElementById('applicable-deductions');
const form = document.getElementById('taxCalculator');


const MAX_TAX_FREE_EARNING = 800000;


function checkValidInputs(GAI, EI, AD, AG) {

    // checking the two possibilities either the string is empty or it cannot be converted into a valid number 

    if (isNaN(GAI) || GAI === '' || Number(GAI) < 0) {
        grossAnnualIncome.nextElementSibling.style.display = 'inline-block';
    }else {
        grossAnnualIncome.nextElementSibling.style.display = 'none';
    }

    if (isNaN(EI) || EI === '' || Number(EI) < 0) {
        extraIncome.nextElementSibling.style.display = 'inline-block';
    }else {
        extraIncome.nextElementSibling.style.display = 'none';
    }

    if (isNaN(AD) || AD === '' || Number(AD) < 0) {
        applicableDeductions.nextElementSibling.style.display = 'inline-block';
    }else {
        applicableDeductions.nextElementSibling.style.display = 'none';
    }

    if (AG === '') {
        ageGroup.nextElementSibling.style.display = 'inline-block';
    }else {
        ageGroup.nextElementSibling.style.display = 'none';
    }

    // edge case: isNaN returns false when passed an empty string so we check for it separately
    if (GAI === '' || EI === '' || AD === '' || AG === '') return false;


    if (isNaN(GAI) || isNaN(EI) || isNaN(AD)) {
        return false;
    }
    else if (Number(GAI) < 0 || Number(EI) < 0 || Number(AD) < 0) { // Checking for negative inputs (edge case)
        return false;
    }else {
        return true;
    }
}


function closeResultPage() {

    // After the result page is closed do the state cleanup

    const resultPage = document.getElementById('result-page');
    document.getElementById('content').removeChild(resultPage);

    grossAnnualIncome.value = "";
    extraIncome.value = "";
    ageGroup.value = null;
    applicableDeductions.value = "";
}



function displayResult(AmountAfterTaxReduction) {

    // Display the result page by creating and appending a new element into the DOM


    if ( AmountAfterTaxReduction < 0) {

        // in case of a negativ overall income that means there is an error in user input so we do an alert message

        alert("Please check your input values. Your overall income turns out to be negative");
        AmountAfterTaxReduction = 0;
    }


    const resultContent = `
        <div class="result-data">
            <h1>Your overall income will be</h1>
            <h2>${AmountAfterTaxReduction.toLocaleString()}</h2>
            <h4>after tax deductions</h4>
        </div>
        <button id="closeResult" onclick=closeResultPage()>close</button>`

    const child = document.createElement("div");
    child.id = "result-page";
    child.classList.add("result");
    child.innerHTML = resultContent

    document.getElementById('content').appendChild(child);

    return 0;

}



form.addEventListener('submit', e => {
    e.preventDefault();

    const isvalid = checkValidInputs(grossAnnualIncome.value, extraIncome.value, applicableDeductions.value, ageGroup.value);

    if (isvalid) {
        const overallIncome = Number(grossAnnualIncome.value) + Number(extraIncome.value) - Number(applicableDeductions.value);

        let taxAmount = 0;
        let AmountAfterTaxReduction = overallIncome;

        if (overallIncome > MAX_TAX_FREE_EARNING) {

            // Calculating the tax based on the age group 

            const age = ageGroup.value;
            if (age == '40') {
                let taxrate = 0.3;
                taxAmount = (overallIncome * taxrate)
                AmountAfterTaxReduction = AmountAfterTaxReduction - taxAmount;
            }
            else if (age == '40-60') {
                let taxrate = 0.4;
                taxAmount = (overallIncome * taxrate)
                AmountAfterTaxReduction = AmountAfterTaxReduction - taxAmount;
            }
            else {
                let taxrate = 0.1;
                taxAmount = (overallIncome * taxrate)
                AmountAfterTaxReduction = AmountAfterTaxReduction - taxAmount;
            }
        }

        displayResult(AmountAfterTaxReduction);

    }
})