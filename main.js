const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')

const { Server } = require('node-osc')

class MultiplayInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.initOsc()
		this.initVariables()
	}

	initOsc() {
		const self = this

		self.ready = true

		if (self.listener) {
			self.listener.close()
		}

		self.listener = new Server(self.config.feedback_port, '0.0.0.0', () => {
			self.log('info', 'Escuchando el osc verso...')
		})

		self.listener.on('message', function (message) {
			self.log('info', 'Message: ' + message)
			switch (message[0]) {
				case '/status/elapsed':
					self.setVariableValues({ t_elapsed: message[1] })
					break
				case '/status/remaining':
					self.setVariableValues({ t_remain: message[1] })
					break
				case '/status/current/qdesc':
					self.setVariableValues({ q_description: message[1] })
					break
				case '/status/stopall':
					self.stopAllStatus = message[1] === true
					self.setVariableValues({ st_stopAll: self.stopAllStatus })
					break
				case '/status/fadeall':
					self.fadeAllStatus = message[1] === true
					self.fadingOutStatus = false
					self.setVariableValues({ st_fadeAll: self.fadeAllStatus })
					break
				case '/status/go':
					self.goStatus = message[1] === true
					self.setVariableValues({ st_go: self.goStatus })
					break
				case '/status/select/prev':
					self.prevStatus = message[1] === true
					self.setVariableValues({ st_prev: self.prevStatus })
				case '/status/select/next':
					self.nextStatus = message[1] === true
					self.setVariableValues({ st_next: self.nextStatus })
			}
			self.checkFeedbacks('CheckState', 'FadingOut')
		})
	}

	initVariables() {
		const self = this

		//Action enabled states

		self.goStatus = false
		self.stopAllStatus = false
		self.fadeAllStatus = false
		self.fadingOutStatus = false
		self.prevStatus = false
		self.nextStatus = false
	}

	// When module gets deleted
	async destroy() {
		const self = this

		if (self.listener) {
			self.listener.close()
		}

		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Target Port',
				width: 4,
				regex: Regex.PORT,
			},
			{
				type: 'textinput',
				id: 'feedback_port',
				label: 'Feedback Port',
				width: 4,
				regex: Regex.PORT,
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(MultiplayInstance, UpgradeScripts)
