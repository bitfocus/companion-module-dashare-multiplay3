const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		ChannelState: {
			name: 'Example Feedback',
			type: 'boolean',
			label: 'Channel State',
			defaultStyle: {
				bgcolor: combineRgb(0, 0, 0),
				color: combineRgb(0, 255, 0),
			},
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 5,
					min: 0,
					max: 10,
				},
			],
			callback: (feedback) => {
				console.log('Hello world!', feedback.options.num)
			},
		},
		CheckState: {
			name: 'Status',
			type: 'boolean',
			label: 'Check avaliability of go, fade all and stop all actions',
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
						{ id: 0, label: 'Go' },
						{ id: 1, label: 'Stop all' },
						{ id: 2, label: 'Fade all' },
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
