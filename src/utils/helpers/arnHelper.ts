import { getAccountId } from "./commonHelper";
import { REGION } from "./commonHelper";
export const getGroupArn = async(groupName: string): Promise<string> => {
    const accountId = await getAccountId();
    return `arn:aws:quicksight:${REGION}:${accountId}:group/default/${groupName}`;
}

