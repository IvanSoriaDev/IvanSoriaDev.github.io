async function gql(query, variables={}) {
    const data = await fetch('https://api.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    return data.json();
}

const GET_USER_ARTICLES = 
    `query GetUserArticles($page: Int!) {
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

gql(GET_USER_ARTICLES, { page: 0 })
    .then(result => {

        const articles = result.data.user.publication.posts;

        articles.forEach(article => {
            let container = document.createElement('div');
            container.className = 'col-lg-4 col-xs-1 border'

            let coverImage = document.createElement('img');
            coverImage.src = article.coverImage;
            let title = document.createElement('h3');
            title.innerText = article.title;

            let brief = document.createElement('p');
            brief.innerText = article.brief;

            let link = document.createElement('a');
            link.innerText = 'Read more...';
            link.target = '_blank'
            link.href = `https://ivansoria.hashnode.dev/${article.slug}`;

            container.appendChild(coverImage);
            container.appendChild(title);
            container.appendChild(brief);
            container.appendChild(link);
            document.querySelector('#blog-articles').appendChild(container);
        })
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});