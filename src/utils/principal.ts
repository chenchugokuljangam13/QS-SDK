import { QuickSightClient, ListUsersCommand } from "@aws-sdk/client-quicksight";

const region = "us-east-1";
const accountId = "797098543009";
const namespace = "default";

const client = new QuickSightClient({ region });

const getAllPrincipals = async (): Promise<string[]> => {
  let users: string[] = [];
  let nextToken: string | undefined = undefined;

  // Fetch all users dynamically
  while (true) {
    const command = new ListUsersCommand({
      AwsAccountId: accountId,
      Namespace: namespace,
      NextToken: nextToken,
      MaxResults: 100
    });

    const response = await client.send(command);
    response.UserList?.forEach(user => users.push(user.UserName!));

    if (!response.NextToken) break; // exit loop if no more pages
    nextToken = response.NextToken;
  }

  // Build Principal ARNs
  return users.map(username => `arn:aws:quicksight:${region}:${accountId}:user/${namespace}/${username}`);
};

// Usage example
getAllPrincipals().then(principals => console.log("Dynamic Principals:", principals));
