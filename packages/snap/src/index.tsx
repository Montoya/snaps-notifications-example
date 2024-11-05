import type { OnHomePageHandler, OnInstallHandler, OnUserInputHandler } from '@metamask/snaps-sdk';
import { Box, Text, Section, Heading, Button } from '@metamask/snaps-sdk/jsx';

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
              <Heading>Notifications test dashboard</Heading>
              <Text>Click the button to generate a notification, then open the notifications menu to view it.</Text>
              <Button name="notify">Generate notification</Button>
            </Section>
          </Box>
    }
  }); 
  return { 
    id: interfaceId
  }
};

export const onUserInput: OnUserInputHandler = async ({id, event}) => { 
  await snap.request({
    method: "snap_notify",
    params: {
      type: "inApp",
      message: "Check out the Minesweeper Snap!",
      title: "Minesweeper Snap now available",
      detailedView: <Box><Text>Content</Text></Box>,
      footerLink: "https://montoya.github.io/minesweeper-snap/"
    }
  }); 
  await snap.request({
    method: "snap_updateInterface",
    params: { 
      id,
      ui: <Box>
            <Section>
              <Heading>Notifications test dashboard</Heading>
              <Text>You must have clicked the button...</Text>
            </Section>
          </Box>
    }
  }); 
}
