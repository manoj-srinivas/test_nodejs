const common = require("../../utils/common");
// const SpotifyWebApi = require('spotify-web-api-node');
const https = require('https');
// const DAL = require('./dal');
const axios = require('axios');
// let token = '';
// const scopes = [
//   'ugc-image-upload',
//   'user-read-playback-state',
//   'user-modify-playback-state',
//   'user-read-currently-playing',
//   'streaming',
//   'app-remote-control',
//   'user-read-email',
//   'user-read-private',
//   'playlist-read-collaborative',
//   'playlist-modify-public',
//   'playlist-read-private',
//   'playlist-modify-private',
//   'user-library-modify',
//   'user-library-read',
//   'user-top-read',
//   'user-read-playback-position',
//   'user-read-recently-played',
//   'user-follow-read',
//   'user-follow-modify'
// ];

// const spotifyApi = new SpotifyWebApi({
//   redirectUri: process.env.REDIRECTURI,
//   clientId: process.env.CLIENTID,
//   clientSecret: process.env.CLIENTSECRETE,
// });
// spotifyApi.setAccessToken(token);
// const getAlbum = async (req, res) => {
//   try {

//     spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//       function (data) {
//         console.log('Artist albums', data.body);

//         return res.status(200).send(
//           JSON.stringify(
//             {
//               'Artist albums': data.body,

//             }
//           )
//         );
//       },
//       function (err) {
//         console.log(err);
//         return res.status(401).send(
//           JSON.stringify(
//             err.body
//           )
//         );
//       }
//     );

//   } catch (err) {
//     let error = JSON.stringify(err);
//     common.catchHandler(err, res, error);
//   }
// };
// const login = async (req, res) => {
//   try {
//     // const response = await res.redirect(spotifyApi.createAuthorizeURL(scopes));
//     const response = await res.redirect(spotifyApi.createAuthorizeURL(scopes));
//   } catch (err) {
//     let error = JSON.stringify(err);
//     common.catchHandler(err, res, error);
//   }
// };
// //callback
// const callback = async (req, res) => {
//   try {
//     const error = req.query.error;
//     const code = req.query.code;
//     const state = req.query.state;
//     if (error) {
//       console.error('Callback Error:', error);
//       res.send(`Callback Error: ${error}`);
//       return;
//     }
//     await spotifyApi
//       .authorizationCodeGrant(code)
//       .then(data => {
//         const access_token = data.body['access_token'];
//         const refresh_token = data.body['refresh_token'];
//         const expires_in = data.body['expires_in'];
        
//         spotifyApi.setAccessToken(access_token);
//         spotifyApi.setRefreshToken(refresh_token);

//         console.log('access_token:', access_token);
//         console.log('refresh_token:', refresh_token);

//         console.log(
//           `Sucessfully retreived access token. Expires in ${expires_in} s.`
//         );
//         res.send('Success! You can now close the window.');

//         setInterval(async () => {
//           const data = await spotifyApi.refreshAccessToken();
//           const access_token = data.body['access_token'];
//           token = access_token;
//           console.log('The access token has been refreshed!');
//           console.log('access_token:', access_token);
//           spotifyApi.setAccessToken(access_token);
//         }, expires_in / 2 * 1000);
//       })
//       .catch(error => {
//         console.error('Error getting Tokens:', error);
//         res.send(`Error getting Tokens: ${error}`);
//       });
//   } catch (err) {
//     let error = JSON.stringify(err);
//     common.catchHandler(err, res, error);
//   }
// };
// //GET MY PROFILE DATA
// const profile = async (req, res) => {
//   try {
//     getMyData();
//   } catch (err) {
//     let error = JSON.stringify(err);
//     common.catchHandler(err, res, error);
//   }
// };

// function getMyData() {
//   (async () => {
//     const me = await spotifyApi.getMe();
//     console.log(me.body);
//     getUserPlaylists(me.body.id);
//   })().catch(e => {
//     console.error(e);
//   });
// }
// //GET MY PLAYLISTS
// async function getUserPlaylists(userName) {
//   const data = await spotifyApi.getUserPlaylists(userName)

//   console.log(data);
//   let playlists = []

//   for (let playlist of data.body.items) {
//     console.log(playlist.name + " " + playlist.id)

//     let tracks = await getPlaylistTracks(playlist.id, playlist.name);
//     console.log(tracks);

//     // const tracksJSON = { tracks }
//     // let data = JSON.stringify(tracksJSON);
//     // fs.writeFileSync(playlist.name+'.json', data);
//   }
// }
// //GET SONGS FROM PLAYLIST
// async function getPlaylistTracks(playlistId, playlistName) {

//   const data = await spotifyApi.getPlaylistTracks(playlistId, {
//     offset: 1,
//     limit: 100,
//     fields: 'items'
//   })

//   // console.log('The playlist contains these tracks', data.body);
//   // console.log('The playlist contains these tracks: ', data.body.items[0].track);
//   console.log("'" + playlistName + "'" + ' contains these tracks:');
//   let tracks = [];

//   // for (let track_obj of data.body.items) {
//   //   const track = track_obj.track
//   //   tracks.push(track);
//   //   console.log(track.name + " : " + track.artists[0].name)
//   // }

//   return tracks;
// }

// const searchTracks = async (req, res) => {
//   try {
//     let dataJson = {
//        search: req.body.search,

//     };


//     const response = await DAL.searchTracks(dataJson);
//     console.log(response);
//     return res.status(200).send(
//       JSON.stringify(
//         response
//       )
//     );

//   } catch (err) {
//     let error = JSON.stringify(err);
//     common.catchHandler(err, res, error);
//   }
// };
// const searchPlaylists = async (req, res) => {
//   try {
//     let dataJson = {
//       search: req.body.search,

//    };

//     const response = await DAL.searchPlaylists(dataJson);
//     console.log(response);
//     return res.status(200).send(
//       JSON.stringify(
//         response
//       )
//     );

//   } catch (err) {
//     let error = JSON.stringify(err);
//     common.catchHandler(err, res, error);
//   }
// };

const artistTopTracks = async (req, res) => {
  try {  
   const agent = new https.Agent({
    rejectUnauthorized: false,
});
   const config = {
    method: 'get',
    url: 'https://spotify-api-wrapper.appspot.com/artist/0du5cEVh5yTK9QJze8zA0C/top-tracks',
}

let resp1 = await axios(config)

    console.log(resp1.data.tracks);
    return res.status(200).send(
      JSON.stringify(
        resp1.data.tracks
      )
    );

  } catch (err) {
    let error = JSON.stringify(err);
    common.catchHandler(err, res, error);
  }
};
module.exports = {
  // getAlbum,
  // login,
  // callback,
  // profile,
  // searchTracks,
  // searchPlaylists,
  artistTopTracks
};
