module.exports = function (self) {
	const ACTION_PATH = [
		'go',
		'stop',
		'pause',
		'restart',
		'resume',
		'move',
		'fade',
		'cueposition',
		'jump',
		'pan',
		'volume',
		'speed',
		'track',
	]
	const TARGET_PATH = ['playhead', 'active', 'cue']
	const POSITION_PATH = ['first', 'last', 'prev', 'next', 'cue']
	const ACTION_CHOICES = [
		{ id: 0, label: 'GO' },
		{ id: 1, label: 'STOP' },
		{ id: 2, label: 'PAUSE' },
		{ id: 3, label: 'RESTART' },
		{ id: 4, label: 'RESUME' },
		{ id: 5, label: 'MOVE PLAYHEAD' },
		{ id: 6, label: 'FADE' },
		{ id: 7, label: 'CUE POSITION' },
		{ id: 8, label: 'JUMP TO' },
		{ id: 9, label: 'PAN' },
		{ id: 10, label: 'VOLUME' },
		{ id: 11, label: 'SPEED' },
		{ id: 12, label: 'TRACK' },
	]
	const TARGET_FULL_CHOICES = [
		{ id: 0, label: 'CURRENT' },
		{ id: 1, label: 'CUE' },
		{ id: 2, label: 'ALL' },
	]

	const TARGET_CHOICES = [
		{ id: 0, label: 'CURRENT' },
		{ id: 1, label: 'CUE' },
		{ id: 2, label: 'ALL' },
	]

	const sendOscMessage = (path, args) => {
		self.log('debug', `Sending OSC ${self.config.host}:${self.config.port} ${path}`)
		self.log('debug', `Sending Args ${JSON.stringify(args)}`)
		self.oscSend(self.config.host, self.config.port, path, args)
	}

	self.setActionDefinitions({
		actions: {
			name: 'Actions',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					default: '0',
					choices: ACTION_CHOICES,
				},
				{
					id: 'target',
					type: 'dropdown',
					label: 'Target',
					default: '0',
					choices: (event) => {},
				},
				// {
				// 	id: 'target',
				// 	type: 'dropdown',
				// 	label: 'Target',
				// 	default: '0',
				// 	choices: TARGET_CHOICES,
				// 	isVisible: (event) => {
				// 		switch (event.actions.action) {
				// 			case (0, 9, 10, 11, 12):
				// 				return true
				// 			default:
				// 				return false
				// 		}
				// 	},
				// },
				// {
				// 	id: 'target',
				// 	type: 'dropdown',
				// 	label: 'Target',
				// 	default: '0',
				// 	choices: TARGET_FULL_CHOICES,
				// 	isVisible: (event) => {
				// 		switch (event.actions.action) {
				// 			case (1, 2, 3, 4, 6, 8):
				// 				return true
				// 			default:
				// 				return false
				// 		}
				// 	},
				// },
			],
			callback: (event) => {
				self.log('info', `Command: ${event.options.action}-${event.options.target}`)
			},
		},

		go: {
			name: 'GO',
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
					label: 'Q# (no spaces allowed)',
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
