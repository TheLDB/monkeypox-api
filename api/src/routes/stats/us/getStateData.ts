import { FastifyPluginAsync } from "fastify";
import * as stateJSONData from './states.json';
interface ParamData {
	state: string;
}

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get<{ Params: ParamData }>("/:state", async function (request, reply) {
		// Ensure that the the state exists (either longform or shortcode)
		const { state } = request.params;
        const getStateKey = Object.keys(stateJSONData).find(key => key.toLowerCase() === state.toLowerCase());
        const getStateName = Object.values(stateJSONData).find(value => value.toLowerCase() === state.toLowerCase());
        if(getStateKey) {
            // * User provided a Key (ex. CO, NY, etc...) so we search for stats by the key
        }
        else if(getStateName) {
            // * User provided a full name (ex. Colorado, New York, etc...) so we search for stats by the full name

        }
        else {
            // ! State/Key user provided does not exist
        }
	});
};

export default root;
