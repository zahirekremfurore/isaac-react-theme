import { type PageProps } from "keycloakify/account/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Password(props: PageProps<Extract<KcContext, { pageId: "password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, messagesPerField, stateChecker } = kcContext;

    const { msg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="password">
            <div className="flex flex-col gap-6 max-w-2xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{msg("changePasswordHtmlTitle")}</h2>
                    <Button variant="outline" onClick={() => window.location.href = url.accountUrl}>
                        {msg("backToApplication")}
                    </Button>
                </div>

                <form action={url.passwordUrl} method="post" className="space-y-6">
                    <input type="hidden" name="stateChecker" value={stateChecker} />

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="password" className="text-sm font-medium">
                                {msg("password")}
                            </label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                autoFocus
                                autoComplete="current-password"
                                className={clsx("mt-1", messagesPerField.printIfExists("password", "border-red-500"))}
                            />
                            {messagesPerField.existsError("password") && (
                                <p className="mt-1 text-sm text-red-500">
                                    {messagesPerField.get("password")}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password-new" className="text-sm font-medium">
                                {msg("passwordNew")}
                            </label>
                            <Input
                                type="password"
                                id="password-new"
                                name="password-new"
                                autoComplete="new-password"
                                className={clsx("mt-1", messagesPerField.printIfExists("password-new", "border-red-500"))}
                            />
                            {messagesPerField.existsError("password-new") && (
                                <p className="mt-1 text-sm text-red-500">
                                    {messagesPerField.get("password-new")}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password-confirm" className="text-sm font-medium">
                                {msg("passwordConfirm")}
                            </label>
                            <Input
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                autoComplete="new-password"
                                className={clsx("mt-1", messagesPerField.printIfExists("password-confirm", "border-red-500"))}
                            />
                            {messagesPerField.existsError("password-confirm") && (
                                <p className="mt-1 text-sm text-red-500">
                                    {messagesPerField.get("password-confirm")}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button type="submit" name="submitAction" value="Save">
                            {msg("doSave")}
                        </Button>
                        <Button type="submit" name="submitAction" value="Cancel" variant="outline">
                            {msg("doCancel")}
                        </Button>
                    </div>
                </form>
            </div>
        </Template>
    );
}
