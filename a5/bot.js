class BoyfriendBot {
	constructor() {
		   this.grammar = tracery.createGrammar(boyfriendGrammar)
		   this.grammar.addModifiers(baseEngModifiers)
	   }
   
	   respondTo(s) {
		   if (s.includes("I wanna go on a dateeeee")) {
			   setTimeout(this.post(this.grammar.flatten("#agree#")), 8000);
			   return this.grammar.flatten("#date_origin#")
			
		   }
   
		   // Brew new coffee
		   if (s.includes("I am huuuuungry")) {
				setTimeout(this.post(this.grammar.flatten("#offer#")), 8000);
				setTimeout(this.post(this.grammar.flatten("#dinner_origin#")), 8000);
				return this.grammar.flatten("#question#");

   
		   }

		   // love 
		   if (s.includes("Do you love me?")) {
				setTimeout(this.post(this.grammar.flatten("#phrases#")), 8000);
			   return this.grammar.flatten("#love_origin#")
		   }

		   // yes
		   if (s.includes("yes")) {
			   return this.grammar.flatten("#yes#");
		   }

		   // no
			if (s.includes("no")) {
			return this.grammar.flatten("#no#");
			}

			// hi
			if ((s.includes("hi")) || s.includes("ello") || s.includes("hey") || s.includes("Hi") || s.includes("Hey")) {
				return this.grammar.flatten("Hello, #names#")
			}

			// how are you
			if ((s.includes("how are you")) || s.includes("how r u") || s.includes("how are u")) {
				return this.grammar.flatten("I am good, #names#! Better now that I am talking to u :)")
			}

			// bye
			if ((s.includes("ye")) || s.includes("oodnight")) {
				return this.grammar.flatten("Goodbye, #names#! Miss you alreadyyyyy :)")
			}

			// who are you? + response when bot does not understand
		   if (s.includes("ho are you?"))
			   return `I'm your boyfriend bot, my love.`
		   return this.grammar.flatten("What was that #names#?")

	   }
   }


























