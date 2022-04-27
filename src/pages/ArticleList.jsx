import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';

export default function ArticleList() {
  const [totalArticles, setTotalArticles] = useState(12);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getArticles = async () => {
      const request = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${totalArticles}`);
      const response = await request.json();

      setArticles(response);
    };

    getArticles();
    setLoading(false);
  }, [totalArticles]);

  const loadMoreArticleHandler = () => {
    setTotalArticles(totalArticles + 6);
  };

  document.title = articles ? 'Space News' : 'Loading ...';

  return (
    <section id="articles">
      <div className="flex flex-col items-center max-w-screen-lg gap-16 px-6 mx-auto">
        {loading && <Loading />}
        {!loading && (
          <>
            <ul className="sm:grid-cols-2 lg:grid-cols-3 grid self-stretch gap-8">
              {articles.map((article) => (
                <li key={article.id}>
                  <Link className="bg-slate-800 rounded-xl flex flex-col h-full gap-4 p-4" to={`/article/${article.id}/`} title={article.title}>
                    <img className="rounded-xl aspect-4/3 object-cover" src={article.imageUrl} alt={article.title} loading="lazy" />
                    <p className="line-clamp-2 text-xl font-medium">{article.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <button className="bg-primary active:scale-95 active:origin-center px-6 py-2 font-bold transition-transform rounded-md" type="button" title="Load More" onClick={loadMoreArticleHandler}>Load More</button>
          </>
        )}
      </div>
    </section>
  );
}
