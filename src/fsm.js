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
            //this.activeState = config.initial;
            this.statesHistory = [config.initial];
            this.currentStateIndex = 0;
        }

    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.statesHistory[this.currentStateIndex];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        for (let key in this.states){
            if (key == state) {
                //this.activeState = state;
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
        console.log("trrrrr")
        var activeState = this.statesHistory[this.currentStateIndex];
        console.log(this.states[activeState]);
        var newState = this.states[activeState]['transitions'][event];
        console.log("activeState " + activeState + " newState " + newState + " event " + event);
        if (!event){
            throw new Error();
            return;
        }else if (!this.states[activeState] || !newState)
        {
            throw new Error();
            return;
        }

        if (newState == this.statesHistory[this.statesHistory.length - 1]) return;

        this.statesHistory.push(newState);
        this.currentStateIndex = this.statesHistory.length - 1;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.initialState);
        //this.clearHistory();
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        //console.log("getStates");
        //console.log("event " + event);
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
        if (this.statesHistory[this.currentStateIndex - 1]) {
            console.log("undo" + this.statesHistory[this.currentStateIndex - 1]);
            this.currentStateIndex = this.currentStateIndex - 1;
            return true;
        }
        return false;
        /*var currentState = this.activeState;

        if (currentState == this.initialState) return false;

        for(let state in this.states){
            for (let transition in this.states[state].transitions){
                if (this.states[state].transitions[transition] == currentState){
                    this.activeState = state;
                    return true;
                }

            }
        }
        return false;*/
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.statesHistory[this.currentStateIndex + 1]) {
            this.currentStateIndex = this.currentStateIndex + 1;
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.statesHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
