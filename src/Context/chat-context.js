import React, { useRef, useState } from "react";
import { io } from "socket.io-client";
const ENDPOINT = "http://192.168.100.130:3000";
const imgPath = "http://192.168.100.130:3000/images/users/";

const ChatContext = React.createContext({
	isLoading: true,
	setIsLoading: () => {},
	isOnTop: false,
	setIsonTop: () => {},
	granted: false,
	setGranted: () => {},
	socket: io(ENDPOINT),
	setSocket: () => {},
	myMessage: "",
	setMyMessage: () => {},
	messages: [],
	setMessages: () => {},
	pageScroll: () => {},
	messagesRef: null,
	messagesStartRef: null,
	messagesEndRef: null,
	showNotificationfunc: () => {},
});

export const ChatContextProvider = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isOnTop, setIsonTop] = useState(false);
	const [NotificationGranted, setGranted] = useState(false);
	const [socket, setSocket] = useState(io(ENDPOINT));
	const [myMessage, setMyMessage] = useState("");
	const [messages, setMessages] = useState([]);

	const messagesRef = useRef();
	const messagesStartRef = useRef(null);
	const messagesEndRef = useRef(null);

	function pageScroll(behavior = {}) {
		messagesEndRef.current?.scrollIntoView(behavior);
	}

	const showError = () => {
		console.log("Error Occured");
	};
	let granted = false;
	const requestPermission = async () => {
		if (Notification.permission === "granted") {
			granted = true;
		} else if (Notification.permission !== "denied") {
			let permission = await Notification.requestPermission();
			granted = permission === "granted" ? true : false;
		}
	};
	const showNotificationfunc = (
		data = { msg: "not defined", title: "Accord Web App" }
	) => {
		if (!granted) requestPermission();
		let showNotification = () => {
			let notification = new Notification(data.title, {
				body: data.msg,
				timestamp: 1000,
				icon: `${imgPath}Accord.png`,
				vibrate: true,
			});
			setTimeout(() => {
				notification.close();
			}, 10 * 1000);

			notification.addEventListener("click", () => {
				window.focus();
			});
		};
		granted ? showNotification() : showError();
	};

	const contextValue = {
		isLoading,
		setIsLoading,
		isOnTop,
		setIsonTop,
		granted: NotificationGranted,
		setGranted,
		socket,
		setSocket,
		pageScroll,
		messagesRef,
		messagesStartRef,
		messagesEndRef,
		myMessage,
		setMyMessage,
		messages,
		setMessages,
		showNotificationfunc,
	};

	return (
		<ChatContext.Provider value={contextValue}>
			{props.children}
		</ChatContext.Provider>
	);
};

export default ChatContext;