import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

export default function ConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;
    const { msg, msgStr, advancedMsg } = i18n;
    const { url, totp, messagesPerField } = kcContext;

    const [code, setCode] = useState("");

    console.log("TOTP Secret: ", totp.totpSecretEncoded);
    console.log("TOTP QR Code: ", totp.totpSecretQrCode);
    console.log("TOTP kcContext: ", kcContext);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            headerNode={msg("loginTotpTitle")}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
            // doUseDefaultCss={true}
            // headerNode={false}
        >
            <div className="flex flex-col space-y-6 w-full max-w-md">
                <div className="flex flex-col space-y-2 text-center">
                    {/* <h1 className="text-2xl font-semibold tracking-tight">{msg("loginTotpTitle")}</h1> */}
                    <p className="text-sm text-muted-foreground">{msg("loginTotpStep1")}</p>
                </div>

                {messagesPerField.existsError("totp") && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{messagesPerField.get("totp")}</AlertDescription>
                    </Alert>
                )}

                {kcContext.totp.supportedApplications && kcContext.totp.supportedApplications.length > 0 && (
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>{msg("loginTotpStep2")}</AlertTitle>
                        <AlertDescription>
                            <ul className="list-disc list-inside ml-4 mt-2">
                                {kcContext.totp.supportedApplications.map((application, index) => (
                                    <li key={index}>{msgStr(application as any)}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}

                <form action={url.loginAction} method="post" className="space-y-4">
                    <div className="grid gap-2">
                        <div className="mt-4">
                            {totp.totpSecretQrCode && (
                                <div className="flex justify-center mb-4">
                                    <img src={`data:image/png;base64,${totp.totpSecretQrCode}`} alt="QR Code" className="border p-2 rounded-lg" />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <Label className="text-sm font-medium" htmlFor="totp">
                                {msg("loginTotpStep3")}
                            </Label>
                            <InputOTP
                                maxLength={kcContext.totp.policy.digits}
                                name="totp"
                                id="totp"
                                autoComplete="off"
                                aria-invalid={messagesPerField.existsError("totp") ? "true" : undefined}
                                pattern={REGEXP_ONLY_DIGITS}
                                autoFocus
                                className="w-full"
                            >
                                {Array.from({ length: kcContext.totp.policy.digits }, (_, index) => (
                                    <InputOTPSlot key={index} index={index} />
                                ))}
                                
                            </InputOTP>
                            {messagesPerField.existsError("totp") && (
                                <span
                                    id="input-error-otp-code"
                                    className="mt-2 block text-sm text-red-600"
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("totp")) }}
                                />
                            )}
                        </div>

                        <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />

                        <Button type="submit" className="w-full">
                            {msg("doSubmit")}
                        </Button>
                        <Button type="reset" onClick={() => window.location.href = url.loginRestartFlowUrl}   className="w-full" variant="secondary">
                            {msg("doCancel")}
                        </Button>
                    </div>
                </form>
            </div>
        </Template>
    );
}
