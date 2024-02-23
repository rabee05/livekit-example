const tokenELM = document.getElementById("tokenTXT");
const viewStreamBtn = document.getElementById("viewStreamBtn");
const roomNameELM = document.getElementById("roomName");
let wsServer;

document.addEventListener("DOMContentLoaded", async () => {
  const { connect, RoomEvent } = LivekitClient;

  // Function to fetch the token from your server
  async function fetchToken() {
    try {
      const response = await fetch("/get-token");
      const token = await response.json();
      tokenELM.innerHTML = token;
      return token;
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  }

  async function joinRoom() {
    try {
      const wsURL = wsServer;
      const token = await fetchToken();
      const room = new LivekitClient.Room();

      room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
        // When a track is subscribed, attach it to the DOM for display
        if (track.kind === "video") {
          const videoElement = track.attach();
          videoElement.controls = true;
          videoElement.autoplay = true;
          videoElement.playsInline = true;
          videoElement.id = `track-${track.sid}`; //Assign a unique ID to the element for later reference, if there is no sid try to use unique id

          document.getElementById("video-container").appendChild(videoElement);
        }
      });

      room.on(
        RoomEvent.TrackUnsubscribed,
        (track, publication, participant) => {
          if (track.kind === "video") {
            // When a track is unsubscribed, remove the corresponding element from the DOM
            const element = document.getElementById(`track-${track.sid}`);
            track.detach();

            if (element) {
              element.parentNode.removeChild(element);
            }
          }
        }
      );

      room.on(RoomEvent.handleDisconnect, () => {
        roomNameELM.innerHTML = "";
        console.log("disconnected from room");
      });

      // Connect to the room
      await room.connect(wsURL, token);
      roomNameELM.innerHTML = "Connected to " + room.name;
      console.log("Connected to room", room.name);
    } catch (error) {
      console.error("Failed to join the room:", error);
    }
  }

  viewStreamBtn.addEventListener("click", () => {
    joinRoom();
  });
});
