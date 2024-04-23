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
					isVisible: (options) => options.action.includes('*'),
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
					isVisible: (options) => options.action.includes('-'),
				},

				{
					id: 'seconds',
					type: 'textinput',
					label: 'Seconds',
					default: 5,
					isVisible: (options) => options.action === '-jump',
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
						target = ''

						args.push({ type: 'f', value: parseFloat(event.options.seconds) })
				}
				command = command + target + action
				self.log('info', `Command: ${command}`)
				sendOscMessage(command, args)
			},
		},
	})
}
