const newsToShow = 3;

fetch("news/news.json")
    .then(response => response.json())
    .then(news => {
        const feed = document.getElementById("news-feed");

        const relevantNews = news
            .filter(item => item.tags.includes(newsCategory))
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        let visibleCount = newsToShow;

        function displayNews() {
            feed.innerHTML = "";

            relevantNews.forEach((item, index) => {
                if (index < visibleCount) {
                    const article = document.createElement("article");

                    article.classList.add("news-card");
                    article.classList.add("news-grid");

                    article.innerHTML = `
                        <a href="${item.link}">
                            <h3>${item.title}</h3>
                            <p>${item.date}</p>
                        </a>
                    `;

                    feed.appendChild(article);
                }
            });

            // Hide the button if all articles are visible
            if (visibleCount >= relevantNews.length) {
                seeMore.style.display = "none";
            } else {
                seeMore.style.display = "block";
            }
        }

        const seeMore = document.createElement("button");
        seeMore.textContent = "See more";
        seeMore.classList.add("see-more");

        seeMore.addEventListener("click", () => {
            visibleCount += 3;
            displayNews();
        });

        feed.after(seeMore);

        displayNews();
    })
    .catch(error => console.error("Error loading news:", error));