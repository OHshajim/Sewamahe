import React from 'react';
import Navigation from '@/components/Navbar';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-primary-foreground/90">
            Your privacy and data security are our top priorities
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-muted rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-0">
                <strong>Last Updated:</strong> January 1, 2024
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to सेवामहे ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our healthcare services and website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Name, contact information (email, phone number, address)</li>
                <li>Date of birth, gender, and identification documents</li>
                <li>Medical history, symptoms, and health-related information</li>
                <li>Insurance information and billing details</li>
                <li>Emergency contact information</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Technical Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>IP address, browser type, and device information</li>
                <li>Usage data and interaction with our services</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide healthcare services and medical consultations</li>
                <li>Maintain medical records and treatment history</li>
                <li>Process appointments and billing</li>
                <li>Communicate about your health and treatment</li>
                <li>Improve our services and user experience</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Send important updates and notifications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>With healthcare providers involved in your care</li>
                <li>With your explicit consent</li>
                <li>As required by law or legal process</li>
                <li>In case of medical emergencies</li>
                <li>With trusted service providers under strict confidentiality agreements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement robust security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure servers and data centers</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Staff training on privacy and security protocols</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate information</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability for your medical records</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website uses cookies and similar technologies to enhance your experience. You can control cookie settings through your browser preferences. Essential cookies required for service functionality cannot be disabled.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only as long as necessary to provide services and comply with legal obligations. Medical records are retained according to applicable healthcare regulations and professional standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy periodically. We will notify you of significant changes through our website or direct communication. Your continued use of our services constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions about this Privacy Policy or how we handle your information, please contact us:
              </p>
              <div className="bg-muted rounded-lg p-6">
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@sevamhe.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> 123 Healthcare Street, Medical District, Mumbai, Maharashtra 400001, India</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;