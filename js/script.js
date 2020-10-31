// Store DOM elements in variables for later use
const quote = document.getElementById("text");
const author = document.getElementById("author");
const quoteBtn = document.getElementById("getQuote");
const twitter = document.getElementById("twitter");
// Function to send Quote to Twitter
const shareTwitter = () => {
    window.open('https://twitter.com/intent/tweet?text=' +
        encodeURIComponent('"' + quote.innerHTML + '"' + "  -" + author.innerHTML));
};

// Filter out quotes too long for my quote box
const quoteFilter = (data) => {
    const quotes = data.filter(x => {
        if (x["text"].length < 72 && x["from"].length < 24) {
            return true;
        }
    })
    return quotes;
};

// Function to select a quote at Random from Quote's Object
const selectQuote = (data) => {
    let num = Math.floor(Math.random() * data.length);
    quote.innerHTML = data[num]["text"];
    author.innerHTML = data[num]["from"];
}

// Generates a Quote using a Random Number
const generateQuote = (data) => {
    quoteBtn.addEventListener('click', function () {
        selectQuote(data);
    });
    twitter.addEventListener('click', function () {
        shareTwitter();
    });
};

// Async fetch of quotes hosted on Github
const getQuotes = async () => {
    const endpoint = `https://raw.githubusercontent.com/adamrichardturner/quotes/master/js/leaders.json`;
    fetch(endpoint)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const quotes = quoteFilter(data);
            selectQuote(quotes);
            generateQuote(quotes);
        })
        .catch((err) => {
            console.log('Quote file is missing');
        });
};

// Execute higher order function
getQuotes();