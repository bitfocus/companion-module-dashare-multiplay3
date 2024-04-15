module.exports = function (self) {
	const sendOscMessage = (path, args) => {
		self.log('debug', `Sending OSC ${self.config.host}:${self.config.port} ${path}`)
		self.log('debug', `Sending Args ${JSON.stringify(args)}`)
		self.oscSend(self.config.host, self.config.port, path, args)
	}

	self.setActionDefinitions({
		go: {
			name: 'Go',
			options: [
				{
					id: 'deactivate',
					type: 'checkbox',
					label: 'deactivate all other active cues',
					default: true,
				},
				{
					id: 'target',
					type: 'dropdown',
					label: 'Traget',
					choices: [
						{
							id: 0,
							label: 'GO selected',
						},
						{
							id: 1,
							label: 'Specific cue',
						},
					],
				},
			],
			callback: async (event) => {
				if (event.options.deactivate) {
					sendOscMessage('cue/active/stop', [])
				}
				let message = '/cue/'
				if (event.options.target == 0) {
					message += 'playhead/go'
				} else {
					message += event.options.cue + '/go'
				}
				sendOscMessage(message, [])
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
