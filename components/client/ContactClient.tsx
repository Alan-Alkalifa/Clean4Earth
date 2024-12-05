'use client';
import FadeIn from '../animations/FadeIn';
import StaggerChildren from '../animations/StaggerChildren';
import ContactForm from '../form/ContactForm';

export default function ContactClient() {
  const contactInfo = [
    {
      icon: "",
      title: "Visit Us",
      content: "Universitas Pembangunan Jaya\nTangerang Selatan, Indonesia"
    },
    {
      icon: "",
      title: "Email Us",
      content: "clean4earth@upj.ac.id"
    },
    {
      icon: "",
      title: "Call Us",
      content: "+62 21 7455555"
    }
  ];

  return (
    <>
      {/* Contact Information */}
      <section className="py-20">
        <div className="container">
          <StaggerChildren className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                <p className="text-text-secondary whitespace-pre-line">{info.content}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12">Send Us a Message</h2>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] relative">
        <FadeIn>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31726.25154490476!2d106.68734192848206!3d-6.292429666151341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f007dedc7de1%3A0x70288cde58f42a97!2sUniversitas%20Pembangunan%20Jaya%20(UPJ)!5e0!3m2!1sid!2sid!4v1733375279790!5m2!1sid!2sid"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        </FadeIn>
      </section>
    </>
  );
}
