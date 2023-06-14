// /* eslint-disable react/react-in-jsx-scope */
// import { ZIMKitManager, Common } from "@zegocloud/zimkit-react";
// import { useEffect, useState } from "react";
// import "@zegocloud/zimkit-react/index.css";

// // const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// const id = Math.floor(Math.random() * 10000)

// function ChatRoom() {
//   const [state, setState] = useState({
//     appConfig: {
//       appID: 234626847, // The AppID you get from the ZEGOCLOUD admin console.
//       serverSecret: "b6c97135d351a543b9ab5c294bf86b24", // The serverSecret you get from ZEGOCLOUD Admin Console.
//     },
//     // The userID and userName is a strings of 1 to 32 characters.
//     // Only digits, letters, and the following special characters are supported: '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'
//     userInfo: {
//       // Your ID as a user.
//       userID: `akku${id}`,
//       // Your name as a user.
//       userName: `akku${id}`,
//       // The image you set as a user avatar must be network images. e.g., https://storage.zego.im/IMKit/avatar/avatar-0.png
//       userAvatarUrl: "",
//     },
//   });
//   useEffect(() => {
//     const init = async () => {
//       const zimKit = new ZIMKitManager();
//       const token = zimKit.generateKitTokenForTest(
//         state.appConfig.appID,
//         state.appConfig.serverSecret,
//         state.userInfo.userID
//       );
//       await zimKit.init(state.appConfig.appID);
//       await zimKit.connectUser(state.userInfo, token);
//     };
//     init();
//   }, []);

//   return (
//     <div>
//       Welcome {state.userInfo.userID}
//       <Common></Common>
//     </div>
//   );
// }
// export default ChatRoom;

/* eslint-disable react/react-in-jsx-scope */
import { ZIMKitManager, Common } from "@zegocloud/zimkit-react";
import { useEffect, useState } from "react";
import "@zegocloud/zimkit-react/index.css";

// const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const id = Math.floor(Math.random() * 10000)

function ChatRoom() {
  const [state, setState] = useState({
    appConfig: {
      appID: 234626847, // The AppID you get from the ZEGOCLOUD admin console.
      serverSecret: "b6c97135d351a543b9ab5c294bf86b24", // The serverSecret you get from ZEGOCLOUD Admin Console.
    },
    // The userID and userName is a strings of 1 to 32 characters.
    // Only digits, letters, and the following special characters are supported: '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'
    userInfo: {
      // Your ID as a user.
      userID: `akku${id}`,
      // Your name as a user.
      userName: `akku${id}`,
      // The image you set as a user avatar must be network images. e.g., https://storage.zego.im/IMKit/avatar/avatar-0.png
      userAvatarUrl: "",
    },
  });
  useEffect(() => {
    const init = async () => {
      const zimKit = new ZIMKitManager();
      const token = zimKit.generateKitTokenForTest(
        state.appConfig.appID,
        state.appConfig.serverSecret,
        state.userInfo.userID
      );
      await zimKit.init(state.appConfig.appID);
      await zimKit.connectUser(state.userInfo, token);
    };
    init();
  }, []);

  return (
    <div>
      Welcome {state.userInfo.userID}
      <Common></Common>
    </div>
  );
}
export default ChatRoom;


