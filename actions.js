const CHOICES = require('./choices')

module.exports = function (self) {
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
					choices: CHOICES.ACTION_CHOICES,
					default: '.go',
				},
				// Tags are used to filter the options
				{
					id: 'stopAll',
					type: 'checkbox',
					label: 'Stop all active cues first?',
					default: false,
					isVisible: (options) => options.action === '.go',
				},

				{
					id: 'target', //tag: .
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_CHOICES,
					allowCustom: true,
					isVisible: (options) => options.action.includes('.'),
				},

				{
					id: 'target_all', //tag: *
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target all',
					choices: CHOICES.TARGET_ALL_CHOICES,
					allowCustom: true,
					isVisible: (options) => options.action.includes('*') || options.action.includes('-'),
				},

				{
					id: 'position', //tag: +
					type: 'dropdown',
					label: 'Specific point or select destination:',
					choices: CHOICES.POSITION_CHOICES,
					allowCustom: true,
					isVisible: (options) => options.action.includes('+'),
				},

				{
					id: 'jump', //tag: -
					type: 'dropdown',
					label: 'Select direction',
					default: 'back',
					choices: CHOICES.JUMP_CHOICES,
					isVisible: (options) => options.action === '*jump',
				},

				{
					id: 'seconds',
					type: 'textinput',
					label: 'Seconds',
					default: 5,
					isVisible: (options) => options.action === '*jump',
				},
			],
			callback: (event) => {
				if (event.options.stopAll) {
					sendOscMessage('/cue/active/stop', [])
				}
				let args = []
				let command = '/cue/'
				let target = ''
				const tag = event.options.action.charAt(0)
				let action = event.options.action.slice(1)
				switch (tag) {
					case '*': // with all
						target = event.options.target_all + '/'
						break
					case '.': // current and q#
						target = event.options.target + '/'
						break
					case '+': // destination
						target = event.options.position
						command = '/select/'
						action = ''
						break
					case '-': // jump
						action = `jump${event.options.jump}`
						target = event.options.target_all + '/'
						args.push({ type: 'f', value: parseFloat(event.options.seconds) })
				}
				command = command + target + action
				self.log('info', `Command: ${command}`)
				sendOscMessage(command, args)
			},
		},

		go: {
			name: 'GO',
<<<<<<< HEAD
			description: 'Initiates the GO action',
			options: [
				{
					id: 'stopAll',
					type: 'checkbox',
					label: 'Stop all active cues first?',
=======
			options: [
				{
					id: 'stop',
					label: 'Stop all other active cues?',
					type: 'checkbox',
>>>>>>> e88655819c972e10093dce6538f4271c7848aa5e
					default: false,
				},
				{
					id: 'target',
<<<<<<< HEAD
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
=======
					label: 'Select Q# (no spaces allowed) or current cue',
					type: 'dropdown',
>>>>>>> e88655819c972e10093dce6538f4271c7848aa5e
					choices: CHOICES.TARGET_CHOICES,
					allowCustom: true,
				},
			],
			callback: (event) => {
<<<<<<< HEAD
				if (event.options.stopAll) {
					sendOscMessage('/cue/active/stop', [])
				}
				self.playing.push(self.currentCue)
				self.log('info', 'Playing: ' + self.playing)
				sendOscMessage(`/cue/${event.options.target}/go`, [])
			},
		},

		stop: {
			name: 'STOP',
			description: 'Initiates the Cue Stop action.',
			options: [
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_ALL_CHOICES,
					allowCustom: true,
				},
			],
			callback: (event) => {
				sendOscMessage(`/cue/${event.options.target}/stop`, [])
			},
		},

		select: {
			name: 'SELECT CUE',
			description: 'Moves the GO position in the main cue list.',
			options: [
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.POSITION_CHOICES,
					allowCustom: true,
				},
			],
			callback: (event) => {
				sendOscMessage(`/select/${event.options.target}`, [])
			},
		},

		cuepoint: {
			name: 'CUE POINT',
			description: 'The playback position of the targeted cue will jump to the value set in the specified cue point.',
			options: [
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_CHOICES,
					allowCustom: true,
				},
				{
					id: 'position',
					type: 'dropdown',
					label: 'Cue point number or select position',
					choices: CHOICES.POSITION_CHOICES,
					allowCustom: true,
				},
			],
			callback: (event) => {
				sendOscMessage(`/cue/${event.options.target}/cuepoint`, [
					{
						type: 's',
						value: event.options.position,
					},
				])
			},
		},

		fade: {
			name: 'FADE',
			description: 'Initiates the Fade Out action',
			options: [
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_ALL_CHOICES,
					allowCustom: true,
				},
			],
			callback: (event) => {
				sendOscMessage(`/cue/${event.options.target}/fade`, [])
			},
		},

		jump: {
			name: 'JUMP',
			description: 'The playback position will jump by a specific amount.',
			options: [
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_ALL_CHOICES,
					allowCustom: true,
				},
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Cue point number or select position',
					choices: CHOICES.DIRECTION_CHOICES,
				},
				{
					id: 'ammount',
					type: 'number',
					label: 'Size of the jump',
					default: '5',
				},
			],
			callback: (event) => {
				sendOscMessage(`/cue/${event.options.target}/jump${event.options.direction}`, [
					{
						type: 'f',
						value: parseFloat(event.options.ammount),
					},
				])
			},
		},

		pan: {
			name: 'PAN',
			description: 'Changes the pan position of the specified playing cue without changing the cue properties.',
			options: [
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_CHOICES,
					allowCustom: true,
				},
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Cue point number or select position',
					choices: CHOICES.PAN_CHOICES,
				},
				{
					id: 'ammount',
					type: 'number',
					label: 'Pan ammount',
					default: '0',
					isVisible: (options) => options.direcction != 'revert',
				},
			],
			callback: (event) => {
				let message = `/cue/${event.options.target}/`

				message += event.options.direcction == 'absolute' ? 'pan' : 'pan/' + event.options.direction
				sendOscMessage(message, [
					{
						type: 'i',
						value: parseInt(event.options.ammount),
					},
				])
			},
		},

		pause: {
			name: 'PAUSE',
			description: 'The cue will be paused if possible.',
			options: [
				{
					id: 'toggle',
					type: 'checkbox',
					label: 'Toggle mode',
					default: false,
				},
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_ALL_CHOICES,
					allowCustom: true,
				},
			],
			callback: (event) => {
				const message = event.options.toggle
					? `/cue/${event.options.target}/pausetoggle`
					: `/cue/${event.options.target}/pause`
				sendOscMessage(message, [])
			},
		},

		restart: {
			name: 'RESTART',
			description: 'The cue will be restarted from the beginning.',
			options: [
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_ALL_CHOICES,
					allowCustom: true,
				},
			],
			callback: (event) => {
				sendOscMessage(`/cue/${event.options.target}/restart`, [])
			},
		},

		resume: {
			name: 'RESUME',
			description: 'The cue will be resumed if possible.',
			options: [
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_ALL_CHOICES,
					allowCustom: true,
				},
			],
			callback: (event) => {
				sendOscMessage(`/cue/${event.options.target}/resume`, [])
			},
		},

		position: {
			name: 'MOVE TO POSITION',
			description: 'The playback position will jump to the specified time.',
			options: [
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_CHOICES,
					allowCustom: true,
				},
				{
					id: 'position',
					type: 'number',
					label: 'Position from the beggining in seconds',
					default: '0',
				},
			],
			callback: (event) => {
				sendOscMessage(`/cue/${event.options.target}/position`, [
					{
						type: 'f',
						value: parseFloat(event.options.position),
					},
				])
			},
		},

		speed: {
			name: 'SPEED',
			description: 'Changes the speed of the specified playing cue without changing the cue properties',
			options: [
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_CHOICES,
					allowCustom: true,
				},
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Cue point number or select position',
					choices: CHOICES.PAN_CHOICES,
				},
				{
					id: 'ammount',
					type: 'number',
					label: 'Pan ammount',
					default: '0',
					isVisible: (options) => options.direcction != 'revert',
				},
			],
			callback: (event) => {
				let message = `/cue/${event.options.target}/`

				message += event.options.direcction == 'absolute' ? 'pan' : 'pan/' + event.options.direction
				sendOscMessage(message, [
					{
						type: 'i',
						value: parseInt(event.options.ammount),
					},
				])
			},
		},

		track: {},

		volume: {},

		stopwatch: {},
=======
				self.log('info', 'Go normal')
			},
		},
>>>>>>> e88655819c972e10093dce6538f4271c7848aa5e
	})
}
