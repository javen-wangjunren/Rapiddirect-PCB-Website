export const ORGANIZATION_ID = 'https://www.rapiddirect.com/#organization';
export const WEBSITE_ID = 'https://www.rapiddirect.com/#website';

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServiceSchema = {
  enabled?: boolean;
  serviceType?: string;
  category?: string[];
  areaServed?: string[];
  audienceTypes?: string[];
  offerDescription?: string;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

const SITE_URL = 'https://www.rapiddirect.com';

function trimSlashes(value: string) {
  return value.replace(/^\/+|\/+$/g, '');
}

function withTrailingSlash(url: string) {
  return url.endsWith('/') ? url : `${url}/`;
}

export function getPublicPageUrl(pathname: string) {
  const clean = trimSlashes(pathname);
  return clean ? withTrailingSlash(`${SITE_URL}/${clean}`) : withTrailingSlash(SITE_URL);
}

export function resolveCanonicalUrl(input: string | null | undefined, pathname: string) {
  const raw = input?.trim();
  if (!raw) return getPublicPageUrl(pathname);
  if (raw.startsWith('/')) return getPublicPageUrl(raw);
  try {
    return withTrailingSlash(new URL(raw).toString());
  } catch {
    return getPublicPageUrl(pathname);
  }
}

export function buildBreadcrumbListSchema(pageUrl: string, items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getPublicPageUrl(item.path)
    }))
  };
}

export function buildFaqPageSchema(pageUrl: string, items: readonly FaqItem[]) {
  if (!items.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function buildWebPageSchema(pageUrl: string, input: { title: string; description: string }) {
  return {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: input.title,
    description: input.description,
    inLanguage: 'en-US',
    isPartOf: {
      '@id': WEBSITE_ID
    },
    mainEntityOfPage: pageUrl
  };
}

export function buildServiceSchema(pageUrl: string, input: { title: string; description: string; service: ServiceSchema }) {
  return {
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: input.title,
    serviceType: input.service.serviceType,
    description: input.description,
    provider: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'RapidDirect',
      url: SITE_URL
    },
    ...(input.service.areaServed?.length ? { areaServed: input.service.areaServed } : {}),
    ...(input.service.category?.length ? { category: input.service.category } : {}),
    ...(input.service.audienceTypes?.length
      ? {
          audience: {
            '@type': 'BusinessAudience',
            audienceType: input.service.audienceTypes
          }
        }
      : null),
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      description: input.service.offerDescription?.trim() ? input.service.offerDescription.trim() : `Request a quote for ${input.title}.`
    }
  };
}

export function buildServicePageJsonLd(input: {
  pathname: string;
  title: string;
  description: string;
  faqItems?: readonly FaqItem[];
  service?: ServiceSchema | null;
  includeBreadcrumbList?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  canonicalUrl?: string | null;
}) {
  const pageUrl = resolveCanonicalUrl(input.canonicalUrl, input.pathname);

  const graph: Record<string, unknown>[] = [buildWebPageSchema(pageUrl, { title: input.title, description: input.description })];

  const serviceEnabled = Boolean(input.service?.enabled);
  if (serviceEnabled) {
    graph.push(buildServiceSchema(pageUrl, { title: input.title, description: input.description, service: input.service ?? {} }));
  }

  const faqSchema = buildFaqPageSchema(pageUrl, input.faqItems ?? []);
  if (faqSchema) graph.push(faqSchema);

  if (input.includeBreadcrumbList && input.breadcrumbs?.length) {
    graph.push(buildBreadcrumbListSchema(pageUrl, input.breadcrumbs));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

export function buildEmsHomeJsonLd(input: {
  pathname: string;
  title: string;
  description: string;
  services: { name: string; url: string; serviceType?: string }[];
  includeBreadcrumbList?: boolean;
  canonicalUrl?: string | null;
}) {
  const pageUrl = resolveCanonicalUrl(input.canonicalUrl, input.pathname);

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: input.title,
      description: input.description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': WEBSITE_ID
      },
      mainEntityOfPage: pageUrl
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#services`,
      name: 'EMS Services',
      itemListElement: input.services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          '@id': `${withTrailingSlash(service.url)}#service`,
          name: service.name,
          serviceType: service.serviceType ?? service.name,
          url: withTrailingSlash(service.url),
          provider: {
            '@type': 'Organization',
            '@id': ORGANIZATION_ID,
            name: 'RapidDirect',
            url: SITE_URL
          }
        }
      }))
    }
  ];

  if (input.includeBreadcrumbList) {
    graph.push(
      buildBreadcrumbListSchema(pageUrl, [
        { name: 'Home', path: '/' },
        { name: 'EMS', path: '/ems/' }
      ])
    );
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}
