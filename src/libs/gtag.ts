export const GA_TRACKING_ID = "G-LZLFJGKZJT"; // 측정ID 설정: .env 파일로 관리해도된다.

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (process.env.NODE_ENV !== "development") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

type eventProps = {
  action: string;
  category?: string;
  label?: string;
  value?: string;
};
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: eventProps) => {
  if (process.env.NODE_ENV !== "development") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
