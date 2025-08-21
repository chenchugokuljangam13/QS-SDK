import { getAccountId } from "./commonHelper";
const region = "us-east-1";

export const getGroupArn = async(groupName: string): Promise<string> => {
    const accountId = await getAccountId();
    return `arn:aws:quicksight:${region}:${accountId}:group/default/${groupName}`;
}

