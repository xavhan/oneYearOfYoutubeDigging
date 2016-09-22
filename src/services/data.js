import { create } from 'apisauce';

const api = create({ baseURL: 'https://spreadsheets.google.com' });
const speadsheetToken = '1cJs8K1QHZE6UaY1KeXlAcCOoOQwLP2MTn3Ok9HVRr1E';

const data = {
  getTracks() {
    return api.get(`/feeds/list/${speadsheetToken}/od6/public/values`, { alt: 'json' })
      .then(response => response.data.feed.entry
                          .map(line => ({
                            date: line.gsx$date.$t,
                            artist: line.gsx$artist.$t,
                            title: line.gsx$track.$t,
                            year: line.gsx$year.$t,
                            genre: line.gsx$genre.$t,
                            label: line.gsx$label.$t,
                            link: line.gsx$link,
                          }))
      );
  },
}

export default data;
