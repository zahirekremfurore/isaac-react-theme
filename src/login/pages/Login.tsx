import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";

import { Separator } from "../../components/ui/separator";
import { PasswordWrapper } from "../../components/ui/PasswordWrapper";
import SocialProviders from "../../components/ui/SocialProviders";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            
            // infoNode={
            //     <div id="kc-registration" className="">
            //         <span className="text-foreground text-xl">
            //             {msgStr("noAccount")}{" "}
            //             <a tabIndex={8} href={url.registrationUrl} className="mx-5 link-style ">
            //                 {msgStr("doRegister")}
            //             </a>
            //         </span>
            //     </div>
            // }
            socialProvidersNode={<SocialProviders social={social as any} kcClsx={kcClsx} clsx={clsx} msg={msg} realm={realm} />}
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={e => {
                                // e.preventDefault();
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                            className="space-y-6"
                        >
                            {!usernameHidden && (
                                <div>
                                    <Label htmlFor="username" className="text-lg">
                                        {!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")}
                                    </Label>
                                    <Input
                                        tabIndex={2}
                                        id="username"
                                        className=""
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                    {messagesPerField.existsError("username", "password") && (
                                        <div
                                            // id="input-error"
                                            className="input-error py-3"
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: messagesPerField.getFirstError("username", "password")
                                            }}
                                        />
                                    )}
                                </div>
                            )}

                            <div>
                                <Label htmlFor="password" className="text-lg">
                                    {msg("password")}
                                </Label>
                                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                    <Input
                                        tabIndex={3}
                                        id="password"
                                        className="text-foreground"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                </PasswordWrapper>
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: messagesPerField.getFirstError("username", "password")
                                        }}
                                    />
                                )}
                            </div>

                            <div className="space-y-2 md:space-y-0 md:flex md:justify-between text-lg ">
                                <div>
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="flex items-center space-x-2 ">
                                            <Checkbox tabIndex={5} id="rememberMe" name="rememberMe" defaultChecked={!!login.rememberMe} />
                                            <Label htmlFor="rememberMe" className="text-md cursor-pointer">
                                                {msgStr("rememberMe")}
                                            </Label>
                                        </div>
                                    )}
                                </div>
                                <div className=" link-style">
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <a className="hover:text-primary" tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                {msgStr("doForgotPassword")}
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <Input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />

                                <Button tabIndex={7} disabled={isLoginButtonDisabled} type="submit" className="w-full ">
                                    {msgStr("doLogIn")}
                                </Button>
                            </div>
                            <Separator />
                        </form>
                    )}
                </div>
                {realm.password && realm.registrationAllowed && !registrationDisabled && (
                    <div className="mt-6">
                        {emailError && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{emailError}</AlertDescription>
                            </Alert>
                        )}
                        <form
                            onSubmit={async e => {
                                e.preventDefault();
                                setIsLoading(true);
                                setEmailError("");
                                try {
                                    setEmailError("Email already exists.");
                                    window.location.href = `${url.registrationUrl}&email=${encodeURIComponent(email)}`
                                    // Email validation API call
                                    // const response = await fetch(`${kcContext.url.resourcesPath}/check-email`, {
                                    //     method: "POST",
                                    //     headers: {
                                    //         "Content-Type": "application/json"
                                    //     },
                                    //     body: JSON.stringify({ email })
                                    // });

                                    // const data = await response.json();

                                    // if (data.exists) {
                                    //     setEmailError("Email already exists.");
                                    // } else {
                                    //     // Redirect to registration page with email
                                    //     window.location.href = `${url.registrationUrl}?email=${encodeURIComponent(email)}`;
                                    // }
                                } catch (error) {
                                    setEmailError("An error occurred. Please try again.");
                                } finally {
                                    setIsLoading(false);
                                }

                                // Handle form submission
                            }}
                        >
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{msgStr("noAccount")}</h3>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="cursor-pointer">
                                        {msg("email")}
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="emailAddress"
                                        maxLength={75}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        disabled={isLoading}
                                        aria-invalid={!!emailError}
                                    />
                                </div>

                                <div>
                                    <Button type="submit" className="w-full">
                                        {msg("doContinue")}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Template>
    );
}
