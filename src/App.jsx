import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import GlobalStyle, { SiteContainer } from './styles/GlobalStyles'
import Home from './components/Home'
import Navbar from './components/Navbar'
import MenuRow from './components/MenuRow'
import MoreAboutMe from "./components/MoreAboutMe";
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import MyDiary from './components/MyDiary'
import DiaryDetail from './components/DiaryDetail'
import Projects from './components/Projects'

export default function App() {
  return (
    <HelmetProvider>
      <GlobalStyle />
      <SiteContainer>
        <Navbar />
        <MenuRow />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutme" element={<MoreAboutMe />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/mydiary" element={<MyDiary />} />
          <Route path="/mydiary/:slug" element={<DiaryDetail />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </SiteContainer>
    </HelmetProvider>
  )
}
