const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		CheckState: {
			name: 'Action states',
			type: 'boolean',
			label: 'Action enabled states',
			defaultStyle: {
				bgcolor: combineRgb(0, 0, 0),
				color: combineRgb(0, 255, 0),
			},
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Select action',
					default: 0,
					choices: [
						{ id: 0, label: 'GO' },
						{ id: 1, label: 'Stop all' },
						{ id: 2, label: 'Fade all' },
						{ id: 3, label: 'Previous' },
						{ id: 4, label: 'Next' },
					],
				},
			],
			callback: (feedback) => {
				switch (feedback.options.action) {
					case 0:
						return self.goStatus
					case 1:
						return self.stopAllStatus
					case 2:
						return self.fadeAllStatus
					case 3:
						return self.prevStatus
					case 4:
						return self.nextStatus
				}
			},
		},

		active: {
			name: 'Current cue status',
			type: 'boolean',
			label: 'The current cue is active',
			defaultStyle: {
				bgcolor: combineRgb(0, 0, 0),
				color: combineRgb(0, 255, 0),
			},
			options: [],
			callback: () => {
				return !self.goStatus && self.nextStatus
			},
		},

		WarningTime: {
			name: 'End warning',
			type: 'boolean',
			label: 'Set time to ends',
			defaultStyle: {
				color: combineRgb(255, 0, 0),
			},
			options: [
				{
					id: 'seconds',
					type: 'textinput',
					label: 'Seconds to warm (max 59)',
					default: 5,
				},
			],
			callback: (feedback) => {
				if (!self.timeRemaining.includes(':')) {
					// self.log('info', 'Time to go')
					return feedback.options.seconds >= parseInt(self.timeRemaining)
				}
			},
		},
	})
}
