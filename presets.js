const { combineRgb } = require('@companion-module/base')
const CHOICES = require('./choices')

const INACTIVE_TEXT = combineRgb(182, 182, 182)
const INACTIVE_BACKGROUND = combineRgb(102, 0, 102)
const ACTIVE_TEXT = combineRgb(204, 204, 204)
const ACTIVE_BACKGROUND = combineRgb(153, 0, 153)
const GREEN = combineRgb(0, 204, 0)
const RED = combineRgb(182, 0, 0)
const HIGHLIGHT = combineRgb(204, 0, 204)

module.exports = function (self) {
	self.setPresetDefinitions({
		go: {
			type: 'button', // This must be 'button' for now
			category: 'Actions', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
			name: `GO`, // A name for the preset. Shown to the user when they hover over it
			style: {
				// This is the minimal set of style properties you must define
				text: `GO`, // You can use variables from your module here
				size: 'auto',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'go',
							options: {
								// options values to use
								stopAll: true,
								target: 'current',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'CheckState',
					options: {
						action: 0,
					},
					style: {
						// This is the minimal set of style properties you must define
						text: `GO`, // You can use variables from your module here
						size: 'auto',
						color: GREEN,
						bgcolor: HIGHLIGHT,
					},
				},
			],
		},

		stop_all: {
			type: 'button', // This must be 'button' for now
			category: 'Actions', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
			name: `STOP ALL`, // A name for the preset. Shown to the user when they hover over it
			style: {
				// This is the minimal set of style properties you must define
				text: `STOP`, // You can use variables from your module here
				size: '18',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'stop',
							options: {
								// options values to use
								target: 'active',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'CheckState',
					options: {
						action: 1,
					},
					style: {
						color: ACTIVE_TEXT,
						bgcolor: ACTIVE_BACKGROUND,
					},
				},
			],
		},

		pause_all: {
			type: 'button',
			category: 'Actions',
			name: `PAUSE ALL`,
			style: {
				text: `PAUSE`,
				size: '18',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pause',
							options: {
								toggle: true,
								target: 'active',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'CheckState',
					options: {
						action: 1,
					},
					style: {
						color: ACTIVE_TEXT,
						bgcolor: ACTIVE_BACKGROUND,
					},
				},
			],
		},

		fade_all: {
			type: 'button',
			category: 'Actions',
			name: `FADE ALL`,
			style: {
				text: `FADE`,
				size: '18',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'fade',
							options: {
								target: 'active',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'CheckState',
					options: {
						action: 2,
					},
					style: {
						color: ACTIVE_TEXT,
						bgcolor: ACTIVE_BACKGROUND,
					},
				},
			],
		},

		next: {
			type: 'button',
			category: 'PLAYHEAD MOVE',
			name: `SELECT NEXT CUE`,
			style: {
				text: `NEXT`,
				size: '18',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'select',
							options: {
								target: 'next',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'CheckState',
					options: {
						action: 4,
					},
					style: {
						color: ACTIVE_TEXT,
						bgcolor: ACTIVE_BACKGROUND,
					},
				},
			],
		},

		prev: {
			type: 'button',
			category: 'PLAYHEAD MOVE',
			name: `SELECT PREVIOUS CUE`,
			style: {
				text: `PREV`,
				size: '18',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'select',
							options: {
								target: 'prev',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'CheckState',
					options: {
						action: 3,
					},
					style: {
						color: ACTIVE_TEXT,
						bgcolor: ACTIVE_BACKGROUND,
					},
				},
			],
		},

		first: {
			type: 'button',
			category: 'PLAYHEAD MOVE',
			name: `SELECT FIRST CUE`,
			style: {
				text: `FIRST`,
				size: '18',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'select',
							options: {
								target: 'first',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'CheckState',
					options: {
						action: 3,
					},
					style: {
						color: ACTIVE_TEXT,
						bgcolor: ACTIVE_BACKGROUND,
					},
				},
			],
		},

		last: {
			type: 'button',
			category: 'PLAYHEAD MOVE',
			name: `SELECT LAST CUE`,
			style: {
				text: `LAST`,
				size: '18',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'select',
							options: {
								target: 'last',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'CheckState',
					options: {
						action: 4,
					},
					style: {
						color: ACTIVE_TEXT,
						bgcolor: ACTIVE_BACKGROUND,
					},
				},
			],
		},

		remaining: {
			type: 'button',
			category: 'INFO',
			name: `TIME REMAINING`,
			style: {
				text: `$(multiplay:t_remain)`,
				size: 'Auto',
				color: INACTIVE_BACKGROUND,
				bgcolor: INACTIVE_TEXT,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'WarningTime',
					options: {
						seconds: 5,
					},
					style: {
						color: ACTIVE_TEXT,
					},
				},
			],
		},

		elapsed: {
			type: 'button',
			category: 'INFO',
			name: `TIME ELAPSED`,
			style: {
				text: `$(multiplay:t_elapsed)`,
				size: 'Auto',
				color: INACTIVE_BACKGROUND,
				bgcolor: INACTIVE_TEXT,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		},

		current: {
			type: 'button',
			category: 'INFO',
			name: `CURRENT CUE`,
			style: {
				text: `$(multiplay:q_description)`,
				size: 'Auto',
				color: INACTIVE_BACKGROUND,
				bgcolor: INACTIVE_TEXT,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		},

		volume_up: {
			type: 'button',
			category: 'CURRENT CUE SETTINGS',
			name: `VOL UP`,
			style: {
				text: `+`,
				size: '24',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'volume',
							options: {
								target: 'current',
								behaviour: 'relative',
								relative: '1',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'active',
					options: {},
					style: {
						color: ACTIVE_TEXT,
						bgcolor: ACTIVE_BACKGROUND,
					},
				},
			],
		},

		volume_down: {
			type: 'button',
			category: 'CURRENT CUE SETTINGS',
			name: `VOL DOWN`,
			style: {
				text: `-`,
				size: 'Auto',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'volume',
							options: {
								target: 'current',
								behaviour: 'relative',
								relative: '-1',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'active',
					options: {},
					style: {
						color: ACTIVE_TEXT,
						bgcolor: ACTIVE_BACKGROUND,
					},
				},
			],
		},

		volume_revert: {
			type: 'button',
			category: 'CURRENT CUE SETTINGS',
			name: `VOL REVERT`,
			style: {
				text: `VOL`,
				size: '18',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'volume',
							options: {
								target: 'current',
								behaviour: 'revert',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'active',
					options: {},
					style: {
						color: ACTIVE_TEXT,
						bgcolor: ACTIVE_BACKGROUND,
					},
				},
			],
		},
	})
}
