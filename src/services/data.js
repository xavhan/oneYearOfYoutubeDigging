import { create } from 'apisauce';

const api = create({ baseURL: 'https://spreadsheets.google.com' });
const speadsheetToken = '1cJs8K1QHZE6UaY1KeXlAcCOoOQwLP2MTn3Ok9HVRr1E';

const data = {
  getTracks() {
    return api.get(`/feeds/list/${speadsheetToken}/od6/public/values`, { alt: 'json' })
      .then(response => response.data.feed.entry
                          .map(line => {
                            const track = {
                              date: line.gsx$date.$t,
                              artist: line.gsx$artist.$t,
                              title: line.gsx$track.$t,
                              year: line.gsx$year.$t,
                              genre: line.gsx$genre.$t,
                              label: line.gsx$label.$t,
                              ytid: line.gsx$ytid.$t,
                            };
                            track.link = track.ytid ?
                              `//www.youtube.com/watch?v=${track.ytid}` :
                              `//www.google.fr/?q=${track.artist} ${track.title}`;
                            return track;
                          })
      );
  },
}

export default data;
