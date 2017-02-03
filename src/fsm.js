class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == null)
            throw new Error("No config");
        else{
            this.initialState = config.initial;
            this.states = config.states;
            this.activeState = config.initial;
            this.statesHistory = [];
            this.currentStateIndex;
        }

    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        for (let key in this.states){
            if (key == state) {
                this.activeState = state;
                this.statesHistory.push(state);
                this.currentStateIndex = this.statesHistory.length - 1;
                return;
            }
        }
        throw new Error("State " + state + " doesn't exist!!!");
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        console.log(" " + this.states[this.activeState]['transitions'][event] + " event " + event + this.activeState);
        if (!event){
            throw new Error();
            return;
        }else if (!this.states[this.activeState] || !this.states[this.activeState]['transitions'][event])
        {
            throw new Error();
            return;
        }

        this.activeState = this.states[this.activeState]["transitions"][event];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.initialState;
        //this.clearHistory();
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        console.log("getStates");
        console.log("event " + event);
        var states = [];
        var isUnique = function(state){
            for (let i = 0; i < states.length; i++){
                if (states[i] == state) return false;
            }
            return true;
        };
        for(let state in this.states){
            for (let transition in this.states[state].transitions){
                if (event === undefined){
                    if (isUnique(state))
                        states.push(state);
 1               }else if (transition == event){
                    states.push(state);
                }

            }
        }
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        this.activeState = this.statesHistory.pop();
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {
        this.statesHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
