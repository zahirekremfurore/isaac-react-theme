import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "otp-form.ftl" });

const meta = {
    title: "login/otp-form.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithInvalidCredential: Story = {
    render: () => <KcPageStory
    kcContext={{
        auth: {
            attemptedUsername: "user@user.com"
        },
        url: {
            loginRestartFlowUrl: "#",
            loginAction: "#"
        },
        messagesPerField: {
            // NOTE: The other functions of messagesPerField are derived from get() and
            // existsError() so they are the only ones that need to mock.
            existsError: (fieldName: string, ...otherFieldNames: string[]) => {
                const fieldNames = [fieldName, ...otherFieldNames];
                return fieldNames.includes("totp");
            },
            get: (fieldName: string) => {
                if (fieldName === "totp") {
                    return "Invalid OTP.";
                }
                return "";
            }
        }

    }}
    
    />
};

