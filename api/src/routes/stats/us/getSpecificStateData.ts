
import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

interface QueryParams {
    stateName: string;
}

const prisma = new PrismaClient();

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.options("/:stateName", async function(request, reply) {
		reply.code(200)
		return;
	});
	
	fastify.get<{Params: QueryParams}>("/:stateName", async function (request, reply) {
        const { stateName } = request.params; 
        const stateData = await prisma.stateData.findUnique({
            where: {
                state: stateName
            }
        });

		if(stateData) {
			reply.code(200).send({
				code: 200,
				data: stateData
			});
			return;
		}
		else {
			reply.code(500).send({
				code: 500,
				error: "Didn't find any info, please report."
			})
			return;
		}
	});
};

export default root;
