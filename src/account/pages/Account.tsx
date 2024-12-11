import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { TemplateProps } from "keycloakify/account/TemplateProps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Account(props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template } = props;

    const classes = {
        ...props.classes,
        kcBodyClass: clsx(props.classes?.kcBodyClass, "user")
    };

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const {
        url,
        realm,
        messagesPerField,
        stateChecker,
        /*account,*/ // NOTE: We don't need the account object since we are fetching more detailed information from the API (userProfile)
        referrer,
        account
    } = kcContext;

    const { msg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="account">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 max-w-2xl" >
                <div className="w-full md:w-5/6">
                    <h2 className="text-2xl font-semibold">{msg("editAccountHtmlTitle")}</h2>
                </div>
                <div className="w-full md:w-1/6 text-right">
                    <span className="text-sm text-gray-600">
                        <span className="text-red-500 mr-1">*</span> {msg("requiredFields")}
                    </span>
                </div>
            </div>
            <form action={url.accountUrl} className="max-w-2xl" method="post">
                <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

                {!realm.registrationEmailAsUsername && (
                    <div className={clsx("mb-6", messagesPerField.printIfExists("username", "text-red-500"))}>
                        <div className="flex flex-col md:flex-row md:items-center">
                            <div className="w-full md:w-1/4 mb-2 md:mb-0">
                                <Label htmlFor="username" className="text-sm font-medium">
                                    {msg("username")}
                                    {realm.editUsernameAllowed && <span className="text-red-500 ml-1">*</span>}
                                </Label>
                            </div>

                            <div className="w-full md:w-3/4">
                                <Input
                                    type="text"
                                    id="username"
                                    name="username"
                                    disabled={!realm.editUsernameAllowed}
                                    defaultValue={account.username}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className={clsx("mb-6", messagesPerField.printIfExists("email", "text-red-500"))}>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <div className="w-full md:w-1/4 mb-2 md:mb-0">
                            <Label htmlFor="email" className="text-sm font-medium">
                                {msg("email")}
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                        </div>

                        <div className="w-full md:w-3/4">
                            <Input
                                type="text"
                                id="email"
                                name="email"
                                defaultValue={account.email}
                                className="w-full"
                                autoFocus
                            />
                        </div>
                    </div>
                </div>

                <div className={clsx("mb-6", messagesPerField.printIfExists("firstName", "text-red-500"))}>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <div className="w-full md:w-1/4 mb-2 md:mb-0">
                            <Label htmlFor="firstName" className="text-sm font-medium">
                                {msg("firstName")}
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                        </div>

                        <div className="w-full md:w-3/4">
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                defaultValue={account.firstName}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className={clsx("mb-6", messagesPerField.printIfExists("lastName", "text-red-500"))}>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <div className="w-full md:w-1/4 mb-2 md:mb-0">
                            <Label htmlFor="lastName" className="text-sm font-medium">
                                {msg("lastName")}
                                <span className="text-red-500 ml-1">*</span>
                            </Label>
                        </div>

                        <div className="w-full md:w-3/4">
                            <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                defaultValue={account.lastName}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    {referrer !== undefined && (
                        <Button variant="outline" asChild>
                            <a href={referrer?.url}>{msg("backToApplication")}</a>
                        </Button>
                    )}
                    <Button type="submit" name="submitAction" value="Save">
                        {msg("doSave")}
                    </Button>
                    <Button type="submit" variant="outline" name="submitAction" value="Cancel">
                        {msg("doCancel")}
                    </Button>
                </div>

                {kcContext.features.passwordUpdateSupported && (
                    <div className="mt-8 pt-8 border-t">
                        <Button variant="outline" asChild>
                            <a href={url.passwordUrl}>{msg("changePasswordHtmlTitle")}</a>
                        </Button>
                    </div>
                )}
            </form>
            
            <div className="container mx-auto p-6">
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Username:</label>
                                <p className="text-lg">{account.username}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Email:</label>
                                <p className="text-lg">{account.email}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium">First Name:</label>
                                <p className="text-lg">{account.firstName}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Last Name:</label>
                                <p className="text-lg">{account.lastName}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Template>
    );
}