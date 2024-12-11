import { type PageProps } from "keycloakify/account/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Totp(props: PageProps<Extract<KcContext, { pageId: "totp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { totp, mode, url, messagesPerField, stateChecker } = kcContext;

    const { msg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="totp">
            <div className="flex flex-col gap-6 max-w-2xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        {msg("authenticatorTitle")}
                    </h2>
                    <Button variant="outline" onClick={() => window.location.href = url.accountUrl}>
                        {msg("backToApplication")}
                    </Button>
                </div>

                <div className="space-y-6">
                    {mode && mode == "manual" ? (
                        <ol className="list-decimal list-inside space-y-4">
                            <li>
                                {msg("totpStep1")}
                                <ul className="list-disc list-inside ml-4 mt-2">
                                    {totp.supportedApplications.map(app => (
                                        <li key={app}>{app}</li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                {msg("totpStep2")}
                                <p className="mt-2 font-mono bg-gray-100 p-2 rounded">{totp.totpSecretEncoded}</p>
                            </li>
                            <li>
                                {msg("totpStep3")}
                                <ul className="list-disc list-inside ml-4 mt-2">
                                    <li>{msg("totpStep3DeviceName")}</li>
                                </ul>
                            </li>
                        </ol>
                    ) : (
                        <ol className="list-decimal list-inside space-y-4">
                            <li>
                                {msg("totpStep1")}
                                <ul className="list-disc list-inside ml-4 mt-2">
                                    {totp.supportedApplications.map(app => (
                                        <li key={app}>{app}</li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                {msg("totpStep2")}
                                <div className="mt-2">
                                    <img src={totp.totpSecretQrCode} alt="QR code" />
                                </div>
                                <div className="mt-2">
                                    <Button variant="link" onClick={() => (window as any).location.href = mode === "qr" ? url.totpUrl : `${url.totpUrl}?mode=manual`}>
                                        {mode === "qr" ? msg("totpScanBarcode") : msg("totpManualStep2")}
                                    </Button>
                                </div>
                            </li>
                            <li>
                                {msg("totpStep3")}
                                <ul className="list-disc list-inside ml-4 mt-2">
                                    <li>{msg("totpStep3DeviceName")}</li>
                                </ul>
                            </li>
                        </ol>
                    )}

                    <form action={url.totpUrl} method="post" className="space-y-6">
                        <input type="hidden" name="stateChecker" value={stateChecker} />

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="totp" className="text-sm font-medium">
                                    {msg("authenticatorCode")}
                                </label>
                                <Input
                                    type="text"
                                    id="totp"
                                    name="totp"
                                    autoComplete="off"
                                    className={clsx("mt-1", messagesPerField.printIfExists("totp", "border-red-500"))}
                                    autoFocus
                                />
                                {messagesPerField.existsError("totp") && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {messagesPerField.get("totp")}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="totpSecret" className="text-sm font-medium">
                                    {msg("totpDeviceName")}
                                </label>
                                <Input
                                    type="text"
                                    id="totpSecret"
                                    name="totpSecret"
                                    autoComplete="off"
                                    className={clsx("mt-1", messagesPerField.printIfExists("totpSecret", "border-red-500"))}
                                />
                                {messagesPerField.existsError("totpSecret") && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {messagesPerField.get("totpSecret")}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button type="submit">
                                {msg("doLogIn")}
                            </Button>
                            <Button type="submit" name="cancel" value="true" variant="outline">
                                {msg("doCancel")}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}
