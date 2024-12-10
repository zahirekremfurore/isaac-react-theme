import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { buttonVariants } from "../../components/ui/button";
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
            headerNode={msg("errorTitle")}
        >
            <div id="kc-error-message">
                <p className="instruction" dangerouslySetInnerHTML={{ __html: message.summary }} />
                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <p>
                        <a id="backToApplication" href={client.baseUrl} className={buttonVariants({ variant: "link" })}>
                            {msg("backToApplication")}
                        </a>
                    </p>
                )}
            </div>
        </Template>
    );
}
