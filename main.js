let app = new Vue({
	el: '#exchange',
	data: {
			data: null,
			exg: "SEK",
			selectedFromCurrency: "SEK",
			selectedToCurrency: "USD",
			inputAmount: 0,
			outputAmount: 0 
	},
	created(){
	
	},
	filters: {
		currencydecimal (value) {
		  return value.toFixed(4)
		}
	  },
	mounted() {
	 axios
		.get(`https://api.exchangeratesapi.io/latest?base=SEK`)
		.then(response => {
			this.data = response.data.rates;

		})
	
		
	
  	},
  	methods: {
		async fetchCurrencies(base) {
			const res = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`)
			return res.data.rates;
		},
		onChangeFrom(event) {
			this.selectedFromCurrency = event.target.value;
		},
		onChangeTo(event) {
			this.selectedToCurrency = event.target.value;
		},
		async calculate(){
			// Get the currency to change
			const response = await this.fetchCurrencies(this.selectedFromCurrency);
			// GET the currency to change to
			let convertTo = response[this.selectedToCurrency]

			//Convert
			console.log(this.$refs.input.value)
			this.inputAmount = this.$refs.input.value;
			this.outputAmount = this.$refs.input.value * convertTo;
		},
		async calculateBack(){
			// Get the currency to change
			const response = await this.fetchCurrencies(this.selectedToCurrency);
			// GET the currency to change to
			let convertTo = response[this.selectedFromCurrency]

			//Convert
			console.log(this.$refs.input.value)
			this.outputAmount = this.$refs.output.value;
			this.inputAmount = this.$refs.output.value * convertTo;
		}
		
	  },
	  watch: {
		exg: async function(newExg, oldExg) {
			if(newExg !== oldExg) {
				this.exg = newExg;
				this.data = await this.fetchCurrencies(this.exg);
			}
		},
		selectedFromCurrency: function() {
				this.calculate();
			
		},
		selectedToCurrency: function() {
			this.calculate();
		
	},
	  },
})
