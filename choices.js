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
		{ id: 'playhead', label: 'CURRENT' },
		{ id: 'active', label: 'ALL' },
	],

	TARGET_CHOICES: [{ id: 'playhead', label: 'CURRENT' }],

	POSITION_CHOICES: [
		{ id: 'first', label: 'FIRST' },
		{ id: 'last', label: 'LAST' },
		{ id: 'next', label: 'NEXT' },
		{ id: 'prev', label: 'PREVIOUS' },
	],

	JUMP_CHOICES: [
		{ id: 'back', label: 'BACK' },
		{ id: 'fwd', label: 'FORDWARD' },
		{ id: 'end', label: 'END' },
	],
})
