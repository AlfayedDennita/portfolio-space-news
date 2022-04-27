import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../components/Loading';
import RandomArticles from '../components/RandomArticles';

export default function ArticleDetail() {
  const params = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getArticle = async () => {
      const request = await fetch(`https://api.spaceflightnewsapi.net/v3/articles/${params.articleId}`);
      const response = await request.json();

      setArticle(response);
      setLoading(false);
    };

    getArticle();
  }, [params]);

  document.title = article.title ? `${article.title} | Space News` : 'Loading ...';

  return (
    <>
      <article>
        <div className="flex flex-col max-w-screen-lg gap-12 px-6 mx-auto">
          {loading && <Loading />}
          {!loading && (
            <>
              <div className="border-slate-800 flex flex-col gap-4 pb-8 border-b-2">
                <h2 className="text-2xl font-bold">{article.title}</h2>
                <p className="text-slate-400">
                  Published at <time>{new Date(article.publishedAt).toLocaleDateString()}</time> |
                  Source: <span className="text-primary">{article.newsSite}</span>
                </p>
              </div>
              <div className="sm:flex-row flex flex-col gap-8">
                <img className="aspect-4/3 sm:w-1/2 object-cover rounded-lg" src={article.imageUrl} alt={article.newsTitle} loading="lazy" />
                <div className="flex flex-col gap-4">
                  <p>{article.summary}</p>
                  <a className="text-primary font-bold" href={article.url} target="_blank" rel="noreferrer" title="Read More">Read More ...</a>
                </div>
              </div>
            </>
          )}
        </div>
      </article>
      <aside>
        <div className="flex flex-col max-w-screen-lg gap-8 px-6 mx-auto">
          {!loading && (
            <>
              <h3 className="text-2xl font-bold">More Articles:</h3>
              <RandomArticles limits={4} />
            </>
          )}
        </div>
      </aside>
    </>
  );
}
