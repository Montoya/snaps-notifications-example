import type { OnHomePageHandler, OnInstallHandler } from '@metamask/snaps-sdk';
import { Box, Text, Section, Heading, Link } from '@metamask/snaps-sdk/jsx';

export const onInstall: OnInstallHandler = async () => {
  await snap.request({
    method: "snap_dialog",
    params: {
      type: "alert",
      content: (
        <Box>
          <Section>
            <Heading>Improved Notifications Example</Heading>
            <Text>
              This Snap generates notifications with expanded UI. 
              To try it, go to the Snap homepage.
            </Text>
          </Section>
        </Box>
      )
    },
  });
};

export const onHomePage: OnHomePageHandler = async () => {
  const interfaceId = await snap.request({ 
    method: "snap_createInterface",
    params: {
      ui: <Box>
            <Section>
              <Heading>Hello, user!</Heading>
              <Text>You have successfully arrived at my Snap homepage!</Text>
            </Section>
          </Box>
    }
  }); 
  return { 
    id: interfaceId
  }
};