
let tibberApiUrl = "https://api.tibber.com/v1-beta/gql";
let token = "ENTER_YOUR_API_TOKEN_HERE"; // Replace with your token

let headers = {"Authorization": "Bearer " + token, "Content-Type": "application/json"};

let query = "{viewer {homes {currentSubscription {priceInfo {current {total}}}}}}";
let requestBody = JSON.stringify({ query: query });

Shelly.call(
    "HTTP.REQUEST",
    {
    method: "POST",
    url: tibberApiUrl,
    headers: headers,
    body: requestBody
    },
    function (response, error_code, error_message) {
        // Price data successfully fetched
        if (error_code === 0 && response.code === 200 && response.message === "OK") {
            errorCount = 0;
            let tibber = JSON.parse(response.body);
            let currentPrice = tibber.data.viewer.homes[0].currentSubscription.priceInfo.current.total;
            print("Current price: ", currentPrice);
        } 
        // Price data could not be fetched
        else {
            print("Error: ", error_code);
            print("Error: ", error_message);
        }
    }
);

