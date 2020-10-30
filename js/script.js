// Store DOM elements in variables for later use
const quote = document.getElementById("text");
const author = document.getElementById("author");
const quoteBtn = document.getElementById("getQuote");
const twitter = document.getElementById("twitter");
// Function to Quote to Twitter
const shareTwitter = () => {
    window.open('https://twitter.com/intent/tweet?text=' +
        encodeURIComponent('"' + quote.innerHTML + '"' + "  -" + author.innerHTML));
};
// Generates a Quote using a Random Number
const generateQuote = (data) => {
    quoteBtn.addEventListener('click', function () {
        let num = Math.floor(Math.random() * data.length);
        quote.innerHTML = data[num]["text"];
        author.innerHTML = data[num]["from"];
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
            generateQuote(data);

        })
        .catch((err) => {
            console.log('Quote file is missing');
        })
}
// Execute higher order function
getQuotes();