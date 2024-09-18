import { FormEvent, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {
	const socket = io("http://localhost:3000/");

	useEffect(() => {
		socket.on("connect", () => {
			console.log("usuario contectado");
		});

		return () => {
			socket.off("connect", () => {
				console.log("usuario desconectado");
			});
		};
	}, []);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const text = formData.get("message");
		if (!text) return;

		socket.emit("chat", text.toString());
		e.currentTarget.reset();
	};
	return (
		<section>
			<div>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input type="text" name="message" />
					<button>Send</button>
				</form>
			</div>
		</section>
	);
}

export default App;
