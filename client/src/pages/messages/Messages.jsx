// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import React from "react";
// import { Link } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import "./Messages.scss";
// import moment from "moment";

// import { Watch } from "react-loader-spinner";

// const Messages = () => {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   // console.log(currentUser);
//   const queryClient = useQueryClient();

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["conversations"],
//     queryFn: () =>
//       newRequest.get(`/conversations`).then((res) => {
//         return res.data;
//       }),
//   });
//   // console.log(data);

//   const mutation = useMutation({
//     mutationFn: (id) => {
//       // console.log(id);
//       return newRequest.put(`/conversations/${id}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["conversations"]);
//     },
//   });

//   const handleRead = (id) => {
//     mutation.mutate(id);
//   };

//   return (
//     <div className="messages">
//       {isLoading ? (
//         <Watch
//           height="100"
//           width="800"
//           radius="48"
//           color="#4fa94d"
//           ariaLabel="watch-loading"
//           visible={true}
//         />
//       ) : error ? (
//         "error"
//       ) : (
//         <div className="container">
//           <div className="title">
//             <h1>Messages</h1>
//           </div>
//           <table>
//             <tr>
//               <th>{currentUser.user.isSeller ? "Buyer" : "Seller"}</th>
//               <th>Last Message</th>
//               <th>Date</th>
//               <th>Action</th>
//             </tr>
//             {data.map((c) => (
//               <tr
//                 className={
//                   ((currentUser.user.isSeller && !c.readBySeller) ||
//                     (!currentUser.user.isSeller && !c.readByBuyer)) &&
//                   "active"
//                 }
//                 key={c.id}
//               >
//                 <td>{currentUser.user.isSeller ? c.buyerId : c.sellerId}</td>
//                 <td>
//                   <Link to={`/message/${c.id}`} className="link">
//                     {c?.lastMessage?.substring(0, 100)}...
//                   </Link>
//                 </td>
//                 <td>{moment(c.updatedAt).fromNow()}</td>
//                 <td>
//                   {((currentUser.user.isSeller && !c.readBySeller) ||
//                     (!currentUser.user.isSeller && !c.readByBuyer)) && (
//                     <button onClick={() => handleRead(c.id)}>
//                       Mark as Read
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Messages;

// Messages.js

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";
import { Watch } from "react-loader-spinner";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`, {
      to:   buyerId 
      }).then((res) => {
        console.log("bov motu res",res)
        return res.data;
      }),
  });
  console.log("resssssss",data)

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        <Watch
          height="100"
          width="800"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          visible={true}
        />
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.user.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <tr
                  className={
                    ((currentUser.user.isSeller && !c.readBySeller) ||
                      (!currentUser.user.isSeller && !c.readByBuyer)) &&
                    "active"
                  }
                  key={c.id}
                >
                  <td>{currentUser.user.isSeller ? c.buyerId : c.sellerId}</td>
                  <td>
                    <Link to={`/message/${c.id}`} className="link">
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && (
                      <button onClick={() => handleRead(c.id)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
