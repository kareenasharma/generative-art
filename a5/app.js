
// Do setup
document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el: "#app",
		template: `<div id="app">
			<chat-widget :messages="messages" />

			<div id="controls">
				<div>
					<input style = "width: 80%" ref="input" v-model="currentInput" @keyup="sayKey" @keyup.enter="enterInput">
					
					<button style = "border-radius: 30px; background-color: white; border-color: white" @click="enterInput">😘</button>
				</div>
				<div>
					<button style = "font-family: 'Lexend Mega', sans-serif; width:30%; background-color: white; border-color: white;"
					@click="handleInput('I wanna go on a dateeeee')">🌉  Date</button>

					<button style = "font-family: 'Lexend Mega', sans-serif; width:30%; background-color: white; border-color: white;"
					@click="handleInput('I am huuuuungry')">🍲  Food</button>

					<button style = "font-family: 'Lexend Mega', sans-serif; width:30%; background-color: white; border-color: white;"
					@click="handleInput('Do you love me?')">😍  Love</button>
				</div>
			

			</div>




			{{currentInput}}
		</div>`,

		watch: {

			messages() {

			}
		},

		methods: {
			sayKey() {
				console.log("KEY")
			},

			postToChat(text, owner, isSelf) {
				this.messages.push({
					text: text,
					isSelf: isSelf,
					owner: owner,
				})
			},

			enterInput() {
				let text = this.currentInput
				this.currentInput = ""

				
				this.handleInput(text)

			},

			handleInput(text) {
				// Does bot things
				this.postToChat(text, " ", true)

				// Add to the messages in chat
			
				// Bot does something
				let output = this.bot.respondTo(text)

				setTimeout(() => {
					this.postToChat(output, " ")
					
				}, Math.random()*100 + 400)

			}
		},

		mounted() {

			console.log("Vue app is all set up....")
			setInterval(() => {

			}, 1000)

			this.bot.post = (text) =>  {
				// this is now the vue object
				this.postToChat(text, " ")
			}

		},
		

		data() {
			return {
				// Store the bot
				bot: new BoyfriendBot(),

				// And the message
				messages: [],

				// And the current thing in the input
				currentInput: ""
			}
		}
	})	
})
