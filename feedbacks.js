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
		FadingOut: {
			name: 'Fading Out',
			type: 'boolean',
			label: 'Activates when the active cues are fading 0ut',
			defaultStyle: {
				bgcolor: combineRgb(0, 0, 0),
				color: combineRgb(255, 255, 0),
			},
			options: [],
			callback: () => {
				return self.fadingOutStatus
			},
		},
	})
}
