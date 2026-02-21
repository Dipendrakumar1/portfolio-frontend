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
import SubDiary from './components/SubDiary'
import Projects from './components/Projects'
import WorkWithMe from './components/WorkWithMe'
import useAnalytics from './hooks/useAnalytics'

function AppContent() {
  useAnalytics();
  return (
    <>
      <Navbar />
      <MenuRow />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutme" element={<MoreAboutMe />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/mydiary" element={<MyDiary />} />
        <Route path="/mydiary/:slug" element={<SubDiary />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/hire-me" element={<WorkWithMe />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <GlobalStyle />
      <SiteContainer>
        <SiteContainer>
          <AppContent />
        </SiteContainer>
      </SiteContainer>
    </HelmetProvider>
  )
}
