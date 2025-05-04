import requests
from bs4 import BeautifulSoup
from datetime import datetime


def scrape_past_events():
    URL = "https://hunter.cuny.edu/organizer/student-activities/?eventDisplay=past"
    resp = requests.get(URL)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, 'html.parser')
    calendar_list = soup.find('div', class_='tribe-events-calendar-list')
    events = []

    for row in calendar_list.select('div.tribe-events-calendar-list__event-row'):
        article = row.find('article', class_='tribe-events-calendar-list__event')
        if not article:
            continue

        img_wrapper = article.find(
            'div', class_='tribe-events-calendar-list__event-featured-image-wrapper'
        )
        a_img = img_wrapper.find('a') if img_wrapper else None
        image_url = None
        event_url = None
        if a_img:
            event_url = a_img.get('href')
            img_tag = a_img.find('img')
            image_url = img_tag.get('src') if img_tag else None

        details = article.find(
            'div', class_='tribe-events-calendar-list__event-details'
        )

        time_tag = details.find('time', class_='tribe-events-calendar-list__event-datetime')
        date_str = None
        start_time = None
        end_time = None
        if time_tag:
            datetime_text = time_tag.get_text(separator=' ', strip=True)
            parts = datetime_text.split('|')
            if parts:
                date_str = parts[0].strip()
            if len(parts) > 1:
                times = parts[1].split('-')
                start_time = times[0].strip() if times else None
                end_time = times[1].strip() if len(times) > 1 else None
            try:
                event_date = datetime.strptime(date_str, '%b %d, %Y').date().isoformat()
            except Exception:
                event_date = date_str
        else:
            event_date = None

        title_link = details.select_one('h3 a')
        title = title_link.get_text(strip=True) if title_link else None

        series_el = details.find('span', class_='tec_series_marker__title')
        series = series_el.get_text(strip=True) if series_el else None

        desc_el = details.find(
            'div', class_='tribe-events-calendar-list__event-description'
        )
        description = desc_el.get_text(strip=True) if desc_el else None

        events.append({
            'title': title,
            'url': event_url,
            'date': event_date,
            'start_time': start_time,
            'end_time': end_time,
            'series': series,
            'description': description,
            'image_url': image_url,
            'scraped_at': datetime.utcnow().isoformat() + 'Z',
        })

    return events


if __name__ == '__main__':
    scraped = scrape_past_events()
    import json
    print(json.dumps(scraped, indent=2))



