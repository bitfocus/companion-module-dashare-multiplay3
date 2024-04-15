module.exports = function (self) {
	const sendOscMessage = (path, args) => {
		self.log('debug', `Sending OSC ${self.config.host}:${self.config.port} ${path}`)
		self.log('debug', `Sending Args ${JSON.stringify(args)}`)
		self.oscSend(self.config.host, self.config.port, path, args)
	}

	self.setActionDefinitions({
		go: {
			name: 'Go',
			options: [],
			callback: async (event) => {
				sendOscMessage('/cue/playhead/go', [])
			},
		},
		stopAll: {
			name: 'Stop all active cues',
			options: [],
			callback: async (event) => {
				sendOscMessage('/cue/active/stop', [])
			},
		},
		fadeAll: {
			name: 'Fade all active cues',
			options: [],
			callback: () => {
				sendOscMessage('/cue/active/fade', [])
				self.fadingOutStatus = true
				self.checkFeedbacks('FadingOut')
			},
		},
	})
}
