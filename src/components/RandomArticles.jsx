import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RandomArticles({ limits }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const request = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${limits}`);
      const response = await request.json();

      setArticles(response);
    };

    getArticles();
  }, []);

  return (
    <ul className="md:grid-cols-2 grid gap-8">
      {articles.map((article) => (
        <li key={article.id}>
          <Link className="flex gap-4" to={`/article/${article.id}`} title={article.title}>
            <img className="aspect-4/3 object-cover w-1/4 rounded-lg" src={article.imageUrl} alt={article.title} loading="lazy" />
            <p className="line-clamp-3">{article.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

RandomArticles.propTypes = {
  limits: PropTypes.number.isRequired,
};
