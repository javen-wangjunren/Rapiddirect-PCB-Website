export function normalizeContactUsContentJson(data: any) {
  if (!data) return {};

  const hero = data.hero && typeof data.hero === 'object' ? data.hero : {};

  return {
    ...data,
    hero: {
      ...hero,
      title: typeof hero.title === 'string' ? hero.title : '',
      description: typeof hero.description === 'string' ? hero.description : '',
      image_url: typeof hero.image_url === 'string' ? hero.image_url : '',
      image_url_secondary: typeof hero.image_url_secondary === 'string' ? hero.image_url_secondary : ''
    }
  };
}
