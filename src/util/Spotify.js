  let userToken;
  const cID="f1509f1c515d46d8bebb8ee2c1835297";
  const redirectUri="https://jammalara.surge.sh/";

  const Spotify={
      getAccessToken(){
        if(userToken) {
          return userToken;
        }
        const access_token=window.location.href.match(/access_token=([^&]*)/);
        const expiry=window.location.href.match(/expires_in=([^&]*)/);
        if (expiry && access_token){
          userToken=access_token[1];
          const expiresIn=Number(expiry[1]);
          window.setTimeout(() => userToken= '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
          return userToken;
        }else{
          window.location=`https://accounts.spotify.com/authorize?response_type=token&client_id=${cID}&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }
      },
      async searchTracks(trackterm){
          const userToken=Spotify.getAccessToken();
          const endPoint= `https://api.spotify.com/v1/search?type=track&q=${trackterm}`;
          try {
              const response = await fetch(endPoint,{headers:{
                                                        Authorization:`Bearer ${userToken}`
                                                        }
                                                      });
              if(response.ok) {
                  const jsonResponse = await response.json();
                  if (jsonResponse.tracks){
                          return jsonResponse.tracks.items.map(track => ({
                          id: track.id,
                          name: track.name,
                          artist: track.artists[0].name,
                          album: track.album.name,
                          uri:track.uri
                      }));
                  } else {
                      return [];
                  }
              } 
          } catch (error){
              console.log(error);
          }
      },
      async savePlaylist(playListName,playListURIs){
        const userToken=Spotify.getAccessToken();
        const headers={Authorization:`Bearer ${userToken}`};
        let userID;
        let playListID;
        const bodyData=JSON.stringify({name:playListName});
        const bodyDataP=JSON.stringify({uris:playListURIs});
        if(playListName && playListURIs.length){
          try{
            const response= await fetch("https://api.spotify.com/v1/me",{headers:headers});
            if(response.ok) {
              const jsonResponse = await response.json();
              userID=jsonResponse.id;
            }
          } catch(error) {
            console.log(error);
          }
          try{
            const responseP=await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                method:'POST',
                body: bodyData,
                headers:headers
                });
                if(responseP.ok){
                  const jsonResponse = await responseP.json();
                  playListID=jsonResponse.id;
                }
            }catch(error){
              console.log(error);
            }
            try {
              const responseT=await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playListID}/tracks`,{
                method:'POST',
                body: bodyDataP,
                headers:headers
                });
                if(responseT.ok){
                  const jsonResponse = await responseT.json();
                  return playListID=jsonResponse.snapshot_id;
                }
            }catch(error){
              console.log(error);
            }
        }else {
          return;
        }
      }
  };

export default Spotify;
