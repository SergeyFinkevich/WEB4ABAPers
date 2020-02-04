function Upload_currency_rates() {
    let input, file, fr;

    if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
        document.getElementById("currency_error_message").innerHTML = "Um, couldn't find the fileinput element.";
        set_error_message_style('currency_error_message', '20px')
    } else if (!input.files) {
        document.getElementById("currency_error_message").innerHTML = "This browser doesn't seem to support the `files` property of file inputs.";
        set_error_message_style('currency_error_message', '20px')
    } else if (!input.files[0]) {
        document.getElementById("currency_error_message").innerHTML = "Please select a file before clicking 'Load.'";
        set_error_message_style('currency_error_message', '20px')
    } else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }

    function receivedText(e) {
        let x, table_rates = "";
        let lines = e.target.result;

        var newArr = JSON.parse(lines);

        flush_errors()
        table_rates += "<table border='1'>"
        table_rates += "<tr><th>Currency</th><th>Buy</th><th>Sell</th></tr>";
        for (x in newArr.Excange_Rates) {
            table_rates += "<tr>";
            table_rates += "<td>" + newArr.Excange_Rates[x].currency + "</td>";
            table_rates += "<td>" + newArr.Excange_Rates[x].Buy + "</td>";
            table_rates += "<td>" + newArr.Excange_Rates[x].Sell + "</td>";
            table_rates += "</tr>";
        }
        table_rates += "</table>";
        document.getElementById("curr_show").innerHTML = table_rates;
    }
}