import { getPage } from "aws-chrome-lambda-layer";

export const handler = async () => {
  const page = await getPage("https://www.google.com");

  console.log(page);

  return {
    statusCode: 200,
    body: "good job",
  };
};
