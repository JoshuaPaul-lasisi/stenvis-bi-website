import fs from 'node:fs';
import path from 'node:path';
import Script from 'next/script';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import WaFloat from '@/components/WaFloat';
import LogoStrip from '@/app/components-home/LogoStrip';
import AboutSection from '@/app/components-home/AboutSection';
import CaseStudiesSection from '@/app/components-home/CaseStudiesSection';
import StatsSection from '@/app/components-home/StatsSection';
import TestimonialsSection from '@/app/components-home/TestimonialsSection';
import TeamSection from '@/app/components-home/TeamSection';
import ContactSection from '@/app/components-home/ContactSection';
import {
  getClientIndustries,
  getClientLogos,
  getPublishedCaseStudies,
  getPublishedTeamMembers,
  getPublishedTestimonials,
  getSiteSettings,
} from '@/lib/content/queries';

function readFragment(name: string): string {
  return fs.readFileSync(path.join(process.cwd(), 'app', name), 'utf8');
}

const heroHtml = readFragment('homepage-hero.html');
const servicesHtml = readFragment('homepage-services.html');
const faqCtaHtml = readFragment('homepage-faq-cta.html');

export default async function HomePage() {
  const [settings, industries, logos, caseStudies, testimonials, team] = await Promise.all([
    getSiteSettings(),
    getClientIndustries(),
    getClientLogos(),
    getPublishedCaseStudies(),
    getPublishedTestimonials(),
    getPublishedTeamMembers(),
  ]);

  return (
    <>
      <SiteNav logoUrl={settings.logo_url} />
      <WaFloat number={settings.whatsapp_number} />

      <div dangerouslySetInnerHTML={{ __html: heroHtml }} />
      <LogoStrip logos={logos} />
      <AboutSection industries={industries} settings={settings} />
      <CaseStudiesSection caseStudies={caseStudies} />
      <div dangerouslySetInnerHTML={{ __html: servicesHtml }} />
      <StatsSection settings={settings} />
      <TestimonialsSection testimonials={testimonials} />
      <TeamSection team={team} />
      <div dangerouslySetInnerHTML={{ __html: faqCtaHtml }} />
      <ContactSection settings={settings} />

      <SiteFooter logoUrl={settings.logo_url} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
