import type { PageProps } from "keycloakify/login/pages/PageProps";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, buttonVariants } from "../../components/ui/button";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={false}
        >
            <div id="kc-error-message">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{msg("errorTitle")}</AlertTitle>
                    <AlertDescription>
                        <p className="font-bold text-red-500 " dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                    </AlertDescription>
                </Alert>

                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <Button asChild variant="link" className="mt-4">
                        <a id="backToApplication" href={client.baseUrl} >
                        {msg("backToApplication")}
                        </a>
                    </Button>
                )}
            </div>
        </Template>
    );
}
