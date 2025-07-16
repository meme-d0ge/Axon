import type { ILoginFlowsResponse } from 'matrix-js-sdk/lib/@types/auth';

export interface FlowVariants {
	password: boolean;
	sso: boolean;
}

export const parseAuthFlowsData = (
	flows: ILoginFlowsResponse,
): FlowVariants => {
	return {
		password: flows.flows.some((flow) => flow.type === 'm.login.password'),
		sso: flows.flows.some((flow) => flow.type === 'm.login.sso'),
	} as FlowVariants;
};
