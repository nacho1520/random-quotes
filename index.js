window.addEventListener('load', () => {
    const author = document.querySelector('.author');
    const quote = document.querySelector('.quote');
    const regroupBtn = document.querySelector('.regroup-btn');
    const copyBtn = document.querySelector('.link-btn');
    const tagsContainer = document.querySelector('.tags-container');

    const fetchQuote = () => {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
              console.log(data);
              author.textContent = data.author;
              quote.textContent =  `"${ data.content }"`;
              tagsContainer.textContent = '';
              data.tags.forEach(tag => {
                console.log(tag);
                const span = document.createElement("span");
                const textNode = document.createTextNode(tag);
                span.appendChild(textNode);
                tagsContainer.appendChild(span);
              });
            })
            .catch(error => {
              console.log(error)
            })
    }

    regroupBtn.addEventListener('click', () => {
        fetchQuote();
    });
    
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(quote.innerHTML);
        copyBtn.src = "./assets/copied.svg";

        setTimeout(() => {
            copyBtn.src = "./assets/link.svg";
        }, 3000);
    });
});