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
			type: 'button',
			category: 'ACTIONS',
			name: `GO`,
			style: {
				text: `GO`,
				size: 'auto',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'go',
							options: {
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
					feedbackId: 'checkState',
					options: {
						action: 0,
					},
					style: {
						text: `GO`,
						size: 'auto',
						color: GREEN,
						bgcolor: HIGHLIGHT,
					},
				},
			],
		},

		stop_all: {
			type: 'button',
			category: 'ACTIONS',
			name: `STOP ALL`,
			style: {
				text: `STOP ALL`,
				size: '18',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'stop',
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
					feedbackId: 'checkState',
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
			category: 'ACTIONS',
			name: `PAUSE ALL`,
			style: {
				text: `PAUSE ALL`,
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
					feedbackId: 'checkState',
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
			category: 'ACTIONS',
			name: `FADE ALL`,
			style: {
				text: `FADE ALL`,
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
					feedbackId: 'checkState',
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

		restart_all: {
			type: 'button',
			category: 'ACTIONS',
			name: `RESTART ALL`,
			style: {
				text: `RESTART ALL`,
				size: '14',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'restart',
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
					feedbackId: 'checkState',
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
					feedbackId: 'checkState',
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
					feedbackId: 'checkState',
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
					feedbackId: 'checkState',
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
					feedbackId: 'checkState',
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

		t_remaining: {
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
					feedbackId: 'warningTime',
					options: {
						seconds: 5,
					},
					style: {
						color: RED,
					},
				},
			],
		},

		t_elapsed: {
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

		current_cue: {
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
			category: 'CURRENT CUE ADJUSTMENTS',
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
			category: 'CURRENT CUE ADJUSTMENTS',
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
			category: 'CURRENT CUE ADJUSTMENTS',
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

		speed_up: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `SPEED UP`,
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
							actionId: 'speed',
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

		speed_down: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `SPEED DOWN`,
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
							actionId: 'speed',
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

		speed_revert: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `SPEED REVERT`,
			style: {
				text: `SPEED`,
				size: '18',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'speed',
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

		pan_left: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `PAN LEFT`,
			style: {
				text: `<`,
				size: 'Auto',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pan',
							options: {
								target: 'current',
								direction: '-',
								ammount: '1',
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

		pan_right: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `PAN RIGHT`,
			style: {
				text: `>`,
				size: 'Auto',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pan',
							options: {
								target: 'current',
								direction: '+',
								ammount: '1',
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

		pan_revert: {
			type: 'button',
			category: 'CURRENT CUE ADJUSTMENTS',
			name: `VOL REVERT`,
			style: {
				text: `PAN`,
				size: '18',
				color: INACTIVE_TEXT,
				bgcolor: INACTIVE_BACKGROUND,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pan',
							options: {
								target: 'current',
								direction: 'revert',
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
