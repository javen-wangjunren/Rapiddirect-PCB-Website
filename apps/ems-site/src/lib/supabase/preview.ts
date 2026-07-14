export const EMS_PREVIEW_QUERY_PARAM = 'preview';
export const EMS_PREVIEW_COOKIE_NAME = 'ems_preview_access_token';
export const EMS_PREVIEW_COOKIE_MAX_AGE_SECONDS = 60 * 10;

export const isPreviewRequest = (url: URL) => {
  return url.searchParams.get(EMS_PREVIEW_QUERY_PARAM) === '1';
};
