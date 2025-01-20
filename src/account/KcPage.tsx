import { Suspense } from "react";
import type { ClassKey } from "keycloakify/account";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/account/DefaultPage";
// import Account from "./Account";
// import Password from "./Password";
// import Sessions from "./Sessions";
import { Template } from "./Template";
import Account from "./pages/Account";
import Password from "./pages/Password";
import Totp from "./pages/Totp";
import Sessions from "./pages/Sessions";
import Applications from "./pages/Applications";
// import Template from "keycloakify/account/Template";

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "account.ftl":
                        return <Account kcContext={kcContext} i18n={i18n} classes={classes} Template={Template} doUseDefaultCss={true} />;
                    case "password.ftl":
                        return <Password kcContext={kcContext} i18n={i18n} classes={classes} Template={Template} doUseDefaultCss={true} />;
                    case "totp.ftl":
                        return <Totp kcContext={kcContext} i18n={i18n} classes={classes} Template={Template} doUseDefaultCss={true} />;
                    case "sessions.ftl":
                        return <Sessions kcContext={kcContext} i18n={i18n} classes={classes} Template={Template} doUseDefaultCss={true} />;
                    case "applications.ftl":
                        return <Applications kcContext={kcContext} i18n={i18n} classes={classes} Template={Template} doUseDefaultCss={true} />;
                    default:
                        return <DefaultPage kcContext={kcContext} i18n={i18n} classes={classes} Template={Template} doUseDefaultCss={true} />;
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
