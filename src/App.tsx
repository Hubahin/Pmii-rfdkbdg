/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { SlideMenu } from './components/SlideMenu';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MissionSection } from './components/MissionSection';
import { KopriSection } from './components/KopriSection';
import { TeamSection } from './components/TeamSection';
import { DownloadsSection } from './components/DownloadsSection';
import { NewsSection } from './components/NewsSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { api } from './services/api';
import { AboutContent, Article, DownloadFile, GalleryItem, KopriContent, TeamMember } from './types';
import {
  INITIAL_ABOUT,
  INITIAL_ARTICLES,
  INITIAL_DOWNLOADS,
  INITIAL_GALLERY,
  INITIAL_KOPRI,
  INITIAL_TEAM
} from './data/initialData';

function MainApp() {
  const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Dynamic CMS state initialized with authentic seed data
  const [about, setAbout] = useState<AboutContent>(INITIAL_ABOUT);
  const [kopri, setKopri] = useState<KopriContent>(INITIAL_KOPRI);
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [downloads, setDownloads] = useState<DownloadFile[]>(INITIAL_DOWNLOADS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  const fetchData = useCallback(async () => {
    try {
      const [aboutRes, kopriRes, teamRes, articlesRes, downloadsRes, galleryRes] =
        await Promise.all([
          api.getAbout(),
          api.getKopri(),
          api.getTeam(),
          api.getArticles(),
          api.getDownloads(),
          api.getGallery()
        ]);
      if (aboutRes) setAbout(aboutRes);
      if (kopriRes) setKopri(kopriRes);
      if (teamRes) setTeam(teamRes);
      if (articlesRes) setArticles(articlesRes);
      if (downloadsRes) setDownloads(downloadsRes);
      if (galleryRes) setGallery(galleryRes);
    } catch (err) {
      console.warn('Fallback to initial state:', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'mission', 'kopri', 'team', 'news', 'downloads', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1128] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        onOpenSlideMenu={() => setIsSlideMenuOpen(true)}
        activeSection={activeSection}
      />

      {/* Slide-out Menu (10 points requested) */}
      <SlideMenu
        isOpen={isSlideMenuOpen}
        onClose={() => setIsSlideMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onGetStarted={() => handleNavigate('about')}
          onExploreDownloads={() => handleNavigate('downloads')}
        />

        {/* About Section */}
        <AboutSection
          about={about}
          onExploreKopri={() => handleNavigate('kopri')}
        />

        {/* Mission Section (Tri Moto, Tri Komitmen, Tri Khidmat) */}
        <MissionSection about={about} />

        {/* Dedicated KOPRI Section */}
        <KopriSection
          kopri={kopri}
          onNavigateTeam={() => handleNavigate('team')}
        />

        {/* Team Section (PMII Rayon FDK & KOPRI 2026-2027) */}
        <TeamSection team={team} />

        {/* News & Opini Section */}
        <NewsSection
          articles={articles}
          onRefresh={fetchData}
        />

        {/* File Downloads Section */}
        <DownloadsSection
          downloads={downloads}
          onRefresh={fetchData}
        />

        {/* Gallery Section */}
        <GallerySection gallery={gallery} />

        {/* Contact & Secretariat Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Login Modal for Pengurus */}
      <LoginModal />

      {/* Protected Admin CMS Dashboard */}
      <AdminDashboard
        about={about}
        kopri={kopri}
        team={team}
        articles={articles}
        downloads={downloads}
        gallery={gallery}
        onDataChanged={fetchData}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
