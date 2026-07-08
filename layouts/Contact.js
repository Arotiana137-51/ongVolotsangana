"use client";

import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import { useState } from 'react';
import client from '@sanity/client';
const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info, video } = frontmatter;
  const { contact_form_action } = config.params;

  // Self-hosted VideoObject schema — makes the reportage eligible for
  // Google video rich results (the video is owned by the NGO).
  const base = (config.site.base_url || "").replace(/\/$/, "");
  const videoSchema = video?.src && {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description || video.title,
    thumbnailUrl: video.poster ? `${base}${video.poster}` : undefined,
    uploadDate: video.upload_date,
    contentUrl: `${base}${video.src}`,
    publisher: { "@type": "NGO", name: "ONG Volotsangana" },
  };

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData), 
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert('Email envoyé avec succès!');
      } else {
        alert('Email non envoyé.');
      }
    } catch (error) {
      alert('Error sending email: ' + error.message);
    }
  };
  

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section row pb-0">
          <div className="col-12 md:col-6 lg:col-7">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="name"
                  type="text"
                  placeholder="Nom"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="email"
                  type="email"
                  placeholder="Votre email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="subject"
                  type="text"
                  placeholder="Objet"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-textarea w-full rounded-md"
                  rows="7"
                  name="message"
                  placeholder="Votre message"
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Envoyez maintenant
              </button>
            </form>
          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {video?.src && (
          <div className="section pb-0">
            {videoSchema && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
              />
            )}
            <figure className="mx-auto w-full max-w-3xl">
              <video
                className="w-full rounded-[4px] bg-ink"
                controls
                preload="none"
                playsInline
                poster={video.poster || undefined}
              >
                <source src={video.src} type="video/mp4" />
              </video>
              {video.title && (
                <figcaption className="mt-3 text-xs uppercase tracking-[0.22em] text-muted">
                  {video.title}
                </figcaption>
              )}
            </figure>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
