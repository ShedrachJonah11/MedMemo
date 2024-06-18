import Nav from "@/components/NavBar";
import Footer from "@/components/footer";

function index() {
  return (
    <div className="bg-[#FAF9F6]">
      <Nav />
      <div>
        {/* Main section */}
        <div className="flex flex-col p-10 items-center bg-[#008080]">
          <h1 className="text-white text-5xl font-bold mt-10">Privacy Policy</h1>
        </div>
        <div style={{ padding: "30px 50px" }}>
          <h1>At VetMemos, we take your privacy seriously.</h1>
          <p>This Privacy Policy outlines how we collect, use, and protect the personal information of our users. By using our website and services, you consent to the practices described in this policy.</p>

          <h2>Information We Collect</h2>
          <ol>
            <li><strong>Personal Information:</strong> When you create an account or use our services, we may collect personal information such as your name, email address, and contact details.</li>
            <li><strong>Veterinary Data:</strong> Our AI-powered scribe service records and processes your consultations with pet owners to generate SOAP notes. This data may include pet information, medical details, and other sensitive information.</li>
          </ol>

          <h2>How We Use Your Information</h2>
          <ol>
            <li><strong>Personal Information:</strong> We use your personal information to create and manage your account, provide customer support, and communicate with you about our services.</li>
            <li><strong>Veterinary Data:</strong> The veterinary data collected during consultations is used solely for generating accurate SOAP notes and improving our AI models. We do not share or sell this data with third parties.</li>
          </ol>

          <h2>Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information and veterinary data from unauthorized access, disclosure, or misuse. These measures include encryption, access controls, and regular security audits.</p>

          <h2>Third-Party Services</h2>
          <p>We may use third-party services to support our operations, such as cloud storage providers or analytics tools. These third parties are bound by confidentiality agreements and are prohibited from using your data for any other purpose.</p>

          <h2>Data Retention</h2>
          <p>We retain your personal information and veterinary data for as long as necessary to provide our services and comply with legal obligations. You can request the deletion of your data at any time.</p>

          <h2>Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information stored in our systems. You can also request a copy of your veterinary data or opt-out of our services at any time.</p>

          <h2>Updates to This Policy</h2>
          <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The updated policy will be posted on our website, and we encourage you to review it periodically.</p>

          <h2>Contact Us</h2>
          <p>If you have any questions or concerns about our Privacy Policy or data practices, please contact us at <a href="mailto:info@vetmemos.com">info@vetmemos.com</a>.</p>

        </div>


      </div>
      <Footer />
    </div>
  );
}

export default index;
