import React from 'react';
import { X } from 'lucide-react';
import './PrivacyModal.css';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="privacy-modal-overlay" onClick={onClose}>
      <div className="privacy-modal-content" onClick={e => e.stopPropagation()}>
        <button className="privacy-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="privacy-modal-header">
          <h2>Our Privacy Policy</h2>
          <p>Comprehensive financial solutions for businesses and individuals</p>
        </div>

        <div className="privacy-modal-body text-gray-300">
          <section>
            <h3>1. Introduction</h3>
            <p>Welcome to Rupiksha. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or make a payment through our platform. Please read this policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access or use our website or services.</p>
          </section>

          <section>
            <h3>2. What personal information do we collect?</h3>
            <p>We collect personal information from you when you visit our website, sign up for our services, or contact us. This information may include your name, email address, phone number, address, pincode, and company affiliation. We may also collect your IP address and other information about your device and browser.</p>
          </section>

          <section>
            <h3>3. How do we use your personal information?</h3>
            <p>We use your personal information to provide you with our services, to intercommunicate with you, and to enhance our website and services. We may also use your private information to send you promotional emails or to contact you about career possibilities.</p>
          </section>

          <section>
            <h3>4. How do we share your personal information?</h3>
            <p>We do not share your private information with third parties without your permission. However, we may share your necesary information with third parties who help us to provide our services, such as our web hosting provider and email marketing provider. We may also share your private information with third parties if we are required to do so by law.</p>
          </section>

          <section>
            <h3>5. How do we protect your personal information?</h3>
            <p>We use a variety of security measures to protect your private information from unauthorized access, use, or disclosure. We also limit access to your private information to employees who have a legitimate need to know.</p>
          </section>

          <section>
            <h3>6. Your choices</h3>
            <p>You have the right to access, correct, or delete your private information. You also have the right to opt out of receiving promotional emails from us. To exercise these rights, please contact us at info@rupiksha.com</p>
          </section>

          <section>
            <h3>7. Changes to this Privacy Policy</h3>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, operational requirements, or legal obligations. Any updates will be posted on this page with a revised date. We encourage you to review this Privacy Policy periodically.</p>
          </section>

          <section>
            <h3>8. Contact us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at info@rupiksha.com</p>
          </section>

          <div className="privacy-modal-footer">
            <p>Rupiksha Services Pvt. Ltd. is committed to protecting the privacy of our users and our clients.</p>
            <p><strong>Email:</strong> info@rupiksha.com</p>
            <p><strong>Phone:</strong> 7004128310</p>
            <p className="last-updated">Last updated: February 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
