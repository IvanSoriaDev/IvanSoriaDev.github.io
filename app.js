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
        let container = document.createElement('div');

        articles.forEach(article => {
            let coverImage = document.createElement('img');
            coverImage.src = article.coverImage;
            let title = document.createElement('h2');
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
        })

        document.querySelector('.app').appendChild(container);
});

document.getElementById('blog-articles').innerHTML = `
<div class="app">
</div>`;