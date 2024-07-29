import { React, useEffect, useState } from "react";
import client, {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGE,
} from "../appwriteConfig";
import { ID, Query,Role, Permission } from "appwrite";
import { Trash2 } from "react-feather";
import Header from "../context/Header"
import { useAuth } from "../context/AuthContext";
const Room = () => {

  
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const {user} = useAuth();

  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGE}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("A MEASSAGE IS CREATED");
          setMessages((prevState) => [response.payload, ...prevState]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A MEAASAGE IS DELETED$$$$");
          setMessages((prevState) =>
            messages.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let permissions = [
      Permission.write(Role.user(user.$id)),

  ]
    let payload = {
      user_Id:user.$id,
      username:user.name,
      body: messageBody,
    };

 

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGE,
      ID.unique(),
      payload,
      permissions
    );
    console.log("created", response);
    // setMessages((prevState) => [response, ...messages]);
    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGE,
      [Query.orderDesc("$createdAt")]
    );
    console.log("RESPONSE:", response);
    setMessages(response.documents);
  };

  const deleteMessage = async (message_id) => {
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGE,
      message_id
    );
    // setMessages((prevState) =>
    //   messages.filter((message) => message.$id !== message_id)
    // );
  };

  return (
    <main className="container">
       <Header/>
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form">
          <div>
            <textarea
              required
              maxLength="1000"
              placeholder="What's up guys"
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="Send" />
          </div>
        </form>
        <div>
          {messages.map((message) => (
            <div key={message.$id} className="messages--wrapper">
              <div className="message--header">
                <p>
                  {message?.username?(
                    <span>{message.username}</span>
                  ):(<span>Anonymous user</span>)}
                  <small className="message-timestamp">
                  {message.$createdAt}
                </small>
                </p>
                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                            <Trash2 className="delete--btn" onClick={() => {deleteMessage(message.$id)}}/>
                            
                        )}
                
              </div>
              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default Room;
