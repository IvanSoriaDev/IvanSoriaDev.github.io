const HASHNODE_API_URL = 'https://api.hashnode.com/';
const USER_ARTICLES_QUERY = `
    query GetUserArticles($page: Int!) {
        user(username: "IvanSoria") {
            publication {
                posts(page: $page) {
                    title
                    brief
                    slug
                    coverImage
                }
            }
        }
    }
`;

async function gql(query, variables = {}) {
    try {
        const response = await fetch(HASHNODE_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

function createArticleElement(article) {
    const container = document.createElement('div');
    container.className = 'col-lg-4 col-xs-1 border';

    const coverImage = document.createElement('img');
    coverImage.src = article.coverImage;

    const title = document.createElement('h3');
    title.innerText = article.title;

    const brief = document.createElement('p');
    brief.innerText = article.brief;

    const link = document.createElement('a');
    link.innerText = 'Read more...';
    link.target = '_blank';
    link.href = `https://ivansoria.hashnode.dev/${article.slug}`;

    container.append(coverImage, title, brief, link);
    return container;
}

async function displayUserArticles() {
    const result = await gql(USER_ARTICLES_QUERY, { page: 0 });

    if (result && result.data && result.data.user) {
        const articles = result.data.user.publication.posts;
        const articlesContainer = document.querySelector('#blog-articles');

        articles.forEach(article => {
            articlesContainer.appendChild(createArticleElement(article));
        });
    }
}

function smoothScrollingToAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayUserArticles();
    smoothScrollingToAnchors();
});