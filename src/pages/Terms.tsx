import React from 'react';
import Navigation from '@/components/Navbar';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Terms of Use
          </h1>
          <p className="text-xl text-primary-foreground/90">
            Please read these terms carefully before using our services
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
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using सेवामहे services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree with any of these terms, you should not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                सेवामहे provides healthcare services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Medical consultations and telemedicine services</li>
                <li>Health information and educational resources</li>
                <li>Appointment scheduling and management</li>
                <li>Digital health records management</li>
                <li>Healthcare provider network access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Responsibilities</h2>
              <h3 className="text-xl font-semibold text-foreground mb-3">Account Registration</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Appropriate Use</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use services only for lawful purposes</li>
                <li>Provide truthful medical information</li>
                <li>Respect healthcare providers and staff</li>
                <li>Follow prescribed treatments and recommendations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Medical Disclaimer</h2>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-destructive mb-3">Important Medical Notice</h3>
                <ul className="list-disc list-inside text-destructive space-y-2 text-sm">
                  <li>Our services do not replace emergency medical care</li>
                  <li>For medical emergencies, contact local emergency services immediately</li>
                  <li>Telemedicine has limitations and may not be suitable for all conditions</li>
                  <li>Always follow up with in-person care when recommended</li>
                  <li>We are not liable for treatment outcomes or medical decisions</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Prohibited Activities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Users are strictly prohibited from:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Providing false or misleading medical information</li>
                <li>Sharing account credentials with others</li>
                <li>Attempting to access unauthorized areas or data</li>
                <li>Using services for illegal or fraudulent purposes</li>
                <li>Harassing or threatening healthcare providers or staff</li>
                <li>Attempting to circumvent security measures</li>
                <li>Using services to distribute malware or spam</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Payment Terms</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Fees are due at the time of service unless otherwise arranged</li>
                <li>We accept various payment methods as displayed during checkout</li>
                <li>Refunds are processed according to our refund policy</li>
                <li>Insurance claims are processed according to your insurance provider's terms</li>
                <li>You are responsible for any applicable taxes</li>
                <li>Late payment fees may apply for overdue amounts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Privacy and Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these terms by reference. By using our services, you consent to our privacy practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Intellectual Property</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>All content and materials are owned by सेवामहे or licensed to us</li>
                <li>You may not reproduce, distribute, or create derivative works</li>
                <li>Users retain ownership of their personal medical information</li>
                <li>We grant you a limited license to use our services for personal healthcare needs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, सेवामहे shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses resulting from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Termination</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to terminate or suspend your account at any time for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Violation of these terms of use</li>
                <li>Fraudulent or illegal activity</li>
                <li>Non-payment of fees</li>
                <li>Abusive behavior towards staff or providers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms are governed by the laws of India. Any disputes arising from these terms or your use of our services will be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes are posted constitutes acceptance of the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For questions about these Terms of Use, please contact us:
              </p>
              <div className="bg-muted rounded-lg p-6">
                <div className="space-y-2">
                  <p><strong>Email:</strong> legal@sevamhe.com</p>
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

export default Terms;