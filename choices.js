module.exports = Object.freeze({
	TARGET_ALL_CHOICES: [
		{ id: 'current', label: 'CURRENT' },
		{ id: 'active', label: 'ALL' },
	],

	TARGET_CHOICES: [{ id: 'current', label: 'CURRENT' }],

	POSITION_CHOICES: [
		{ id: 'first', label: 'FIRST' },
		{ id: 'last', label: 'LAST' },
		{ id: 'next', label: 'NEXT' },
		{ id: 'prev', label: 'PREVIOUS' },
	],

	DIRECTION_CHOICES: [
		{ id: 'back', label: 'BACK' },
		{ id: 'fwd', label: 'FORDWARD' },
		{ id: 'end', label: 'END' },
	],

	PAN_CHOICES: [
		{ id: 'absolute', label: 'ABSOLUTE' },
		{ id: '-', label: 'LEFT' },
		{ id: '+', label: 'RIGHT' },
		{ id: 'revert', label: 'REVERT' },
	],

	SPEED_CHOICES: [
		{ id: 'absolute', label: 'ABSOLUTE' },
		{ id: 'relative', label: 'RELATIVE' },
		{ id: 'revert', label: 'REVERT' },
	],

	STOPWATCH_CHOICES: [
		{ id: 'start', label: 'START' },
		{ id: 'stop', label: 'STOP' },
		{ id: 'reset', label: 'RESET' },
	],
})
