const MOVE_POSITIONS = ['first', 'last', 'prev', 'next', 'cue']
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
					label: 'Target',
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
					default: 0,
				},
				{
					id: 'q_id',
					type: 'textinput',
					label: 'Cue id (no spaces allowed)',
					isVisible: (event) => event.options.target == 1,
				},
			],
			callback: (event) => {
				if (event.options.deactivate) {
					self.log('info', 'Stop all checked')
					sendOscMessage('/cue/active/stop', [])
				}

				let message = '/cue/'

				if (event.options.target == 0) {
					message += 'playhead/go'
				} else {
					message += event.options.q_id + '/go'
				}
				sendOscMessage(message, [])
			},
		},
		stopAll: {
			name: 'Stop all active cues',
			options: [],
			callback: (event) => {
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
		moveGo: {
			name: 'Move GO position',
			options: [
				{
					id: 'target',
					label: 'Target',
					type: 'dropdown',
					choices: [
						{ id: 0, label: 'First' },
						{ id: 1, label: 'Last' },
						{ id: 2, label: 'Previous' },
						{ id: 3, label: 'Next' },
						{ id: 4, label: 'Cue' },
					],
					default: 0,
				},
				{
					id: 'q_id',
					type: 'textinput',
					label: 'Cue id (no spaces allowed)',
					isVisible: (event) => event.options.target == 4,
					default: '',
				},
			],
			callback: (event) => {
				let message = '/select/'
				if (event.options.target == 4 && event.options.q_id != '') {
					message += event.options.q_id
				} else {
					message += MOVE_POSITIONS[event.options.target]
				}
				sendOscMessage(message, [])
			},
		},
	})
}
