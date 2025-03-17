document.addEventListener("DOMContentLoaded", () => {
    const newQuoteBtn = document.querySelector('#btn-new-quote');
    const quotecontainer = document.querySelector('.quotes');
    const copyButton = document.querySelector('#btn-copy-clipboard');
    const shareButton = document.querySelector('#Share-to-twitter');

    let content = ""; 
    let author = "";
    const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    const getquotes = async () => {
        try {
            let response = await fetch(url, options);
            let Data = await response.json();

            
            quotecontainer.innerHTML = '';

            if (Data.success && Data.data && Data.data.content) {
                const content = Data.data.content;
                const author = Data.data.author;

                
                const quoteElement = document.createElement('p');
                const authorElement = document.createElement('h4');

                quoteElement.innerText = content; 
                authorElement.innerText = `- ${author}`; 

                quotecontainer.appendChild(quoteElement);
                quotecontainer.appendChild(authorElement);
            } else {
                console.error('Invalid API response:', data);
                quotecontainer.innerText = "Error fetching quote. Try again!";
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
            quotecontainer.innerText = "Failed to fetch quote!";
        }
    };

    newQuoteBtn.addEventListener("click", getquotes);

    copyButton.addEventListener("click", () => {
        const quoteText = quotecontainer.innerText;
        navigator.clipboard.writeText(quoteText);
        alert("Copied the text: " + quoteText);
    });
    
    shareButton.addEventListener("click", () => {
        const tweetText = `${content} ${author}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(twitterUrl, '_blank');
    });
});
