const CHOICES = require('./choices')

module.exports = function (self) {
	const sendOscMessage = (path, args) => {
		self.log('debug', `Sending OSC ${self.config.host}:${self.config.port} ${path}`)
		self.log('debug', `Sending Args ${JSON.stringify(args)}`)
		self.oscSend(self.config.host, self.config.port, path, args)
	}

	self.setActionDefinitions({
		go: {
			name: 'GO',
			description: 'Initiates the GO action',
			options: [
				{
					id: 'stopAll',
					type: 'checkbox',
					label: 'Stop all active cues first?',
					default: false,
				},
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_CHOICES,
					allowCustom: true,
				},
			],
			callback: (event) => {
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
					label: 'Direction',
					choices: CHOICES.PAN_CHOICES,
					default: '+',
				},
				{
					id: 'ammount',
					type: 'number',
					label: 'Pan ammount (0 to 100)',
					default: '1',
					max: 100,
					min: 0,
					isVisible: (options) => options.direction === '+' || options.direction === '-',
				},

				{
					id: 'absolute',
					type: 'number',
					label: 'Pan position (-100 full left, 100 full right, 0 center)',
					max: 100,
					min: -100,
					default: 0,
					isVisible: (options) => options.direction == 'absolute',
				},
			],
			callback: (event) => {
				let message = `/cue/${event.options.target}/pan`
				let args = { type: 'i', value: 0 }
				switch (event.options.direction) {
					case '+':
					case '-':
						message += '/' + event.options.direction
						args.value = parseInt(event.options.ammount)
						break
					case 'absolute':
						args.value = parseInt(event.options.absolute)
						break
					case 'revert':
						message += '/' + event.options.direction
						args.value = 0
				}

				sendOscMessage(message, [args])
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
					id: 'behaviour',
					type: 'dropdown',
					label: 'Select behaviour',
					choices: CHOICES.SPEED_CHOICES,
					default: 'relative',
				},
				{
					id: 'relative',
					type: 'number',
					label: 'Speed variation (-100 to 100)',
					max: 100,
					min: -100,
					default: '0',
					isVisible: (options) => options.behaviour == 'relative',
				},
				{
					id: 'absolute',
					type: 'number',
					label: 'Speed (50 half speed, 150 1.5 speed)',
					max: 50,
					min: 150,
					default: 0,
					isVisible: (options) => options.direction == 'absolute',
				},
			],
			callback: (event) => {
				let message = `/cue/${event.options.target}/speed`
				let arg = { type: 'i', value: 0 }

				switch (event.options.behaviour) {
					case 'absolute':
						arg.value = parseInt(event.options.absolute)
						break
					case 'relative':
						const variation = parseInt(event.options.relative)
						variation >= 0 ? (message += '/+') : (message += '/-')
						arg.value = Math.abs(variation)
						break
					case 'revert':
						message += '/revert'
				}

				sendOscMessage(message, [arg])
			},
		},

		track: {
			name: 'SELECT TRACK',
			description: 'Playback will jump to the specified track in a Play List cue.',
			options: [
				{
					id: 'target',
					type: 'dropdown',
					label: 'Q# (no spaces allowed) or select target',
					choices: CHOICES.TARGET_CHOICES,
					allowCustom: true,
				},
				{
					id: 'selection',
					type: 'dropdown',
					label: 'Select track index or label',
					choices: CHOICES.POSITION_CHOICES,
					default: 'first',
				},
			],
			callback: (event) => {
				sendOscMessage(`/cue/${event.options.target}/track`, [
					{
						type: 's',
						value: event.target.selection,
					},
				])
			},
		},

		volume: {
			name: 'VOLUME',
			description: 'Changes the volume of the specified playing cue without changing the cue properties',
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
					label: 'Select behaviour',
					choices: CHOICES.SPEED_CHOICES,
					default: '+',
				},
				{
					id: 'ammount',
					type: 'number',
					label: 'Volume change (0 to 60)',
					default: '1',
					max: 60,
					min: 0,
					isVisible: (options) => options.direcction != 'revert',
				},
			],
			callback: (event) => {
				let message = `/cue/${event.options.target}/`

				message += event.options.direcction == 'absolute' ? 'volume' : 'volume/' + event.options.direction
				sendOscMessage(message, [
					{
						type: 'i',
						value: parseInt(event.options.ammount),
					},
				])
			},
		},

		stopwatch: {
			name: 'STOPWATCH',
			description: 'Controls the stopwatch function.',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: CHOICES.STOPWATCH_CHOICES,
				},
			],
			callback: (event) => {
				sendOscMessage(`/stopwatch/${event.options.action}`, [])
			},
		},
	})
}
