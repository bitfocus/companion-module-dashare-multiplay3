module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 't_remain', name: 'Active cue time remaining' },
		{ variableId: 't_elapsed', name: 'Active cue time elapsed' },
		{ variableId: 'q_description', name: 'Selected cue description' },
		{ variableId: 'st_fadeAll', name: 'Fade all avaliable' },
		{ variableId: 'st_go', name: 'Go status avaliable' },
		{ variableId: 'st_stopAll', name: 'Stop all avaliable' },
		{ variableId: 'st_prev', name: 'Previous cue avaliable' },
		{ variableId: 'st_next', name: 'Next cue avaliable' },
	])
}
