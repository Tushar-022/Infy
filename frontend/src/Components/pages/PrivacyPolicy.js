import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>

      <div className="prose lg:prose-xl mx-auto">
        <div className="mb-6">
          <p>
            Welcome to <strong>Hackon</strong>, the hackathon project developed by
            our team for Amazon. Your privacy is important to us. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information. Please read this privacy policy carefully. If you do not
            agree with the terms of this privacy policy, please do not access the
            site.
          </p>
        </div>

        <div className="mb-6">
          <h2>Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways, including:
          </p>
          <ul className="list-disc pl-5">
            <li>
              <>Personal Data</>
            </li>
            <li>
              <>Contact Information</>
            </li>
            <li>
              <>
                Demographic and other personally identifiable information (PII)
              </>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mt-2">Use of Your Information</h2>
          <p>We may use the information we collect about you to:</p>
          <ul className="list-disc pl-5">
            <li>Administer sweepstakes, promotions, and contests</li>
            <li>Compile anonymous statistical data and analysis</li>
            <li>Create and manage your account</li>
            <li>
              Deliver targeted advertising, newsletters, and other information
              regarding promotions
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mt-2 font-bold">Customer Privacy and Security</h2>
          <p>
            We are committed to protecting your privacy and ensuring the security
            of your information.
          </p>
        </div>

        <div className="mb-6">
          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please
            contact us at:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:khandelwaltushar2002@gmail.com"
              className="text-blue-600 underline"
            >
              khandelwaltushar2002@gmail.com
            </a>
            <br />
            <strong>Phone:</strong> +91-8302806348
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
