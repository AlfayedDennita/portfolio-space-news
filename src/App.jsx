import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex flex-col min-h-screen gap-20 py-16">
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:articleId" element={<ArticleDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
