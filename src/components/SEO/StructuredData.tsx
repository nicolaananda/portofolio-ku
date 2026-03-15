import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
    type: 'Person' | 'WebSite' | 'Article' | 'BreadcrumbList';
    data: Record<string, any>;
}

/**
 * Component to inject JSON-LD structured data for SEO
 * Supports: Person, WebSite, Article, BreadcrumbList schemas
 */
export const StructuredData = ({ type, data }: StructuredDataProps) => {
    let jsonLd: Record<string, any> = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    );
};

interface PersonSchemaProps {
    name: string;
    url: string;
    image?: string;
    jobTitle?: string;
    description?: string;
    sameAs?: string[];
}

export const PersonSchema = ({ name, url, image, jobTitle, description, sameAs }: PersonSchemaProps) => (
    <StructuredData
        type="Person"
        data={{
            name,
            url,
            ...(image && { image }),
            ...(jobTitle && { jobTitle }),
            ...(description && { description }),
            ...(sameAs && { sameAs })
        }}
    />
);

interface WebSiteSchemaProps {
    name: string;
    url: string;
    description?: string;
    author?: {
        '@type': 'Person';
        name: string;
    };
}

export const WebSiteSchema = ({ name, url, description, author }: WebSiteSchemaProps) => (
    <StructuredData
        type="WebSite"
        data={{
            name,
            url,
            ...(description && { description }),
            ...(author && { author })
        }}
    />
);

interface ArticleSchemaProps {
    headline: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    author?: {
        '@type': 'Person';
        name: string;
    };
    description?: string;
}

export const ArticleSchema = ({ headline, image, datePublished, dateModified, author, description }: ArticleSchemaProps) => (
    <StructuredData
        type="Article"
        data={{
            headline,
            ...(image && { image }),
            ...(datePublished && { datePublished }),
            ...(dateModified && { dateModified }),
            ...(author && { author }),
            ...(description && { description })
        }}
    />
);

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => (
    <StructuredData
        type="BreadcrumbList"
        data={{
            itemListElement: items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.url
            }))
        }}
    />
);
