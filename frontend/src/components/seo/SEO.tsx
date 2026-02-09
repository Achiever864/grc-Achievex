interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO = ({
  title = "Graduate Research Clinic - Empowering African Scholars",
  description = "The Graduate Research Clinic connects African scholars, researchers, and mentors. Access funding opportunities, research resources, and capacity building workshops.",
  keywords = "African scholars, graduate research, research funding, academic mentorship, PhD opportunities",
  image = "https://graduateresearchclinic.org/og-image.jpg",
  url = "https://graduateresearchclinic.org",
}: SEOProps) => {
  return (
    <>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </>
  );
};
