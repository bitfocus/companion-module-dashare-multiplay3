module.exports = Object.freeze({
	// A tag is used to filter the targets allowed for actions:
	// * admints all
	// + position
	// - Numeric value
	// . Only current and q#
	ACTION_CHOICES: [
		{ id: '.go', label: 'GO' },
		{ id: '*stop', label: 'STOP' },
		{ id: '*pause', label: 'PAUSE' },
		{ id: '*pausetoggle', label: 'PAUSE TOGGLE' },
		{ id: '*restart', label: 'RESTART' },
		{ id: '*resume', label: 'RESUME' },
		{ id: '+select', label: 'MOVE PLAYHEAD' },
		{ id: '*fade', label: 'FADE' },
		{ id: '.cuepoint', label: 'CUE POSITION' },
		{ id: '-jump', label: 'JUMP TO' },
		{ id: '.pan', label: 'PAN' },
		{ id: '.volume', label: 'VOLUME' },
		{ id: '.speed', label: 'SPEED' },
		{ id: '.track', label: 'TRACK' },
	],

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
})
