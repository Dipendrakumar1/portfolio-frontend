import React, { useState, useEffect, useRef } from "react";
import { Helmet } from 'react-helmet-async'
import styled from "styled-components";
import { API_BASE_URL } from "../api";
import { theme, SiteContainer, GlassCard, GradientText, FadeInUp } from "../styles/GlobalStyles";
import Footer from "../components/Footer";

const RECAPTCHA_SITE_KEY = (import.meta.env.VITE_RECAPTCHA_SITE_KEY || "").trim();
const RECAPTCHA_ENABLED = Boolean(RECAPTCHA_SITE_KEY) && !RECAPTCHA_SITE_KEY.toLowerCase().startsWith("your-");

const HeroSection = styled.section`
  padding: 70px 0 40px;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 50vw;
    height: 50vw;
    max-width: 600px;
    max-height: 600px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%);
    filter: blur(80px);
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const AvailabilityPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 22px;
  margin-bottom: 24px;
  border-radius: ${theme.radii.pill};
  font-size: 14px;
  font-weight: 600;
  color: ${theme.success};
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid rgba(52, 211, 153, 0.35);
  box-shadow: 0 4px 15px rgba(52, 211, 153, 0.15);

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${theme.success};
    animation: glowPulse 2s ease-in-out infinite;
  }
`

const Title = styled.h1`
  font-size: clamp(38px, 6vw, 64px);
  margin-bottom: 20px;
  letter-spacing: -0.03em;
  font-weight: 900;
`

const Subtitle = styled.p`
  font-size: clamp(17px, 2.2vw, 20px);
  color: ${theme.textBody};
  max-width: 720px;
  margin: 0 auto 40px;
  line-height: 1.7;
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 40px;
  max-width: 1250px;
  margin: 40px auto 0;
  align-items: start;

  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const DirectContactCard = styled(GlassCard)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 28px;
  border-radius: ${theme.radii.lg};
  border: 1px solid ${theme.border};
  background: linear-gradient(150deg, rgba(23, 32, 54, 0.8) 0%, rgba(13, 20, 37, 0.9) 100%);
  text-decoration: none;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-5px);
    border-color: ${theme.borderGlow};
    box-shadow: ${theme.shadows.lift}, 0 0 25px rgba(56, 189, 248, 0.2);
  }
`

const IconBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${theme.accentGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 6px 20px rgba(56, 189, 248, 0.35);

  svg {
    width: 28px;
    height: 28px;
    color: #fff;
    fill: currentColor;
  }
`

const DirectText = styled.div`
  flex-grow: 1;

  h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 4px 0;
    color: #fff;
  }

  p {
    font-size: 14px;
    margin: 0;
    color: ${theme.textBody};
    line-height: 1.5;
  }
`

const ArrowIcon = styled.div`
  color: ${theme.accent};
  font-size: 20px;
  font-weight: bold;
  transition: transform 0.25s ease;

  ${DirectContactCard}:hover & {
    transform: translateX(4px);
  }
`

const FormCard = styled(GlassCard)`
  padding: 44px;
  border-radius: ${theme.radii.lg};
  border: 1px solid ${theme.border};
  background: linear-gradient(150deg, rgba(23, 32, 54, 0.85) 0%, rgba(13, 20, 37, 0.95) 100%);
  box-shadow: ${theme.shadows.lift};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 28px 20px;
  }
`

const FormHeader = styled.div`
  margin-bottom: 28px;

  h2 {
    font-size: 26px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 8px;
  }

  p {
    font-size: 15px;
    color: ${theme.textMuted};
    margin: 0;
    line-height: 1.6;
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.02em;
  display: flex;
  justify-content: space-between;

  span.required {
    color: ${theme.accent};
  }
`

const Input = styled.input`
  width: 100%;
  padding: 13px 18px;
  border-radius: 10px;
  background: rgba(10, 15, 29, 0.7);
  border: 1px solid ${theme.border};
  color: #fff;
  font-family: ${theme.fontBody};
  font-size: 15px;
  transition: all 0.25s ease;

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    outline: none;
    border-color: ${theme.accent};
    background: rgba(15, 23, 42, 0.9);
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.25);
  }
`

const Select = styled.select`
  width: 100%;
  padding: 13px 18px;
  border-radius: 10px;
  background: rgba(10, 15, 29, 0.85);
  border: 1px solid ${theme.border};
  color: #fff;
  font-family: ${theme.fontBody};
  font-size: 15px;
  transition: all 0.25s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.accent};
    background: rgba(15, 23, 42, 0.95);
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.25);
  }

  option {
    background: #0f172a;
    color: #fff;
    padding: 10px;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 14px 18px;
  border-radius: 10px;
  background: rgba(10, 15, 29, 0.7);
  border: 1px solid ${theme.border};
  color: #fff;
  font-family: ${theme.fontBody};
  font-size: 15px;
  line-height: 1.6;
  min-height: 140px;
  resize: vertical;
  transition: all 0.25s ease;

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    outline: none;
    border-color: ${theme.accent};
    background: rgba(15, 23, 42, 0.9);
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.25);
  }
`

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 15px;
  margin-top: 8px;
  border-radius: ${theme.radii.pill};
  background: ${theme.accentGradient};
  color: #fff;
  border: none;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.02em;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.35);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(56, 189, 248, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

const StatusMessage = styled.div`
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 14.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
  animation: fadeIn 0.3s ease-out;

  background: ${({ $type }) => $type === 'success' ? 'rgba(52, 211, 153, 0.12)' : 'rgba(244, 63, 94, 0.12)'};
  border: 1px solid ${({ $type }) => $type === 'success' ? theme.success : '#f43f5e'};
  color: ${({ $type }) => $type === 'success' ? theme.success : '#f43f5e'};
`

const RecaptchaWrap = styled.div`
  min-height: 74px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 0;
`

const InfoSection = styled.section`
  margin-top: 100px;
  padding-bottom: 40px;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const InfoImage = styled.img`
  width: 100%;
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.lift};
  border: 1px solid ${theme.border};
`

const ValueList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  li {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    color: ${theme.text};
    font-size: 16px;
    line-height: 1.5;

    .check-icon {
      flex-shrink: 0;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(52, 211, 153, 0.15);
      border: 1px solid ${theme.success};
      color: ${theme.success};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      margin-top: 2px;
    }
  }
`

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 50px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`

const StepCard = styled(GlassCard)`
  padding: 32px 24px;
  text-align: left;
  border-radius: ${theme.radii.md};

  .step-num {
    font-family: ${theme.fontHeading};
    font-size: 32px;
    font-weight: 800;
    color: ${theme.accent};
    margin-bottom: 12px;
  }

  h4 {
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #fff;
  }

  p {
    font-size: 14.5px;
    color: ${theme.textBody};
    margin: 0;
    line-height: 1.6;
  }
`

export default function WorkWithMe() {
  const [contactInfo, setContactInfo] = useState({
    whatsapp: "+917970795091",
    email: "dipendrayadav299@gmail.com",
    resume: ""
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full Stack Web App",
    message: ""
  });
  const [captchaToken, setCaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }
  const recaptchaContainerRef = useRef(null);
  const recaptchaWidgetRef = useRef(null);
  const recaptchaRenderingRef = useRef(false);

  useEffect(() => {
    if (!RECAPTCHA_ENABLED || !recaptchaContainerRef.current) return;

    const renderCaptcha = () => {
      if (!window.grecaptcha || !recaptchaContainerRef.current || recaptchaWidgetRef.current !== null || recaptchaRenderingRef.current) return;

      const render = () => {
        if (!window.grecaptcha || typeof window.grecaptcha.render !== "function" || !recaptchaContainerRef.current || recaptchaWidgetRef.current !== null) {
          recaptchaRenderingRef.current = false;
          return;
        }

        recaptchaRenderingRef.current = true;
        try {
          recaptchaWidgetRef.current = window.grecaptcha.render(recaptchaContainerRef.current, {
            sitekey: RECAPTCHA_SITE_KEY,
            callback: (token) => setCaptchaToken(token),
            'expired-callback': () => setCaptchaToken(""),
          });
        } catch (error) {
          recaptchaRenderingRef.current = false;
          if (!String(error?.message || error).includes("already been rendered")) {
            console.warn("Unable to render recaptcha widget:", error);
          }
        }
      };

      if (typeof window.grecaptcha.ready === "function") {
        window.grecaptcha.ready(render);
      } else {
        render();
      }
    };

    if (window.grecaptcha) {
      renderCaptcha();
      return;
    }

    const existingScript = document.getElementById("google-recaptcha-script");
    if (existingScript) {
      existingScript.addEventListener("load", renderCaptcha, { once: true });
      renderCaptcha();
      return;
    }

    const script = document.createElement("script");
    script.id = "google-recaptcha-script";
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = renderCaptcha;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/about`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setContactInfo(prev => ({
            whatsapp: data.whatsapp ? data.whatsapp : prev.whatsapp,
            email: data.email ? data.email : prev.email,
            resume: data.resume || ""
          }));
        }
      })
      .catch(err => console.error("Error fetching contact info:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    if (RECAPTCHA_ENABLED && !captchaToken) {
      setStatus({ type: 'error', message: 'Please complete the captcha verification.' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          captchaToken: RECAPTCHA_ENABLED ? captchaToken : ''
        })
      });
      const result = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you within 24 hours.' });
        setFormData({ name: '', email: '', subject: 'Full Stack Web App', message: '' });
        setCaptchaToken("");
        if (window.grecaptcha && recaptchaWidgetRef.current !== null && recaptchaWidgetRef.current !== undefined) {
          window.grecaptcha.reset(recaptchaWidgetRef.current);
        }
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to send message. Please try again or reach out on WhatsApp.' });
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setStatus({ type: 'error', message: 'Network error. Please message me directly on WhatsApp or Email.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanWhatsApp = (contactInfo.whatsapp || "").replace(/\D/g, "");
  const whatsAppUrl = cleanWhatsApp ? `https://wa.me/${cleanWhatsApp}` : "#";

  return (
    <>
      <Helmet>
        <title>Hire Me & Connect - Full-Stack Developer | Dipendra Yadav</title>
        <meta name="description" content="Collaborate on modern web applications, scalable APIs, and bespoke software solutions. Let's discuss your project scope, timeline, and deliverables." />
        <link rel="canonical" href="https://www.dipendrakumaryadav.com.np/hire-me" />
      </Helmet>

      <FadeInUp>
        <HeroSection>
          <Title>Let's <GradientText>Build Together</GradientText></Title>
          <Subtitle>
            Have an idea for a web platform, business tool, or system architecture? Send a direct message below or reach out via WhatsApp/Email.
          </Subtitle>
        </HeroSection>
      </FadeInUp>

      <MainGrid>
        {/* Left Column: Direct Quick Connect */}
        <LeftColumn>
          <DirectContactCard 
            as="a" 
            href={whatsAppUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <IconBox>
              <svg viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.06c-1.49 0-2.95-.4-4.22-1.16l-.3-.18-3.13.82.84-3.05-.2-.31a8.16 8.16 0 01-1.25-4.27c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4 1.55 1.55 2.4 3.61 2.4 5.8 0 4.52-3.68 8.2-8.2 8.2zm4.5-6.14c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.76 2.68 4.25 3.76.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/>
              </svg>
            </IconBox>
            <DirectText>
              <h3>Instant WhatsApp</h3>
              <p>{contactInfo.whatsapp || "Fastest response for project scope and availability."}</p>
            </DirectText>
            <ArrowIcon>→</ArrowIcon>
          </DirectContactCard>

          <DirectContactCard 
            as="a" 
            href={`https://mail.google.com/mail/?view=cm&to=${contactInfo.email}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <IconBox>
              <svg viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </IconBox>
            <DirectText>
              <h3>Direct Email</h3>
              <p>{contactInfo.email}</p>
            </DirectText>
            <ArrowIcon>→</ArrowIcon>
          </DirectContactCard>

          {contactInfo.resume && (
            <DirectContactCard 
              as="a" 
              href={`${API_BASE_URL.replace(/\/api\/?$/, '')}/api/download-resume`}
              target="_blank" 
              rel="noopener noreferrer"
              style={{ background: 'linear-gradient(150deg, rgba(30, 41, 73, 0.8) 0%, rgba(13, 20, 37, 0.95) 100%)', borderColor: 'rgba(56, 189, 248, 0.3)' }}
            >
              <IconBox style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 6px 20px rgba(16, 185, 129, 0.35)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </IconBox>
              <DirectText>
                <h3>Download Resume</h3>
                <p>Get a PDF copy of my latest experience and achievements.</p>
              </DirectText>
              <ArrowIcon>→</ArrowIcon>
            </DirectContactCard>
          )}

          <GlassCard style={{ padding: '32px 28px', borderRadius: theme.radii.lg }}>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>
              ⚡ What happens next?
            </h4>
            <p style={{ fontSize: '14.5px', color: theme.textBody, margin: 0, lineHeight: 1.6 }}>
              I review all inquiries within <strong>24 hours</strong>. If it's a mutual fit, we'll schedule a quick call to map out requirements, architecture, and timeline.
            </p>
          </GlassCard>
        </LeftColumn>

        {/* Right Column: Connect Form */}
        <FormCard>
          <FormHeader>
            <h2>Send a Message</h2>
            <p>Fill out the form below and I'll get back to you promptly.</p>
          </FormHeader>

          <StyledForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label>
                <span>Your Name <span className="required">*</span></span>
              </Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <span>Your Email <span className="required">*</span></span>
              </Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <span>Project / Inquiry Type</span>
              </Label>
              <Select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="Full Stack Web App">Full Stack Web App (React / Python)</option>
                <option value="Backend API & Architecture">Backend API & Architecture (Flask / MongoDB)</option>
                <option value="Frontend Development">Frontend Development & UI Redesign</option>
                <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                <option value="Consulting / Code Review">Technical Consulting & Code Review</option>
                <option value="General Inquiry">Other / General Inquiry</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>
                <span>Project Details & Message <span className="required">*</span></span>
              </Label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, goals, estimated timeline, or questions..."
                required
              />
            </FormGroup>

            {RECAPTCHA_ENABLED && (
              <FormGroup>
                <Label>
                  <span>Verification</span>
                </Label>
                <RecaptchaWrap ref={recaptchaContainerRef} />
              </FormGroup>
            )}

            {status && (
              <StatusMessage $type={status.type}>
                <span>{status.type === 'success' ? '✓' : '⚠️'}</span>
                <span>{status.message}</span>
              </StatusMessage>
            )}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                  </svg>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Project Inquiry</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </>
              )}
            </SubmitButton>
          </StyledForm>
        </FormCard>
      </MainGrid>

      <InfoSection>
        <InfoGrid>
          <div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800 }}>
              Why Work <GradientText>With Me?</GradientText>
            </h2>
            <p style={{ marginTop: '16px', fontSize: '16px', color: theme.textBody, lineHeight: 1.7 }}>
              I treat every project with founder-level care, prioritizing performance, code longevity, and clean interface aesthetics.
            </p>
            <ValueList>
              <li>
                <span className="check-icon">✓</span>
                <span><strong>Modern Stack:</strong> Expertise in React 19, Python Flask, MongoEngine & REST APIs</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span><strong>Production Quality:</strong> SEO-optimized, accessible, and mobile-first responsive architecture</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span><strong>Reliable Communication:</strong> Frequent progress demos, clear milestones, and on-time deliveries</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span><strong>Full-Lifecycle Engineering:</strong> From database schema design to Vercel/Render deployments</span>
              </li>
            </ValueList>
          </div>
          <InfoImage src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop" alt="Software Collaboration" />
        </InfoGrid>

        <h3 style={{ textAlign: 'center', marginTop: '80px', fontSize: '28px', fontWeight: 800 }}>
          How <GradientText>We'll Work Together</GradientText>
        </h3>
        
        <StepsGrid>
          <StepCard>
            <div className="step-num">01</div>
            <h4>Discovery & Scope</h4>
            <p>We discuss your core objectives, system requirements, timeline, and define a clear roadmap.</p>
          </StepCard>
          <StepCard>
            <div className="step-num">02</div>
            <h4>Iterative Build</h4>
            <p>I develop modular features with clean code, testing, and continuous feedback check-ins.</p>
          </StepCard>
          <StepCard>
            <div className="step-num">03</div>
            <h4>Deploy & Handover</h4>
            <p>Seamless cloud deployment, thorough documentation, and full handover ready for users.</p>
          </StepCard>
        </StepsGrid>
      </InfoSection>

      <Footer linkText="Back to Home →" linkTo="/" />
    </>
  );
}
